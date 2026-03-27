import { useState,useEffect } from "react";
import { toast } from "react-toastify";
import MyNavBar from "./MyNavBar.jsx";
import WeatherCard from "./WeatherCard.jsx";
import WeatherForm from "./WeatherForm.jsx";
import FavList from "./FavList.jsx";
import WeeklyForecastCard from "./WeeklyForecastCard.jsx";

const WeatherPage = ({ user, setUser }) => {
	const [weather, setWeather] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [unit, setUnit] = useState("F");

    const [weeklyForecast, setWeeklyForecast] = useState([]);

    const [favorites, setFavorites] = useState([]);
    const [favoriteWeather, setFavoriteWeather] = useState([]);

	const token = localStorage.getItem("token");

	// If there's data returned from child, we need to put it in ()
	const onSearch = async (city) => {
		await loadInput(city);
	};

	const loadInput = async (city) => {
		setLoading(true);
		setError(null);
		setWeather(null);

		// Catch error if data not received
		try {
			const response = await fetch(`/api/weather?query=${city}`);
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Failed to fetch weather data");
			}

			setWeather(data);
            await loadWeeklyForecast(data.coord.lat, data.coord.lon);
		} catch (error) {
			console.error(error);
			toast.error(error.message || "Something went wrong");
		} finally {
			setLoading(false);
		}
	};

    const loadFav = async () => {
        try {
            const response = await fetch(`/api/fav`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to load favorite cities");
            }

            setFavorites(data);

            if (data.length > 0) {
                await loadFavWeather(data);
            } else {
                setFavoriteWeather([]);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Something went wrong");
        }
    }

    const loadFavWeather = async (favoriteCities) => {
        try {
            const results = await Promise.all(
                favoriteCities.map(async (city) => {
                    const response = await fetch(
                        `/api/weather?query=${city.city_name}`
                    );

                    const data = await response.json();

                    if (!response.ok) {
                        throw new Error(data.error || `Failed to fetch weather for ${city.city_name}`);
                    }

                    return {
                        id: city.id,
                        city_name: city.city_name,
                        weather: data,
                    };
                })
            )
            console.log(results);
            setFavoriteWeather(results);
        } catch (error) {
            console.error(error);
            toast.error(error.message || `Failed to load your fav city weather`);
        }
    }

    useEffect(() => {
        loadFav();
    }, []);

    const isFavorite = favorites.some(
        (fav) => fav.city_name === weather?.name
    );

    const handleFav = async() => {
        try {
            if (isFavorite) {

                const favCity = favorites.find(
                    (f) => f.city_name === weather.name
                );

                const response = await fetch(`/api/fav/${favCity.id}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || "Failed to remove favorite city");
                }

                toast.success(`Removed ${favCity.city_name} from favorites successfully`);

            } else {
                const response = await fetch(`/api/fav`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        cityName: weather.name,
                    }),
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || "Failed to add favorite city");
                }

                toast.success(`${data.city_name} added to favorites`);
            }
            
            await loadFav();
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Something went wrong");
        }
    }

    const handleFavList = async (cityName, favId = null) => {
        try{
            if (favId){
                const response = await fetch(`/api/fav/${favId}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || "Failed to remove favorite city");
                }

                toast.success(`Removed ${cityName} from favorites successfully`);
            } else {
                const response = await fetch(`/api/fav`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        cityName
                    }),
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || "Failed to add favorite city");
                }

                toast.success(`${data.city_name} added to favorites`);
            }
            await loadFav();
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Something went wrong");
        }
    }

	const toggleUnit = () => {
		setUnit((prev) => (prev === "F" ? "C" : "F"));
	};

    const loadWeeklyForecast = async (lat, lon) => {
        try {
            const response = await fetch(`/api/weekly-forecast?lat=${lat}&lon=${lon}`);
            const data = await response.json();

            if (!response.ok) {
            throw new Error(data.error || "Failed to load weekly forecast");
            }

            console.log("Weekly forecast", data);
            const dailyForecast = data.list.filter((item) => item.dt_txt.includes("12:00:00"))
            setWeeklyForecast(dailyForecast);
            console.log("dailyForecast", dailyForecast);
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Failed to load weekly forecast");
        }
    };

	return (
		<div>
			<MyNavBar user={user} setUser={setUser} />
			<WeatherForm onSearch={onSearch} />
			{error && <h2>Error:{error}</h2>}
            {!weather && <FavList favoriteWeather={favoriteWeather} handleFavList={handleFavList} unit={unit} toggleUnit={toggleUnit}/>}
			{weather && (
				<button type="button" onClick={toggleUnit}>
					Switch to {unit === "F" ? "°C" : "°F"}
				</button>
			)}
			{loading ? (
				    <div>Loading... ⏳</div>
			    ) : (
				    weather && (
                        <>
                            <button onClick={handleFav}>
                                {isFavorite ? "❤️" : "🤍"}
                            </button>
                            <WeatherCard result={weather} unit={unit}/>
                            <WeeklyForecastCard weeklyForecast={weeklyForecast} unit={unit}/>
                        </>
                    )
			)}
		</div>
	);
};

export default WeatherPage;
