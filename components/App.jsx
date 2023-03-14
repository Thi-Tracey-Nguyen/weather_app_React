import React, { useState, useEffect } from 'react'
import CurrentWeather from './CurrentWeather'
import SearchBar from './SearchBar'
import Forecast from './Forecast'
import DailyForecast from './DailyForecast'

const App = () => {
  const MELBOURNE = {
    name: 'Melbourne',
    country: 'AU',
    lat: -37.84,
    lon: 144.95
  }
  const [cityObject, setCityObject] = useState(MELBOURNE)
  
  const [unit, setUnit] = useState('C')

  // handles choosing a city in the search bar
  const handleSelect = (event) => {
    setCityObject({
      name: event.target.getAttribute('data-city'),
      country: event.target.getAttribute('data-country'), 
      lat: event.target.getAttribute('data-lat'),
      lon: event.target.getAttribute('data-lon')
    })
  }  

  return (
    <>
      <div className="container">
        <SearchBar onClick={handleSelect} cityObject={cityObject}/>
        <div className='current-weather'>
          {cityObject && <CurrentWeather unit={unit} cityObject={cityObject}/>}
        </div>
        <Forecast cityObject={cityObject} unit={unit} />
        <DailyForecast cityObject={cityObject} unit={unit} />
      </div>
    </>
  )
}

export default App