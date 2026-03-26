# 🌤️ Full-Stack Weather App

# Project Objective
A full-stack weather application that allows users to search for real-time weather data, view a 5-day forecast, and save favorite cities with authentication.

# Features
**🔐 Authentication**
- User login with JWT
- Protected API routes
- Persistent login using localStorage

**🌤 Weather Search**
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

**📅 5-Day Forecast**
- Uses `OpenWeather 5-day API`
- Transforms data into daily summaries
- Displays:
  - Day of week
  - Temperature
  - Weather icon

**❤️ Favorites**
- Add/remove favorite cities
- Favorites are user-specific
- Displays favorite cities as cards
![ScreenRecording2026-03-25at11 54 32PM-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/48c9af90-db49-4185-9b37-3aaca31c599c)


# Technologies Used
**Frontend**
- React (Vite)
- React Hooks (useState, useEffect)
- React Toastify
- CSS / SCSS

**Backend**
- Node.js
- Express
- PostgreSQL

**Auth**
- JWT (JSON Web Token)

**API**
- OpenWeather API (`/data/2.5/weather`, `/data/2.5/forecast`)

# How to test
1. Clone the repository: `git clone https://github.com/sylviajsy/weather-app.git`
2. Set Up the Backend
  - `cd server`
  - `npm install`
3. Inside your server folder, create an `.env` file with `touch .env`
5. There are two ways to restore the DB dump file the project already contains:
     A. If you have postgres set up postgres with an User:
         - just run the command `psql -U postgres techtonica -f db.sql`. Make sure that you have your Postgres password on hand. The psql console will ask for your password.
      B. If your initial configuration of postgres doesn't require a User:
          - just run the command `psql techtonica -f db.sql`
6. Inside your server folder, open the file `.env.example` and copy the correct option for your configuration found there to your new `.env` file.
7. Go to the `client` folder in the project (`cd .. and cd client`) and run the command `npm install`
8. If you want to run both servers using concurrently (which is already a npm dependency on the server) you can keep the script in the package.json in the server that reads `"dev": " concurrently 'npm start' 'cd .. && cd client && npm run dev' "`. If you run the command `npm run dev` from within your server, both the client and backend servers will start.
9. Go to `http://localhost:5173/` and you should see something like this after login💪

# Nice-to-Have
The following features are planned as future improvements:
- 🌍 Auto-detect user location using browser geolocation
- 🌗 Dark mode toggle
