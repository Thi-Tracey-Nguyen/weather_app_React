const today = new Date().getTime()
const berlin = today+32400000
const date = new Date(berlin)
console.log(`${date.getUTCHours()}:${date.getUTCMinutes()}`)
// const hours = date.getHours()
// const minutes = date.getMinutes()
// console.log(`${hours}:${minutes}`)