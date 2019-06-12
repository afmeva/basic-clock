import {
  getHours,
  getMinutes,
  getSeconds,
  toRegularTime,
  hoursToAngle,
  toTimeInDegrees,
  createInterval,
  getTimeFromSystem
} from './main.js'

const expect = chai.expect

mocha.setup('bdd')

describe('test', () => {
  it('should get hours from the given object', () => {
    expect(
      getHours({
        hours: 2,
        seconds: 4
      })
    ).to.equal(2)
  })

  it('should get minutes from the given object', () => {
    expect(
      getMinutes({
        hours: 2,
        minutes: 20,
        seconds: 4
      })
    ).to.equal(20)
  })

  it('should get seconds from the given object', () => {
    expect(
      getSeconds({
        hours: 2,
        seconds: 4
      })
    ).to.equal(4)
  })

  it('should transform time object to regular time (12 hours based)', () => {
    expect(
      toRegularTime({
        hours: 2,
        minutes: 38,
        seconds: 45
      })
    ).to.eql({
      hours: 2,
      minutes: 38,
      seconds: 45
    })

    expect(
      toRegularTime({
        hours: 23,
        minutes: 38,
        seconds: 45
      })
    ).to.eql({
      hours: 11,
      minutes: 38,
      seconds: 45
    })
  })

  it('should convert hours to angle in degree', () => {
    expect(hoursToAngle(12)).to.equal(360)
    expect(hoursToAngle(3)).to.equal(90)
    expect(hoursToAngle(6)).to.equal(180)
    expect(hoursToAngle(9)).to.equal(270)
  })

  it('should convert regular time object to time in degree object', () => {
    const timeInDegree = toTimeInDegrees({
      hours: 3,
      minutes: 30,
      seconds: 45
    })

    expect(timeInDegree).to.eql({
      hours: 90,
      minutes: 180,
      seconds: 270
    })
  })

  it('should create interval and call callback passed', () => {
    requestAnimationFrame = chai.spy()
    const fakeCallback = chai.spy()
    const interval = createInterval(fakeCallback)

    interval()

    expect(fakeCallback).to.have.been.called()
    expect(requestAnimationFrame).to.have.been.called.with(interval)
  })

  it('should get date', () => {
    const date = new Date()
    expect(getTimeFromSystem(date)).to.eql({
      hours: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds()
    })
  })
})

mocha.run()
