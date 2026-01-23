import { useState, useEffect } from 'react'
import './App.css'
import WeatherForm from './WeatherForm.jsx';
import WeatherCard from './WeatherCard.jsx';

function App() {
  const [input, setInput] = useState("Austin");
  const [weather, setWeather] = useState(null);
  
  // If there's data returned from child, we need to put it in ()
  const loadInput = async (input) => {
    const response = await fetch(`http://localhost:8080/weather?query=${input}`);
    const data = await response.json();
    console.log("Data Received:", data);
    setInput(input);
    setWeather(data);
  }

  useEffect(() => {
    loadInput(input);
    // Dependency Array: Whenever city value changes, render once
  }, []);

  return (
    <>
      <h1>Techtonica Weather Forecast App</h1>
      <WeatherForm onSearch={loadInput} />
      {weather && <WeatherCard result={weather} />}
    </>
  )
}

export default App
