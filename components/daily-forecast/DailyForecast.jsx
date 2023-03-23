import React, { useEffect, useState } from 'react'
import { convertTemp, stringToDate, dateToObject } from '../../helperFunctions'

const DailyForecast = ({ cityObject, unit }) => {

  const [dailyForecast, setDailyForecast] = useState([])

  useEffect(() => {
    async function fetchHourlyForecast(lat, lon) {
      const res = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}?key=PKEXWY8BPHY397N6D3W37WJ6C`)

      if (!res.ok) {
        const msg = `An error has occured ${res.status}`
        throw new Error(msg)
      }

      const data = await res.json()

      const fiveDays = data.days.splice(0, 5)

      const dailyData = fiveDays.map(day => ({
        date: dateToObject(stringToDate(day.datetime)),
        tempMax: day.tempmax,
        tempMin: day.tempmin,
        condition: day.icon
      }))
      setDailyForecast(dailyData)
    }
    fetchHourlyForecast(cityObject.lat, cityObject.lon)
  }, [cityObject])

  return (
    <div className='daily-container'>
      {dailyForecast.map((day, index)  => 
       <div className='daily-item' key={index} >
          <p> {index === 0 ? 'Today' : day.date.date} </p>
          {day.condition}
          {convertTemp(day.tempMin, 'F', unit) + '\u00B0' + unit} - {convertTemp(day.tempMax, 'F', unit) + '\u00B0' + unit }
       </div>
      )}
    </div>
  )
}

export default DailyForecast