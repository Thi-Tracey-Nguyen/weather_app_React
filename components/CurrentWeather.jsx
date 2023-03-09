import React, { useState, useEffect } from 'react'
import CloudQueueOutlinedIcon from '@mui/icons-material/CloudQueueOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';


const CurrentWeather = ({ lat, lon }) => {

  const [value, setValue] = useState(null)

  useEffect(() => {
    async function fetchCurrentWeather(lat, lon) {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6cb52d1ec85643988c8c6d46d8001531`)
      
      //hanldes errors
      if (!res.ok) {
        const msg = `An error has occured: ${res.status}`
        throw new Error(msg)
      }
    
      const data = await res.json()
      console.log(data)
      setValue({
        name: data.name,
        condition: data.weather[0].main,
        temp: data.main.temp,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        rain: data.rain ? data.rain['1h'] : 0
      })
    }
    fetchCurrentWeather(lat, lon)
  }, [lat, lon])

  // create an object of weather conditions and components 
  function renderCondition() {
    if (value.condition === 'Clear') {
      return <WbSunnyOutlinedIcon />
    }
    else if (value.condition === 'Clouds') {
      return <CloudQueueOutlinedIcon />
    }
  }

  // converts tempt from Kelvin to C or F
  function tempConversion(value, unit) {
    let temp
    if (unit === 'C') {
      temp = Math.floor(value - 273.15)
    } else if (unit === 'F') {
      temp = (value - 273.15) * 9/5 + 32
    }
    return temp
  }

  return (
    <>
      <div>CurrentWeather</div>
      {value && 
        <>
          <h3>City: {value.name}</h3>
          <p>Temperature: {tempConversion(value.temp, 'C')}</p>
          <p>Humidity: {value.humidity}%</p>
          <p>Wind Speed: {value.windSpeed} m/s</p>
          <p>Condition: {value.condition}</p>
          <p>Prcipitation: {value.rain}</p>
          {renderCondition()}
        </>
      }
    </>
  )
}

export default CurrentWeather