# 🌤️ Full-Stack Weather App

# Project Objective
The goal of this project is to build a full-stack web application that connects a React frontend with an Express backend and integrates a third-party API.

# Features
- Search weather by **city name** or **zip code**
- Fetch real-time weather data from **OpenWeatherMap API**
- Connected the React frontend to the backend using `fetch`
- Displayed weather details including:
  - City name and country
  - Temperature
  - Humidity
  - Wind speed
  - Weather icon
- Toggle between Fahrenheit (°F) and Celsius (°C)
- Loading states to improve user experience

# Technologies Used
**Frontend**
- React
- JavaScript (ES6+)

**Backend**
- Node.js
- Express
- OpenWeatherMap API

# How to test
1. Clone the Repository
- `git clone https://github.com/sylviajsy/weather-app.git`
2. Set Up the Backend
- `cd server`
- `npm install`
- Create a `.env` file inside the `server` folder and add `OPENWEATHER_API_KEY=your_api_key_here`
- Start the backend server: `npm run server`
- The backend should run on: `http://localhost:8080`
3. Set Up the Frontend
- `cd client`
- `npm install`
- `npm run dev`
- The frontend should run on: `http://localhost:5173`
4. Test the Application
- Enter a city name and click Search
- Enter a zip code and click Search
- Verify that weather information is displayed correctly
- Click the °C / °F toggle button to switch temperature units
- Observe the loading message while data is being fetched

# Nice-to-Have
The following features are planned as future improvements:
- 🌍 Auto-detect user location using browser geolocation
- 📆 Multi-day or hourly weather forecast
- 🌗 Dark mode toggle
