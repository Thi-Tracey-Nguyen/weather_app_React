import React, { useEffect, useState } from 'react'

const HourlyWeather = ({ lat, lon, cityObject}) => {

  // fetch hourly forecast
  useEffect(() => {
    async function fetchHourlyForecast(lat, lon) {
      const res = await fetch(`https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&appid=d145974fac8fb803900422c2cc1d620e`)

      if (!res.ok) {
        const msg = `An error has occured ${res.status}`
        throw new Error(msg)
      }

      const data = await res.json()
      console.log(data)
    }
    fetchHourlyForecast(lat, lon)
  }, [lat, lon])

  return (
    <div>HourlyWeather</div>
  )
}

export default HourlyWeather