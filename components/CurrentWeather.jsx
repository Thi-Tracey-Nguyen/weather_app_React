import React, { useState, useEffect } from 'react'
import CloudQueueOutlinedIcon from '@mui/icons-material/CloudQueueOutlined'
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined'
import { convertTime, convertTemp, convertDate } from '../helperFunctions'


const CurrentWeather = ({ lat, lon, unit, cityObject }) => {

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
        time: convertTime(data.timezone),
        date: convertDate(data.timezone),
        condition: data.weather[0].main,
        temp: data.main.temp,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        rain: data.rain ? data.rain['1h'] : 0, 
      })
    }
    fetchCurrentWeather(lat, lon)
  }, [lat, lon])

  // create an object of weather conditions and components 
  function renderCondition() {
    switch(value.condition) {
      case 'Rain':
        return <img src='./rainIcon.svg' alt='rain-icon' className='condition-icon' />
      
      case 'Clear':
        return <img src='./clearIcon.svg' alt='clear-icon' className='condition-icon' />

      case 'Snow':
        return <img src='./snowIcon.svg' alt='snow-icon' className='condition-icon' />

      case 'Mist':
        return <img src='./mistIcon.svg' alt='mist-icon' className='condition-icon' />

      case 'Clouds':
        return <img src='./cloudyIcon.svg' alt='cloud-icon' className='condition-icon' />

      default: 
        return <p>{value.condition}</p>
    }
  }

  return (
    <>
      {value && 
        <div className='weather-data'>
          <div className='weather'>
            <p className='weather-main'>{renderCondition()} {convertTemp(value.temp, unit) + '\u00B0' + unit}</p>
            <p>Humidity: {value.humidity}%</p>
            <p>Wind: {value.windSpeed} m/s</p>
            <p>Rain: {value.rain} mm</p>
          </div>
          <div className="general">
            <h2>{value.date}</h2>
            <p className='city-name'>{cityObject.name}, {cityObject.country}</p>
            <p>{value.time}</p>
          </div>
        </div>
      }
    </>
  )
}

export default CurrentWeather