import React from 'react'

const WeatherCard = ({ result }) => {
  return (
    <div className='weatherCard'>
        {/* City Name */}
      <h2>City : {result.name}, {result.sys.country}</h2>
      {/* current weather icon, , humidity, and wind speed */}
      {/* Display  temperature*/}

    </div>
  )
}

export default WeatherCard
