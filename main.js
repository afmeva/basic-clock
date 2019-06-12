const NOON =  12

const getProp = prop => obj => obj[prop]

const getHours = getProp('hours')
const getMinutes = getProp('minutes')
const getSeconds = getProp('seconds')

const transform = ({hours, minutes, seconds}) => {
  const transformedHours = hours > NOON? hours - NOON : hours

  return {
    hours: transformedHours,
    minutes,
    seconds,
  }
}

const hoursToAngle = hours => {
  const angleSlice = 360 / NOON
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
  const currentTime = transform(getTime())
  const angleHours = hoursToAngle(getHours(currentTime))
  console.log(angleHours)
}

interval(main)
