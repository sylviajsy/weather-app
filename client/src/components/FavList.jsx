import "./FavList.css"

const FavList = ({ favoriteWeather, handleFavList }) => {
    
    if (!favoriteWeather || favoriteWeather.length === 0) {
        return <p style={{ marginTop: "20px" }}>No favorite cities yet 🌤</p>;
    }

  return (
    <div>
      <h2>The Weather in your Favorite Cities</h2>

      <div className="favlist-grid">
        {favoriteWeather.map((item) => (
            <div className="fav-card" key={item.id}>
                <button onClick={() => handleFavList(item.city_name, item.id)}>
                    ❤️
                </button>
                <div className="fav-card-header">
                    <h3 className="fav-city-name">{item.city_name}</h3>
                    <img
                        className="fav-weather-icon"
                        src={`https://openweathermap.org/img/wn/${item.weather.weather[0].icon}@4x.png`}
                        alt="weather icon"
                    />
                </div>

                <p className="fav-weather-temp">Temperature : {item.weather.main.temp} F</p>
                <p className="fav-weather-humidity">Humidity : {item.weather.main.humidity} %</p>
            </div>
        ))}
      </div>
    </div>
  )
}

export default FavList
