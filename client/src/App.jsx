import { useState, useEffect } from 'react'
import './App.css'

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
      <h1>Weather App</h1>
      {/* <div className="card"> */}
        <h2>Current City:{city}</h2>
        {/* <p>
          {weather}
        </p> */}
    </>
  )
}

export default App
