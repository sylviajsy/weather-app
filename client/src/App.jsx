import { useEffect, useState } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import LoginPage from "./components/LoginPage";
import WeatherPage from "./components/WeatherPage";

function App() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const savedUser = localStorage.getItem("user");
		const token = localStorage.getItem("token");

		if (savedUser && token) {
			setUser(JSON.parse(savedUser));
		}
	}, []);

	return (
		<>
			<ToastContainer
				position="top-center"
				autoClose={3000}
				toastStyle={{
					marginTop: "40vh",
					textAlign: "center",
				}}
			/>
			{user ? (
				<WeatherPage user={user} setUser={setUser} />
			) : (
				<LoginPage setUser={setUser} />
			)}
		</>
	);
}

export default App;
