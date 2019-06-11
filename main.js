const getProp = prop => obj => obj[prop]

const getHours = getProp('hours')
const getMinutes = getProp('minutes')
const getSeconds = getProp('seconds')

const hoursToAngle = hours => {
  const angleSlice = 360 / 24
  return angleSlice * hours
}
const minutesToAngle = () => {}
const secondsToAngle = () => {}
const getTime = () => {
  const time = new Date()
  return {
    hours: time.getHours(),
    minutes: time.getMinutes(),
    seconds: time.getSeconds()
  }
}

const interval = cb => {
  cb()
  requestAnimationFrame(interval.bind(null, cb))
}

const main = () => {
  const currentTime = getTime()
  const angleHours = hoursToAngle(getHours(currentTime))
  console.log(angleHours)
}

interval(main)
