import React from 'react'
import { useState } from 'react'

const WeatherForm = () => {
    const [input, setInput] = useState("");

    const handleSubmit = (e) =>{
        e.preventDefault();
    }
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input 

        />
        <button type="submit">Search</button>
      </form>
    </div>
  )
}

export default WeatherForm
