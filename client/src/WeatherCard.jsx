import React from 'react'

const WeatherCard = ({ result }) => {
  return (
    <div className='weatherCard'>
        {/* City Name */}
      <h2>{result.name}</h2>
    </div>
  )
}

export default WeatherCard
