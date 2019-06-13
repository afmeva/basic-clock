const NOON = 12
const MINUTES = 60
const SECONDS = 60

const getProp = prop => obj => obj[prop]

export const getHours = getProp('hours')
export const getMinutes = getProp('minutes')
export const getSeconds = getProp('seconds')

export const toRegularTime = ({ hours, minutes, seconds }) => {
  const transformedHours = hours > NOON ? hours - NOON : hours

  return {
    hours: transformedHours,
    minutes,
    seconds
  }
}
const numberToAngle = slices => number => (360 * number) / slices
export const hoursToAngle = numberToAngle(NOON)
export const minutesToAngle = numberToAngle(MINUTES)
export const secondsToAngle = numberToAngle(SECONDS)

export const toTimeInDegrees = time => ({
  hours: hoursToAngle(getHours(time)),
  minutes: minutesToAngle(getMinutes(time)),
  seconds: secondsToAngle(getSeconds(time))
})

export const getTimeFromSystem = date => ({
  hours: date.getHours(),
  minutes: date.getMinutes(),
  seconds: date.getSeconds()
})

const setAngle = node => angle => {
  node.style.transform = `translate(-50%, 0) rotate(${angle}deg)`
}

const setHoursAngle = setAngle(document.querySelector('.hours-stick'))
const setMinutesAngle = setAngle(document.querySelector('.minutes-stick'))
const setSecondsAngle = setAngle(document.querySelector('.seconds-stick'))

const paintTimeInDegrees = timeInDegrees => {
  setHoursAngle(getHours(timeInDegrees))
  setMinutesAngle(getMinutes(timeInDegrees))
  setSecondsAngle(getSeconds(timeInDegrees))
}

export const createInterval = callback => {
  return function loop() {
    callback()
    requestAnimationFrame(loop)
  }
}

const main = () => {
  const currentTime = toRegularTime(getTimeFromSystem(new Date()))
  const timeInDegrees = toTimeInDegrees(currentTime)

  paintTimeInDegrees(timeInDegrees)
}

export const init = createInterval(main)
