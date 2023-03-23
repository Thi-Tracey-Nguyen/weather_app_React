// converts timezone to date object 
function timezoneToDate(timezone) {
  const time = new Date().getTime() + timezone*1000
  return new Date(time)
}


// converts date in text format to date object
function stringToDate(text) {
  return new Date(`${text} UTC`)
}

// console.log(dateToObject(stringToDate('2023-03-15')))

// converts date object to an object with date and time properties
function dateToObject(date) {
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ]
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  const hours = date.getUTCHours() < 10 ? `0${date.getUTCHours()}` : date.getUTCHours()
  const minutes = date.getUTCMinutes() < 10 ? `0${date.getUTCMinutes()}` : date.getUTCMinutes()

  return {
    date: `${dayNames[date.getUTCDay()]}, ${date.getUTCDate()} ${monthNames[date.getUTCMonth()]}`,
    time: `${hours}:${minutes}`
  }
}

// converts Kelvin to choosen unit
function convertTemp(value, initialUnit, resultUnit) {
  let temp
  if (initialUnit === 'K' && resultUnit === 'C') {
    temp = (value - 273.15).toFixed(1)
  } else if (initialUnit === 'K' && resultUnit === 'F') {
    temp = ((value - 273.15) * 9/5 + 32).toFixed(1)
  } else if (initialUnit === 'F' && resultUnit === 'C') {
    temp = ((value - 32) * 5/9).toFixed(1)
  } else {
    temp = value
  }
  return temp
}

// separates current weather from the rest of the day
function getHourlyForecast(timezone, array) {

  //creates an object to hold current date and time values
  const date = timezoneToDate(timezone)
  const dateObject = dateToObject(date)

  const filteredArr = array.filter(item => item.date.time > dateObject.time + 3*3600)
  return filteredArr
}

// create an object of weather conditions and components 
function renderCondition(condition) {
  switch(condition) {
    case 'Rain':
      return './rainIcon.svg'
    case 'Clear':
      return './clearIcon.svg'
    case 'Snow':
      return './snowIcon.svg'
      
    case 'Mist':
      return './mistIcon.svg'
      
    case 'Clouds':
      return './cloudyIcon.svg'
      

    case 'Partly Cloudy': 
      return './partlyCloudyIcon.svg'
      
    default: 
      return './clearIcon.svg'
  }
}

//convert meter/sec to desired unit
function convertWindSpeed(value, resultUnit) {
  if (resultUnit === 'km/h') {
    return (value * 3.6).toFixed(2)
  } else {
    return (value * 2.23694).toFixed(2)
  }
}

export { timezoneToDate, stringToDate, dateToObject, convertTemp, getHourlyForecast, renderCondition, convertWindSpeed }