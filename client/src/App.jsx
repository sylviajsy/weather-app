import { useState, useEffect } from 'react'
import './App.css'
import WeatherForm from './WeatherForm.jsx';
import WeatherCard from './WeatherCard.jsx';

function App() {
  const [input, setInput] = useState("Austin");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [unit, setUnit] = useState("F");
  
  // If there's data returned from child, we need to put it in ()
  const onSearch = (city) => {
    setInput(city);
  };

  const loadInput = async (city) => {
    setLoading(true);
    const response = await fetch(`http://localhost:8080/weather?query=${city}`);
    const data = await response.json();
    console.log("Data Received:", data);
    setWeather(data);
    setLoading(false);
  }

  const toggleUnit = () => {
    setUnit((prev) => (prev === "F" ? "C" : "F"))
  }

  useEffect(() => {
    loadInput(input);
    // Dependency Array: Whenever city value changes, render once
  }, [input]);

  return (
    <>
      <h1>Techtonica Weather Forecast App</h1>
      <WeatherForm onSearch={onSearch} />
      {weather && 
      <button onClick={toggleUnit}>
        Switch to {unit === "F" ? "°C" : "°F"}
        </button>}
      {loading ? (
        <div>
        Loading... ⏳
        </div>) : (<WeatherCard result={weather} unit={unit}/>)}
    </>
  )
}

export default App
