import React from 'react'
import CurrentWeather from './CurrentWeather'

const App = () => {

  const lat = -37.8409
  const lon = 144.9464



  return (
    <>
      <div>App</div>
      <CurrentWeather lat={lat} lon={lon}/>
    </>
  )
}

export default App