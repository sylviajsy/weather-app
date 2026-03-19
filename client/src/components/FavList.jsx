import React from 'react'

const FavList = ({ favorites }) => {
  return (
    <div>
      <h2>Your Favorite Cities</h2>
      <ul>
        {favorites.map((city) => (
            <li key={city.id}>{city.city_name}</li>
        ))}
      </ul>
    </div>
  )
}

export default FavList
