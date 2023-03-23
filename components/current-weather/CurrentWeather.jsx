import React, { useState, useEffect } from 'react'
import { timezoneToDate, convertTemp, dateToObject, renderCondition, convertWindSpeed } from '../../helperFunctions'


const CurrentWeather = ({ unit, cityObject, speedUnit }) => {

  const [value, setValue] = useState(null)

  useEffect(() => {
    async function fetchCurrentWeather(lat, lon) {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d145974fac8fb803900422c2cc1d620e`)
      
      //hanldes errors
      if (!res.ok) {
        const msg = `An error has occured: ${res.status}`
        throw new Error(msg)
      }
    
      const data = await res.json()

      //creates an object to hold date and time values
      const date = timezoneToDate(data.timezone)
      const dateObject = dateToObject(date)
    
      setValue({
        name: data.name,
        time: dateObject.time,
        date: dateObject.date,
        condition: data.weather[0].main,
        temp: data.main.temp,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        rain: data.rain ? data.rain['1h'] : 0, 
      })
    }
    fetchCurrentWeather(cityObject.lat, cityObject.lon)
  }, [cityObject])

  return (
    <>
      {value && 
        <div className='weather-data'>
          <div className='weather'>
            <div className='weather-main'>
              <img src={renderCondition(value.condition)}  />
              {convertTemp(value.temp, 'K', unit) + '\u00B0' + unit}
            </div>
            <p>Humidity: {value.humidity}%</p>
            <p>Wind: {convertWindSpeed(value.windSpeed, speedUnit)} {speedUnit}</p>
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