import React from 'react'
import { useState } from 'react'
import { CiLocationOn } from "react-icons/ci";

const WeatherForm = ({ onSearch, onLocationSearch }) => {
    const [input, setInput] = useState("");

    const handleSubmit = (e) =>{
        e.preventDefault();
        // Passing state from child to parent
        onSearch(input);
    }
    
    const handleClickLocation = () =>{
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) =>{
          console.log("sucess", position);

          try {
            const {latitude, longitude} = position.coords;
                onLocationSearch(latitude, longitude);
                
              } catch(err) {
                console.error("Getting Location Error:", err);
                  alert("Couldnot get your location")
              }
        })
      }
    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
            type='text'
            id='city'
            name='city'
            placeholder='Search for a city or Zip code...'
            required
            value={input}
            onChange={(e) => setInput(e.target.value)}
        />


        <CiLocationOn onClick={handleClickLocation}/>
        <button type="submit">Search</button>
      </form>
    </div>
  )
}

export default WeatherForm
