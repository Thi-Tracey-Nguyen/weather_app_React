// this is where all the fetching functions are



async function fetchCurrentWeather(lat, lon) {

  const API_key =  '6cb52d1ec85643988c8c6d46d8001531'
  
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`)
  
  //hanldes errors
  if (!res.ok) {
    const msg = `An error has occured: ${res.status}`
    throw new Error(msg)
  }

  const data = await res.json()
  return data
}

export { fetchCurrentWeather }