import { useEffect, useState } from 'react'
import '../App.css'

function Calendar() {
  const today = new Date()

  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  )

  const [selectedDate, setSelectedDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), today.getDate())
  )

  const [events, setEvents] = useState(() => {
    try {
      const savedEvents = localStorage.getItem('phoenix-events')
      return savedEvents ? JSON.parse(savedEvents) : {}
    } catch {
      return {}
    }
  })

  const [showEventForm, setShowEventForm] = useState(false)

  const [eventTitle, setEventTitle] = useState('')
  const [eventTime, setEventTime] = useState('')
  const [eventCategory, setEventCategory] = useState('Personal')
  const [eventDescription, setEventDescription] = useState('')

  useEffect(() => {
    localStorage.setItem('phoenix-events', JSON.stringify(events))
  }, [events])

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const dayNames = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
  ]

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const calendarDays = []

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null)
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

  const formatDateKey = (date) => {
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, '0')
    const d = String(date.getDate()).padStart(2, '0')

    return `${y}-${m}-${d}`
  }

  const selectedDateKey = formatDateKey(selectedDate)

  const selectedEvents = events[selectedDateKey] || []

  const isToday = (day) => {
    if (!day) return false

    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    )
  }

  const isSelected = (day) => {
    if (!day) return false

    return (
      day === selectedDate.getDate() &&
      month === selectedDate.getMonth() &&
      year === selectedDate.getFullYear()
    )
  }

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const goToToday = () => {
    const now = new Date()

    setCurrentDate(
      new Date(now.getFullYear(), now.getMonth(), 1)
    )

    setSelectedDate(
      new Date(now.getFullYear(), now.getMonth(), now.getDate())
    )
  }

  const selectDay = (day) => {
    if (!day) return

    setSelectedDate(
      new Date(year, month, day)
    )
  }

  const openEventForm = () => {
    setShowEventForm(true)
  }

  const closeEventForm = () => {
    setShowEventForm(false)

    setEventTitle('')
    setEventTime('')
    setEventCategory('Personal')
    setEventDescription('')
  }

  const addEvent = (event) => {
    event.preventDefault()

    if (!eventTitle.trim()) return

    const newEvent = {
      id: Date.now(),
      title: eventTitle.trim(),
      time: eventTime,
      category: eventCategory,
      description: eventDescription.trim(),
    }

    setEvents((previousEvents) => ({
      ...previousEvents,
      [selectedDateKey]: [
        ...(previousEvents[selectedDateKey] || []),
        newEvent,
      ],
    }))

    closeEventForm()
  }

  const deleteEvent = (eventId) => {
    setEvents((previousEvents) => {
      const updatedEvents = {
        ...previousEvents,
        [selectedDateKey]: (
          previousEvents[selectedDateKey] || []
        ).filter((event) => event.id !== eventId),
      }

      if (updatedEvents[selectedDateKey].length === 0) {
        delete updatedEvents[selectedDateKey]
      }

      return updatedEvents
    })
  }

  const formattedSelectedDate = selectedDate.toLocaleDateString(
    'en-IN',
    {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }
  )

  return (
    <div className="calendar-page">

      {/* HEADER */}

      <div className="calendar-header">

        <div>
          <p className="eyebrow">PHOENIX PLANNER</p>

          <h1>Calendar</h1>

          <p className="calendar-subtitle">
            Plan your days. Track your progress. Stay intentional.
          </p>
        </div>

        <div className="calendar-actions">

          <button
            className="calendar-today-button"
            onClick={goToToday}
          >
            Today
          </button>

          <button
            className="calendar-add-button"
            onClick={openEventForm}
          >
            + Add Event
          </button>

        </div>

      </div>


      {/* CALENDAR CARD */}

      <div className="calendar-layout">

        <section className="calendar-card">

          {/* MONTH HEADER */}

          <div className="calendar-month-header">

            <div>

             <h2 className="calendar-title">
  {monthNames[month]} {year}
</h2>
              <p>
                Select a date to view or plan your day.
              </p>

            </div>

            <div className="month-navigation">

              <button
                onClick={goToPreviousMonth}
                aria-label="Previous month"
              >
                ←
              </button>

              <button
                onClick={goToNextMonth}
                aria-label="Next month"
              >
                →
              </button>

            </div>

          </div>


          {/* WEEK DAYS */}

          <div className="calendar-weekdays">

            {dayNames.map((day) => (
              <div
                key={day}
                className="calendar-weekday"
              >
                {day}
              </div>
            ))}

          </div>


          {/* DAYS */}

          <div className="calendar-grid">

            {calendarDays.map((day, index) => {

              if (!day) {
                return (
                  <div
                    key={`empty-${index}`}
                    className="calendar-day empty"
                  />
                )
              }

              const dateKey = formatDateKey(
                new Date(year, month, day)
              )

              const hasEvents =
                events[dateKey] &&
                events[dateKey].length > 0

              return (
                <button
                  key={day}
                  className={`calendar-day ${
                    isToday(day)
                      ? 'today'
                      : ''
                  } ${
                    isSelected(day)
                      ? 'selected'
                      : ''
                  }`}
                  onClick={() => selectDay(day)}
                >

                  <span className="calendar-day-number">
                    {day}
                  </span>

                  {hasEvents && (
                    <span className="event-dot"></span>
                  )}

                </button>
              )
            })}

          </div>

        </section>


        {/* SELECTED DATE PANEL */}

        <aside className="selected-date-card">

          <div className="selected-date-top">

            <p className="eyebrow">
              SELECTED DATE
            </p>

            <h2 className="selected-date-title">
  {formattedSelectedDate}
</h2>
          </div>


          {/* EVENTS */}

          <div className="events-section">

            <div className="events-heading">

              <h3>Events</h3>

              <span>
                {selectedEvents.length}
              </span>

            </div>


            {selectedEvents.length === 0 ? (

              <div className="empty-events">

                <div className="empty-events-icon">
                  +
                </div>

                <h4>No plans yet</h4>

                <p>
                  Add something to make this day intentional.
                </p>

                <button
                  onClick={openEventForm}
                  className="small-add-button"
                >
                  Add an event
                </button>

              </div>

            ) : (

              <div className="events-list">

                {selectedEvents.map((event) => (

                  <div
                    key={event.id}
                    className="event-item"
                  >

                    <div className="event-item-top">

                      <div>

                        <span className="event-category">
                          {event.category}
                        </span>

                        <h4>
                          {event.title}
                        </h4>

                      </div>

                      <button
                        className="delete-event-button"
                        onClick={() => deleteEvent(event.id)}
                        aria-label={`Delete ${event.title}`}
                      >
                        ×
                      </button>

                    </div>

                    {event.time && (
                      <p className="event-time">
                        🕐 {event.time}
                      </p>
                    )}

                    {event.description && (
                      <p className="event-description">
                        {event.description}
                      </p>
                    )}

                  </div>

                ))}

              </div>

            )}

          </div>

        </aside>

      </div>


      {/* ADD EVENT MODAL */}

      {showEventForm && (

        <div
          className="event-modal-overlay"
          onClick={closeEventForm}
        >

          <div
            className="event-modal"
            onClick={(event) => event.stopPropagation()}
          >

            <div className="event-modal-header">

              <div>

                <p className="eyebrow">
                  NEW EVENT
                </p>

                <h2>
                  Plan your day
                </h2>

              </div>

              <button
                className="modal-close"
                onClick={closeEventForm}
                aria-label="Close"
              >
                ×
              </button>

            </div>


            <form onSubmit={addEvent}>

              <label>
                Event title

                <input
                  type="text"
                  placeholder="What do you need to do?"
                  value={eventTitle}
                  onChange={(event) =>
                    setEventTitle(event.target.value)
                  }
                  autoFocus
                  required
                />

              </label>


              <label>
                Time

                <input
                  type="time"
                  value={eventTime}
                  onChange={(event) =>
                    setEventTime(event.target.value)
                  }
                />

              </label>


              <label>
                Category

                <select
                  value={eventCategory}
                  onChange={(event) =>
                    setEventCategory(event.target.value)
                  }
                >

                  <option>Personal</option>
                  <option>Study</option>
                  <option>College</option>
                  <option>Work</option>
                  <option>Health</option>
                  <option>Other</option>

                </select>

              </label>


              <label>
                Description

                <textarea
                  placeholder="Add some details..."
                  value={eventDescription}
                  onChange={(event) =>
                    setEventDescription(event.target.value)
                  }
                  rows="4"
                />

              </label>


              <div className="event-form-actions">

                <button
                  type="button"
                  className="cancel-button"
                  onClick={closeEventForm}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-event-button"
                >
                  Save Event
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
    
  )
}

export default Calendar
