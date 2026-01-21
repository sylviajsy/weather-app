import { useState, useEffect } from 'react'
import './App.css'
import WeatherCard from './WeatherCard.jsx';

function App() {
  const [city, setCity] = useState("Austin");
  const [weather, setWeather] = useState(null);
  
  const loadCity = async () => {
    const response = await fetch(`http://localhost:8080/weather?cityName=${city}`);
    const data = await response.json();
    console.log("Data Received:", data);
    setCity(city);
    setWeather(data);
  }

  useEffect(() => {
    loadCity();
  }, []);

  return (
    <>
      <h1>Techtonica Weather Forecast App</h1>

      {weather && <WeatherCard result={weather} />}
    </>
  )
}

export default App
