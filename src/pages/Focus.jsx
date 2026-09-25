import { useEffect, useState } from 'react'
import '../App.css'

function Focus() {
  const [seconds, setSeconds] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [inputTime, setInputTime] = useState('25:00')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isRunning) return

    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setIsRunning(false)
          return 0
        }

        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isRunning])

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const secs = totalSeconds % 60

    return [hours, minutes, secs]
      .map((value) => String(value).padStart(2, '0'))
      .join(':')
  }

  const parseTime = (value) => {
    const parts = value.trim().split(':').map(Number)

    if (
      parts.length < 2 ||
      parts.length > 3 ||
      parts.some((part) => !Number.isInteger(part) || part < 0)
    ) {
      return null
    }

    let hours = 0
    let minutes = 0
    let secs = 0

    if (parts.length === 2) {
      ;[minutes, secs] = parts
    } else {
      ;[hours, minutes, secs] = parts
    }

    if (minutes > 99 || secs > 59 || hours > 99) {
      return null
    }

    const total = hours * 3600 + minutes * 60 + secs

    if (total < 5 * 60) {
      return null
    }

    if (total > 99 * 3600 + 99 * 60 + 59) {
      return null
    }

    return total
  }

  const handleTimeChange = (event) => {
    setInputTime(event.target.value)
    setError('')
  }

  const handleSetTime = () => {
    const parsedTime = parseTime(inputTime)

    if (parsedTime === null) {
      setError('Enter a valid time of at least 5 minutes.')
      return
    }

    setIsRunning(false)
    setSeconds(parsedTime)
    setError('')
  }

  const handleStart = () => {
    if (seconds < 5 * 60) {
      setError('Focus sessions must be at least 5 minutes.')
      return
    }

    setError('')
    setIsRunning(true)
  }

  const handleReset = () => {
    setIsRunning(false)
    setSeconds(25 * 60)
    setInputTime('25:00')
    setError('')
  }

  return (
    <main className="page-content focus-page">
      <div className="page-header">
        <p className="eyebrow">TRAIN / FOCUS</p>
        <h1>Focus</h1>
        <p className="page-subtitle">
          Give your attention one place.
        </p>
      </div>

      <section className="focus-card">
        <p className="focus-label">DEEP WORK SESSION</p>

        <div className="focus-timer">
          {formatTime(seconds)}
        </div>

        <div className="focus-time-setting">
          <label htmlFor="focus-time">
            Set focus time
          </label>

          <div className="focus-time-input-row">
            <input
              id="focus-time"
              type="text"
              value={inputTime}
              onChange={handleTimeChange}
              placeholder="25:00"
              disabled={isRunning}
            />

            <button
              className="secondary-btn"
              onClick={handleSetTime}
              disabled={isRunning}
            >
              Set Time
            </button>
          </div>

          <p className="focus-time-hint">
            Minimum 5 minutes · Use MM:SS or HH:MM:SS
          </p>

          {error && (
            <p className="focus-error">
              {error}
            </p>
          )}
        </div>

        <div className="focus-controls">
          <button
            className="primary-btn"
            onClick={handleStart}
            disabled={isRunning}
          >
            Start Focus
          </button>

          <button
            className="secondary-btn"
            onClick={() => setIsRunning(false)}
            disabled={!isRunning}
          >
            Pause
          </button>

          <button
            className="secondary-btn"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </section>
    </main>
  )
}

export default Focus