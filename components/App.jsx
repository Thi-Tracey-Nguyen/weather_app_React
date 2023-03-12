import React, { useState, useEffect } from 'react'
import CurrentWeather from './CurrentWeather'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear';
import HourlyWeather from './HourlyWeather'

const App = () => {
  const [cityNameInput, setCityNameInput] = useState('')
  const [cityObject, setCityObject] = useState(null)
  const [lat, setLat] = useState('')
  const [lon, setLon] = useState('')
  const [matchedCityNames, setMatchedCityNames] = useState([])
  const [unit, setUnit] = useState('C')

  const API_KEY = 'd145974fac8fb803900422c2cc1d620e'

  // function to match user input with city in the API
  useEffect(() => {
    async function matchCityName (city) {
      const res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`)

      //hanldes errors
      if (!res.ok) {
        const msg = `An error has occured: ${res.status}`
        throw new Error(msg)
      }
    
      const data = await res.json()
      
      let result = []
      data && data.forEach((city) => {
        result.push({
          name: city.name,
          country: city.country,
          lat: city.lat,
          lon: city.lon
        })
      })
      setMatchedCityNames(result)
    }
    matchCityName(cityNameInput)
  }, [cityNameInput])
  
  // handles changing city name in search bar
  const handleChange = (event) => {
    setCityNameInput(event.target.value)
  }

  // handles choosing a city in the search bar
  const handleClick = (event) => {
    setCityObject({
      name: event.target.getAttribute('data-city'),
      country: event.target.getAttribute('data-country')
    })
    setLat(event.target.getAttribute('data-lat'))
    setLon(event.target.getAttribute('data-lon'))
    setMatchedCityNames([])
  }  

  return (
    <>
      <div className="container">
        <div className='search-bar'>
          <div className='search-inputs'>
            <input 
              type='text' 
              placeholder='City Name'
              value={cityNameInput}
              onChange={handleChange}
            />
            <div className='search-icon'>
              {cityNameInput === '' ? <SearchIcon /> : <ClearIcon className='clear' onClick={() => setCityNameInput('')}/>}
            </div>
          </div>
          {matchedCityNames.length != 0 &&
          <div className='data-result'>
            {matchedCityNames.map((city, index) => (
              <p 
                key={index} 
                onClick={handleClick} 
                data-city={city.name} 
                data-country={city.country} 
                data-lat={city.lat} 
                data-lon={city.lon}
              > {city.name}, {city.country}
              </p>))
            }
          </div>
        }
        </div>
        <div className='current-weather'>
          {cityObject && <CurrentWeather lat={lat} lon={lon} unit={unit} cityObject={cityObject}/>}
        </div>
        <HourlyWeather lat={lat} lon={lon} cityObject={cityObject} />
      </div>
    </>
  )
}

export default App