import React from 'react'
import "./WeeklyForecastCard.css"

const WeeklyForecastCard = ({ weeklyForecast, unit }) => {

    const convertTemp = (temp) => {
        if (unit == "C"){
            return Math.round((temp - 32) * 5 / 9);
        }
        return Math.round(temp);
    }

  return (
    <div className="weekly-grid">
        {weeklyForecast.map((day) => (
            <div className="weekly-card" key={day.dt}>
                <div className="weekly-card-header">
                    <h2> {day.dt_txt.split(" ")[0]}, 
                        {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                            weekday: "short",
                        })}
                    </h2>
                </div>

                <div className='weekly-card-body'>
                    <h2 className="weekly-description">Description : {day.weather[0].description}</h2>
                    <img
                        src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                        alt={day.weather[0].description}
                    />
                    <h2 className="weekly-temp">
                        Temperature : {convertTemp(day.main.temp)} °{unit}
                    </h2>
                    <h2 className="weekly-humidity">Humidity : {day.main.humidity} %</h2>
                    <h2 className="weekly-wind-speed">Wind Speed : {day.wind.speed} mph</h2>
                </div>
            </div>
        ))}
      
    </div>
  )
}

export default WeeklyForecastCard
