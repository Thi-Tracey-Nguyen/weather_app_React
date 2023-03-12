// converts UTC time to time at the choosen city
function convertTime(timezone) {
  const time = new Date().getTime() + timezone
  const date = new Date(time)
  const hours = date.getUTCHours() < 12 ? `0${date.getUTCHours()}` : date.getUTCHours()
  const minutes = date.getUTCMinutes() < 10 ? `0${date.getUTCMinutes()}` : date.getUTCMinutes()
  return `${hours}:${minutes}`
}

function convertDate(timezone) {
  const time = new Date().getTime() + timezone
  const date = new Date(time)
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ]
  const dayNames = ["Sunday", "Monday", "Tueday", "Weday", "Thursday", "Friday", "Saturday"]
  return `${dayNames[date.getUTCDay()]}, ${date.getUTCDate()} ${monthNames[date.getUTCMonth()]}`
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
export { convertTime, convertTemp, convertDate }