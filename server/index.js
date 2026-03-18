import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import db from "./db/db.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/weather', async(req, res) => {
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
        res.json(data);
    } catch(error){
        console.error(error);
        res.status(500).json({ error: "Error fetching weather data" });
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