import React, { useState, useEffect } from 'react'
import CurrentWeather from './CurrentWeather'
import SearchIcon from '@mui/icons-material/Search'

const App = () => {
  const [cityNameInput, setCityNameInput] = useState('Melbourne')
  const [cityName, setCityName] = useState('')
  const [lat, setLat] = useState('')
  const [lon, setLon] = useState('')
  const [matchedCityNames, setMatchedCityNames] = useState([])

  const test = [
    {
      name: 'Melbourne',
      country: "AU"
    }, 
    {
      name: "London",
      country: "UK"
    }, 
    {
      name: "HCM",
      country: "VN"
    }, 
    {
      name: "Bangkok",
      country: "TH"
    }
  ]

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
    setCityName(event.target.getAttribute('value'))
    setLat(event.target.getAttribute('lat'))
    setLon(event.target.getAttribute('lon'))
  }  

  console.log(matchedCityNames)

  return (
    <>
      <div>App
        <form className='search-inputs'>
          <input 
            type='text' 
            placeholder='City Name'
            value={cityNameInput}
            onChange={handleChange}
          />
          <div className='search-icon'>
            <SearchIcon />
          </div>
        </form>
      </div>
      <div>
        {matchedCityNames.length != 0 ? matchedCityNames.map((city, index) => (
          <p key={index} onClick={handleClick} value={city.name} lat={city.lat} lon={city.lon}>{city.name}, {city.country}</p>)) : ''
        }
      </div>
      <CurrentWeather lat={lat} lon={lon}/>
    </>
  )
}

export default App