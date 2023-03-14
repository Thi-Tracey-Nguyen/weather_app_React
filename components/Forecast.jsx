import React, { useEffect, useState } from 'react'
import { stringToDate, dateToObject, convertTemp, getHourlyForecast } from '../helperFunctions'

const Forecast = ({ lat, lon, unit }) => {

  const [hourlyForecast, setHourlyForecast] = useState([])
  const [dailyForecast, setDailyForecast] = useState([])
  // fetch hourly forecast
  useEffect(() => {
    async function fetchHourlyForecast(lat, lon) {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&exclude={minutely, daily, alerts}&appid=d145974fac8fb803900422c2cc1d620e`)

      if (!res.ok) {
        const msg = `An error has occured ${res.status}`
        throw new Error(msg)
      }

      const data = await res.json()
      
      const list = data.list.splice(0, 7)

      // // extracts date and time info from data into an array of objects
      const forecast = list.map(item => (
        {
        date: dateToObject(stringToDate(item.dt_txt)),
        temp: convertTemp(item.main.temp, 'K', unit),
        condition: item.weather[0].main
        }
      ))
      const filteredArr = getHourlyForecast(data.city.timezone, forecast)
 
      setHourlyForecast(filteredArr)
    }
    fetchHourlyForecast(lat, lon)
  }, [lat, lon])

  return (
    <>
      <div className='hourly-container'>
        {hourlyForecast.length !== 0 && hourlyForecast.map(item => (
          <div className='hourly-item'>
            <p>{item.date.time}</p>
            <p>{item.temp + '\u00B0' + unit}</p>
            <p>{item.condition}</p>
          </div>
        ))}
      </div>
      <div className='five-day-container'>

      </div>
    </>
  )
}

export default Forecast