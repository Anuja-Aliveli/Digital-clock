import {Component} from 'react'

import './index.css'

const imageArray = [
  {
    imgUrl: 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png',
    altText: 'pause icon',
  },
  {
    imgUrl: 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png',
    altText: 'play icon',
  },
]

class DigitalTimer extends Component {
  constructor(props) {
    super(props)
    this.state = {count: 25, minutes: 25, seconds: 0, isRun: false}
  }

  startTimer = () => {
    this.interval = setInterval(() => {
      const {minutes, seconds} = this.state
      if (minutes === 0 && seconds === 1) {
        clearInterval(this.interval)
        this.setState({isRun: false, count: 25, minutes: 25, seconds: 1})
      }
      if (seconds > 0) {
        this.setState(prevState => ({
          seconds: prevState.seconds - 1,
        }))
      } else {
        this.setState(prevState => ({
          minutes: prevState.minutes - 1,
          seconds: 59,
        }))
      }
    }, 300)
  }

  stopTimer = () => {
    clearInterval(this.interval)
  }

  onStatusChange = () => {
    const {isRun} = this.state
    this.setState(prevState => ({isRun: !prevState.isRun}))
    const isTimer = isRun ? this.stopTimer() : this.startTimer()
    console.log(isTimer)
  }

  onDecrement = () => {
    const {isRun, count} = this.state
    if (isRun) {
      this.setState(prevState => ({
        count: prevState.count,
        minutes: prevState.minutes,
      }))
    } else if (count > 1) {
      this.setState(prevState => ({
        count: prevState.count - 1,
        minutes: prevState.minutes - 1,
      }))
    }
  }

  onIncrement = () => {
    const {isRun} = this.state
    if (isRun) {
      this.setState(prevState => ({
        count: prevState.count,
        minutes: prevState.minutes,
      }))
    } else {
      this.setState(prevState => ({
        count: prevState.count + 1,
        minutes: prevState.minutes + 1,
      }))
    }
  }

  onReset = () => {
    const {isRun} = this.state
    if (isRun) {
      clearInterval(this.interval)
    }
    this.setState({count: 25, minutes: 25, seconds: 0, isRun: false})
  }

  render() {
    const {count, isRun, minutes, seconds} = this.state
    const imageStatus = isRun ? imageArray[0].imgUrl : imageArray[1].imgUrl
    const textAlt = isRun ? imageArray[0].altText : imageArray[1].altText
    const statusText = isRun ? 'Pause' : 'Start'
    const timerText = isRun ? 'Running' : 'Paused'
    return (
      <div className="bg-container">
        <h1 className="head">Digital Timer</h1>
        <div className="time-container">
          <div className="image-container">
            <div className="white-container">
              <h1 className="timer">
                {minutes < 10 ? `0${minutes}` : minutes}:
                {seconds < 10 ? `0${seconds}` : seconds}
              </h1>
              <p className="status">{timerText}</p>
            </div>
          </div>
          <div className="button-container">
            <div className="first-part">
              <div className="start-pause-reset">
                <button
                  className="button-status text"
                  type="button"
                  onClick={this.onStatusChange}
                >
                  <img
                    className="button-image"
                    alt={textAlt}
                    src={imageStatus}
                  />
                  {statusText}
                </button>
              </div>
              <div className="start-pause-reset">
                <button
                  className="button-status text"
                  type="button"
                  onClick={this.onReset}
                >
                  <img
                    className="button-image"
                    alt="reset icon"
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  />
                  Reset
                </button>
              </div>
            </div>
            <div className="second-part">
              <p className="status">Set Timer Limit</p>
              <div className="count-buttons">
                <button
                  className="count-btn"
                  type="button"
                  onClick={this.onDecrement}
                >
                  -
                </button>
                <p className="text bg-text">{count}</p>
                <button
                  className="count-btn"
                  type="button"
                  onClick={this.onIncrement}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
