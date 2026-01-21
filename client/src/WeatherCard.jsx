import React from 'react'

const WeatherCard = ({ result }) => {
  return (
    <div className='weatherCard'>
        {/* City Name */}
      <h2>City : {result.name}, {result.sys.country}</h2>
      {/* current weather icon, , and wind speed */}
      {/* Display temperature*/}
      <h2>Temperature : {result.main.temp} F</h2>
      {/* Display humidity */}
      <h2>Humidity : {result.main.humidity}</h2>

    </div>
  )
}

export default WeatherCard
