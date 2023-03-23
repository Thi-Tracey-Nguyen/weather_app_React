import React, { useEffect, useState } from 'react'
import { stringToDate, dateToObject, convertTemp, getHourlyForecast } from '../../helperFunctions'

const Forecast = ({ cityObject, unit }) => {

  const [hourlyForecast, setHourlyForecast] = useState([])
  
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
        temp: item.main.temp,
        condition: item.weather[0].main
        }
      ))
      const filteredArr = getHourlyForecast(data.city.timezone, forecast)
      filteredArr.length > 1 ? setHourlyForecast(filteredArr) : setHourlyForecast([forecast[3]])
      console.log(filteredArr)

    }
    fetchHourlyForecast(cityObject.lat, cityObject.lon)
  }, [cityObject])

  console.log(unit)

  return (
    <>
      <div className='hourly-container'>
        {hourlyForecast.length !== 0 && hourlyForecast.map((item, index) => (
          <div className='hourly-item' key={index}>
            <p>{item.date.time}</p>
            <p>{convertTemp(item.temp, "K", unit) + '\u00B0' + unit}</p>
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