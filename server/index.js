import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/weather', async(req, res) => {
    const city = req.query.cityName;
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const params = new URLSearchParams({
        // Client input
        q:req.query.cityName,
        // q:"Austin",
        appid:process.env.OPENWEATHER_API_KEY,
        units:"imperial"
    })
    const url = `https://api.openweathermap.org/data/2.5/weather?${params}`

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("Fetched data for:", city);
        res.json(data);
    } catch(error){
        console.error(error);
        res.status(500).json({ error: "Error fetching weather data" });
    }
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});