import React from 'react'

const WeatherCard = ({ result,unit }) => {
    // Calculation from F to C
    const toCelsius = (f) => ((f - 32) * 5) / 9;

    // Get the temp in F from backend
    const tempF = result.main.temp
    const displayTemp = unit === "C" ? toCelsius(tempF) : tempF;
    
  return (
    <div className='weatherCard'>
        {/* City Name */}
      <h2>City : {result.name}, {result.sys.country}</h2>
      {/* Description */}
      <h2>Description : {result.weather[0].description}</h2>
      {/* Display current weather icon */}
      <img 
        src={`http://openweathermap.org/img/wn/${result.weather[0].icon}@4x.png`}
        alt='weather icon'
      />
      {/* Display temperature*/}
      <h2>Temperature : {displayTemp} °{unit}</h2>
      {/* Display humidity */}
      <h2>Humidity : {result.main.humidity} %</h2>
      {/* Display wind speed */}
      <h2>Wind Speed : {result.wind.speed} mph</h2>

    </div>
  )
}

export default WeatherCard
