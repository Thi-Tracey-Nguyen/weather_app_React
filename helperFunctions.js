// converts timezone to date object 
function timezoneToDate(timezone) {
  const time = new Date().getTime() + timezone*1000
  return new Date(time)
}


// converts date in text format to date object
function stringToDate(text) {
  return new Date(`${text} UTC`)
}

// converts date object to an object with date and time properties
function dateToObject(date) {
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ]
  const dayNames = ["Sunday", "Monday", "Tueday", "Weday", "Thursday", "Friday", "Saturday"]

  const hours = date.getUTCHours() < 10 ? `0${date.getUTCHours()}` : date.getUTCHours()
  const minutes = date.getUTCMinutes() < 10 ? `0${date.getUTCMinutes()}` : date.getUTCMinutes()

  return {
    date: `${dayNames[date.getUTCDay()]}, ${date.getUTCDate()} ${monthNames[date.getUTCMonth()]}`,
    time: `${hours}:${minutes}`
  }
}

// converts Kelvin to choosen unit
function convertTemp(value, unit) {
  let temp
  if (unit === 'C') {
    temp = Math.floor(value - 273.15)
  } else if (unit === 'F') {
    temp = (value - 273.15) * 9/5 + 32
  }
  return temp
}
export { timezoneToDate, stringToDate, dateToObject, convertTemp }