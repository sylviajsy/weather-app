import React from 'react'

const FavList = ({ favoriteWeather }) => {
    
    if (!favoriteWeather || favoriteWeather.length === 0) {
        return <p style={{ marginTop: "20px" }}>No favorite cities yet 🌤</p>;
    }

  return (
    <div>
      <h2>The Weather in your Favorite Cities</h2>

      <div className="favlist-grid">
        {favoriteWeather.map((item) => (
            <div className="fav-card" key={item.id}>
                <div className="fav-card-header">
                    <h3 className="fav-city-name">{item.city_name}</h3>
                    <img
                        className="fav-weather-icon"
                        src={`https://openweathermap.org/img/wn/${item.weather.weather[0].icon}@4x.png`}
                        alt="weather icon"
                    />
                </div>

                <p2>Temperature : {item.weather.main.temp} F</p2>
                <p2>Humidity : {item.weather.main.humidity} %</p2>
            </div>
        ))}
      </div>
    </div>
  )
}

export default FavList
