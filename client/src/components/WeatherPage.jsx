import { useState,useEffect } from "react";
import { toast } from "react-toastify";
import MyNavBar from "./MyNavBar.jsx";
import WeatherCard from "./WeatherCard.jsx";
import WeatherForm from "./WeatherForm.jsx";
import FavList from "./FavList.jsx";

const WeatherPage = ({ user, setUser }) => {
	const [weather, setWeather] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [unit, setUnit] = useState("F");

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

            setFavoriteWeather(results);
        } catch (error) {
            console.error(error);
            toast.error(error.message || `Failed to load ${city.city_name} weather`);
        }
    }

    useEffect(() => {
        loadFav();
    }, []);

	const toggleUnit = () => {
		setUnit((prev) => (prev === "F" ? "C" : "F"));
	};

	return (
		<div>
			<MyNavBar user={user} setUser={setUser} />
			<FavList favorites={favorites}/>
			<WeatherForm onSearch={onSearch} />
			{error && <h2>Error:{error}</h2>}
			{weather && (
				<button type="button" onClick={toggleUnit}>
					Switch to {unit === "F" ? "°C" : "°F"}
				</button>
			)}
			{loading ? (
				<div>Loading... ⏳</div>
			) : (
				weather && <WeatherCard result={weather} unit={unit} />
			)}
		</div>
	);
};

export default WeatherPage;
