import React from 'react'
import { useState } from 'react'

const WeatherForm = ({ onSearch }) => {
    const [input, setInput] = useState("");

    const handleSubmit = (e) =>{
        e.preventDefault();
        // Passing state from child to parent
        onSearch(input);
    }
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  )
}

export default WeatherForm
