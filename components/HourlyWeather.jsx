import React, { useEffect, useState } from 'react'
import { stringToDate, dateToObject, convertTemp, getHourlyForecast } from '../helperFunctions'

const HourlyWeather = ({ lat, lon, unit }) => {

  const [forecast, setForecast] = useState([])
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
        temp: convertTemp(item.main.temp, unit),
        condition: item.weather[0].main
        }
      ))
      const filteredArr = getHourlyForecast(data.city.timezone, forecast)
      console.log(data.timezone)
      setForecast(filteredArr)
    }
    fetchHourlyForecast(lat, lon)
  }, [lat, lon])

  return (
    <>
      <div>HourlyWeather</div>
      <div className='hourly-container'>
        {forecast.length !== 0 && forecast.map(item => (
          <div className='hourly-item'>
            <p>{item.date.time}</p>
            <p>{item.temp}</p>
            <p>{item.condition}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default HourlyWeather