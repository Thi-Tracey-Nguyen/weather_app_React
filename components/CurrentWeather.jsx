import React, { useState, useEffect } from 'react'

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
        temp: data.main.temp,
        humidity: data.main.humidity,
      })
    }
    fetchCurrentWeather(lat, lon)
  }, [])

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
          <p>{tempConversion(value.temp, 'C')}</p>
          <p>{value.humidity}</p>
        </>
      }
    </>
  )
}

export default CurrentWeather