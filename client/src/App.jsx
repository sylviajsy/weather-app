import { useState, useEffect } from 'react'
import './App.css'
// import LoginPage from "./components/LoginPage";
import WeatherPage from "./components/WeatherPage";
import { Toaster } from "react-hot-toast";

function App() {
  
  return (
    <>
      <ToastContainer 
          position="top-center"
          autoClose={3000}
          toastStyle={{
            marginTop: "40vh",
            textAlign: "center"
          }}
      />
      <WeatherPage />
    </>
  )
}

export default App
