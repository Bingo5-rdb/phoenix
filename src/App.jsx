import './App.css'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import Calendar from './pages/Calendar'
import Focus from './pages/Focus'

function App() {
  const navigate = useNavigate()

  return (
    <div className="phoenix-app">

      {/* SIDEBAR */}
      <aside className="sidebar">

        <div className="brand">
          <div className="brand-mark">✦</div>

          <div>
            <h1>PHOENIX</h1>
            <span>RISE. REBUILD. EVOLVE.</span>
          </div>
        </div>

        <nav className="navigation">

          {/* MAIN */}
          <div className="nav-section">
            <p className="nav-label">MAIN</p>

            <button
              className="nav-item active"
              onClick={() => navigate('/')}
            >
              <span>◈</span>
              Today
            </button>

            <button
              className="nav-item"
              onClick={() => navigate('/calendar')}
            >
              <span>▣</span>
              Calendar
            </button>
          </div>

          {/* TRAIN */}
          <div className="nav-section">
            <p className="nav-label">TRAIN</p>

           <button
  className="nav-item"
  onClick={() => navigate('/focus')}
>
  <span>◉</span>
  Focus
</button>

            <button className="nav-item">
              <span>⌁</span>
              Aptitude
            </button>

            <button className="nav-item">
              <span>◇</span>
              Knowledge
            </button>

            <button className="nav-item">
              <span>W</span>
              Word Lab
            </button>

            <button className="nav-item">
              <span>◎</span>
              Memory
            </button>
          </div>

          {/* EXPLORE */}
          <div className="nav-section">
            <p className="nav-label">EXPLORE</p>

            <button className="nav-item">
              <span>◌</span>
              Current Affairs
            </button>

            <button className="nav-item">
              <span>✧</span>
              Discover
            </button>
          </div>

          {/* RESET */}
          <div className="nav-section">
            <p className="nav-label">RESET</p>

            <button className="nav-item">
              <span>⌁</span>
              Mindful Reset
            </button>
          </div>

        </nav>

        <div className="sidebar-footer">
          <div className="phoenix-line"></div>
          <p>BUILD A STRONGER MIND.</p>
        </div>

      </aside>


      {/* MAIN CONTENT */}
      <main className="main-content">

        {/* TOP BAR */}
        <header className="topbar">

          <div>
            <p className="eyebrow">TODAY</p>

            <h2>Good morning.</h2>

            <p className="subtitle">
              Ready to rise?
            </p>
          </div>

          <button className="profile-button">
            <span className="profile-avatar">A</span>
            <span>Profile</span>
          </button>

        </header>


        {/* STATS */}
        <section className="stats-grid">

          <div className="stat-card highlight">

            <div className="stat-top">
              <span>Brain Score</span>
              <span className="stat-symbol">✦</span>
            </div>

            <strong>72</strong>

            <p>
              Consistency & activity
            </p>

          </div>


          <div className="stat-card">

            <div className="stat-top">
              <span>Progress</span>
              <span className="stat-symbol">↗</span>
            </div>

            <strong>64%</strong>

            <p>
              Today's training
            </p>

          </div>


          <div className="stat-card">

            <div className="stat-top">
              <span>Streak</span>
              <span className="stat-symbol">◈</span>
            </div>

            <strong>
              7 <small>days</small>
            </strong>

            <p>
              Keep showing up
            </p>

          </div>

        </section>


        {/* TODAY'S TRAINING */}
        <section className="training-section">

          <div className="section-heading">

            <div>
              <p className="eyebrow">
                YOUR ROUTINE
              </p>

              <h3>
                Today's training
              </h3>
            </div>

            <span className="completion">
              2 / 5 completed
            </span>

          </div>


          <div className="training-list">

            {/* FOCUS */}
            <button className="training-card completed">

              <div className="training-icon">
                ✓
              </div>

              <div className="training-info">

                <h4>
                  Focus
                </h4>

                <p>
                  Train your attention span
                </p>

              </div>

              <span className="training-status">
                Completed
              </span>

              <span className="arrow">
                →
              </span>

            </button>


            {/* APTITUDE */}
            <button className="training-card">

              <div className="training-icon">
                ⌁
              </div>

              <div className="training-info">

                <h4>
                  Aptitude
                </h4>

                <p>
                  Challenge your problem-solving
                </p>

              </div>

              <span className="training-status">
                10 min
              </span>

              <span className="arrow">
                →
              </span>

            </button>


            {/* KNOWLEDGE */}
            <button className="training-card">

              <div className="training-icon">
                ◇
              </div>

              <div className="training-info">

                <h4>
                  Knowledge
                </h4>

                <p>
                  Learn something useful
                </p>

              </div>

              <span className="training-status">
                10 min
              </span>

              <span className="arrow">
                →
              </span>

            </button>


            {/* WORD LAB */}
            <button className="training-card">

              <div className="training-icon">
                W
              </div>

              <div className="training-info">

                <h4>
                  Word Lab
                </h4>

                <p>
                  Expand your vocabulary
                </p>

              </div>

              <span className="training-status">
                5 min
              </span>

              <span className="arrow">
                →
              </span>

            </button>


            {/* MEMORY */}
            <button className="training-card">

              <div className="training-icon">
                ◎
              </div>

              <div className="training-info">

                <h4>
                  Memory
                </h4>

                <p>
                  Strengthen your retention
                </p>

              </div>

              <span className="training-status">
                5 min
              </span>

              <span className="arrow">
                →
              </span>

            </button>

          </div>

        </section>


        {/* BOTTOM CARDS */}
        <section className="bottom-grid">

          {/* QUOTE */}
          <div className="quote-card">

            <div className="quote-symbol">
              “
            </div>

            <p>
              Your attention is one of your most valuable
              resources. Spend it deliberately.
            </p>

            <span>
              PHOENIX PRINCIPLE 01
            </span>

          </div>


          {/* RESET */}
          <div className="reset-card">

            <div>

              <p className="eyebrow">
                NEED A RESET?
              </p>

              <h3>
                Clear your mind.
              </h3>

              <p>
                Take a short mindful break and come back sharper.
              </p>

            </div>

            <button className="reset-button">
              Start reset →
            </button>

          </div>

        </section>

      </main>

    </div>
  )
}


/* =========================
   ROUTER
========================= */

function AppRouter() {
  return (
    <BrowserRouter>

     <Routes>
  <Route path="/" element={<App />} />
  <Route path="/calendar" element={<Calendar />} />
  <Route path="/focus" element={<Focus />} />
</Routes>

    </BrowserRouter>
  )
}


export default AppRouter