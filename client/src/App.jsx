import { useState, useEffect } from 'react'
import './App.css'
import WeatherForm from './WeatherForm.jsx';
import WeatherCard from './WeatherCard.jsx';

function App() {
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState("F");
  
  // If there's data returned from child, we need to put it in ()
  const onSearch = (city) => {
    setInput(city);
  };

  const loadInput = async (city) => {
    setLoading(true);
    setError(null);
    setWeather(null);
    // Catch error if data not received
    try{
      const response = await fetch(`http://localhost:8080/weather?query=${city}`);
      const data = await response.json();

      if (data.cod == "200"){
        console.log("Data Received:", data);
        setWeather(data);
      } else {
        setError(data.message)
      }
      
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const toggleUnit = () => {
    setUnit((prev) => (prev === "F" ? "C" : "F"))
  }

  useEffect(() => {
    // If there's no input, return empty page
    if (!input) return;
    loadInput(input);
    // Dependency Array: Whenever city value changes, render once
  }, [input]);

  return (
    <>
      <h1>Techtonica Weather Forecast App</h1>
      <WeatherForm onSearch={onSearch} />
      {error && <h2>Error:{error}</h2>}
      {weather && 
      <button onClick={toggleUnit}>
        Switch to {unit === "F" ? "°C" : "°F"}
        </button>}
      {loading ? (
        <div>
        Loading... ⏳
        </div>) : weather && (<WeatherCard result={weather} unit={unit}/>)}
    </>
  )
}

export default App
