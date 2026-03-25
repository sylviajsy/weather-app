import "./FavList.css"

const FavList = ({ favoriteWeather, handleFavList, unit, toggleUnit }) => {
    
    if (!favoriteWeather || favoriteWeather.length === 0) {
        return <p style={{ marginTop: "20px" }}>No favorite cities yet 🌤</p>;
    }

    const convertTemp = (temp) => {
        if (unit == "C"){
            return Math.round((temp - 32) * 5 / 9);
        }
        return Math.round(temp);
    }

  return (
    <div>
      <h2>The Weather in your Favorite Cities</h2>

      <button type="button" onClick={toggleUnit}>
			Switch to {unit === "F" ? "°C" : "°F"}
	  </button>

      <div className="favlist-grid">
        {favoriteWeather.map((item) => (
            <div className="fav-card" key={item.id}>
                <button onClick={() => handleFavList(item.city_name, item.id)} className="fav-btn">
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

                <p className="fav-weather-temp">Temperature : {convertTemp(item.weather.main.temp)} °{unit}</p>
                <p className="fav-weather-humidity">Humidity : {item.weather.main.humidity} %</p>
            </div>
        ))}
      </div>
    </div>
  )
}

export default FavList
