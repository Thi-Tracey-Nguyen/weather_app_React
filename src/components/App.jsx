import React, { useState, useEffect } from 'react'
import CurrentWeather from './current-weather/CurrentWeather'
import SearchBar from './search-bar/SearchBar'
import Forecast from './forecast/Forecast'
import DailyForecast from './daily-forecast/DailyForecast'
import Toggle from './toggle/Toggle'
import './app.css'

const App = () => {
  const MELBOURNE = {
    name: 'Melbourne',
    country: 'AU',
    lat: -37.84,
    lon: 144.95
  }
  const [cityObject, setCityObject] = useState(MELBOURNE)
  
  const [unit, setUnit] = useState('C')
  const [speedUnit, setSpeedUnit] = useState('m/s')

  // handles choosing a city in the search bar
  const handleSelect = (event) => {
    setCityObject({
      name: event.target.getAttribute('data-city'),
      country: event.target.getAttribute('data-country'), 
      lat: event.target.getAttribute('data-lat'),
      lon: event.target.getAttribute('data-lon')
    })
  }  

  // handle changing unit between C and F
  const handleClickUnit = (event) => {
    if (event.target.checked) {
      setUnit("F")
      setSpeedUnit('mph')
    } else {
      setUnit("C")
      setSpeedUnit('km/h')
    }
  }

  return (
    <div className="main">
      <div className='utils'>
        <SearchBar onClick={handleSelect} cityObject={cityObject}/>
        <Toggle handleClickUnit={handleClickUnit}/>
      </div>
      <div className='current-weather'>
        {cityObject && <CurrentWeather unit={unit} cityObject={cityObject} speedUnit={speedUnit}/>}
      </div>
      <Forecast cityObject={cityObject} unit={unit} />
      <DailyForecast cityObject={cityObject} unit={unit} />
    </div>
  )
}

export default App