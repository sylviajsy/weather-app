import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import db from "./db/db.js";
import requireAuth from "./middleware/requireAuth.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/weather', async(req, res) => {
    const query = req.query.query;
    // Regular Expression, if numbers, then zip code API
    const isZip = /^\d+$/.test(query);

    let params;

    if (isZip){
        params = new URLSearchParams({
            zip:`${query},US`,
            appid:process.env.OPENWEATHER_API_KEY,
            units:"imperial"
        })
    } else {
        params = new URLSearchParams({
        // Client input
        q:query,
        // q:"Austin",
        appid:process.env.OPENWEATHER_API_KEY,
        units:"imperial"
    })
    }
    
    const url = `https://api.openweathermap.org/data/2.5/weather?${params}`

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("Fetched data for:", query);
        if (!response.ok) {
            return res.status(response.status).json(data);
        }
        res.json(data);
    } catch(error){
        console.error(error);
        res.status(500).json({ error: "Error fetching weather data" });
    }
})

// Get fav cities
app.get('/api/fav', requireAuth, async (req, res) => {
    try {
        console.log("req.user:", req.user);
        const userId = req.user.userId;

        const result = await db.query(
            `SELECT id, city_name FROM favorite_cities WHERE user_id = $1`,
            [userId]
        );

        console.log("favorites result:", result.rows);

        if (result.rows.length === 0) {
            return res.status(401).json({ error: "No fav city found" });
        }

        res.json(result.rows);
    } catch (error) {
        console.log("Error fetching favorites:", error);
        res.status(500).json({ error: "Server error" });
    }
})

app.post('/api/fav', requireAuth, async (req, res) => {
    try {
        console.log("req.user:", req.user);
        const userId = req.user.userId;
        const { cityName } = req.body;

        if (!cityName || !cityName.trim()) {
            return res.status(400).json({ error: "City name is required" });
        }

        const trimmedCity = cityName.trim();

        const existing = await db.query(
            `SELECT id FROM favorite_cities WHERE user_id = $1 AND city_name = $2`,
            [userId, trimmedCity]
        );

        if (existing.rows.length > 0) {
            return res.status(409).json({ error: "City already in favorites" });
        }

        const result = await db.query(
            `INSERT INTO favorite_cities (user_id, city_name)
            VALUES ($1, $2)
            RETURNING id, city_name`,
            [userId, trimmedCity]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error adding favorite city:", error);
        res.status(500).json({ error: "Server error" });
    }
})

app.delete('/api/fav/:id', requireAuth, async (req, res) => {
    try {
        console.log("req.user:", req.user);
        const userId = req.user.userId;
        const favId = req.params.id;

        const result = await db.query(
            `DELETE FROM favorite_cities
            WHERE id = $1 AND user_id = $2
            RETURNING id, city_name`,
            [favId, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Favorite city not found" });
        }

        res.json({
            message: "Favorite city removed",
            deleted: result.rows[0],
        });
    } catch (error) {
        console.log("Error deleting favorite city:", error);
        res.status(500).json({ error: "Server error" });
    }
})

app.get("/api/test-db", async (req, res) => {
  try {
    const result = await db.query("SELECT NOW();");
    res.json({
      message: "Database connected successfully",
      time: result.rows[0],
    });
  } catch (error) {
    console.error("DB connection error:", error);
    res.status(500).json({ error: "Database connection failed" });
  }
});

// User Login
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    try{
        const result = await db.query(
            `SELECT * FROM users WHERE email = $1`,
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ error: "User not found" });
        }

        const user = result.rows[0];

        if (user.password !== password) {
            return res.status(401).json({ error: "Wrong password" });
        }

        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({
            message: "Login success",
            token,
            user: {
            id: user.id,
            email: user.email,
            username: user.username,
            },
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Server error." });
    }

});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});