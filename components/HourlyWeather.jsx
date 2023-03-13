import { ContactSupportOutlined } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import { stringToDate, dateToObject } from '../helperFunctions'

const HourlyWeather = ({ lat, lon, cityObject}) => {

  // fetch hourly forecast
  useEffect(() => {
    async function fetchHourlyForecast(lat, lon) {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&exclude={minutely, daily, alerts}&appid=d145974fac8fb803900422c2cc1d620e`)

      if (!res.ok) {
        const msg = `An error has occured ${res.status}`
        throw new Error(msg)
      }

      const data = await res.json()
      // console.log(data)
      // const date = stringToDate(data.list[0].dt_txt)
      // const dateObject = dateToObject(date)
      const list = data.list

      const forecast = list.map(item => (
        {
        date: dateToObject(stringToDate(item.dt_txt)),
        temp: item.main.temp,
        }
      ))

      console.log(forecast)
    }
    fetchHourlyForecast(lat, lon)
  }, [lat, lon])

  return (
    <div>HourlyWeather</div>
  )
}

export default HourlyWeather