import { useState } from 'react'
import { Link, NavLink, Outlet, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import SupportPage from './pages/SupportPage'
import AboutPage from './pages/AboutPage'
import BugDetectionPage from './pages/BugDetectionPage'
import AuthPage from './pages/AuthPage'
import ReviewsPage from './pages/ReviewsPage'
import ProtectedRoute from './components/ProtectedRoute'
import { useAuth } from './context/AuthContext'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  ['site-nav__link', isActive ? 'site-nav__link--active' : ''].join(' ').trim()

function Layout() {
  const currentYear = new Date().getFullYear()
  const { user, logout } = useAuth()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const displayName = user?.name ?? 'LaunchPad Pilot'
  const displayEmail = user?.email ?? 'session@launchpad.app'

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await logout()
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="site-header__inner">
          <Link className="site-logo" to="/">
            LaunchPad
          </Link>
          <nav className="site-nav" aria-label="Primary">
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/products" className={navLinkClass}>
              Products
            </NavLink>
            <NavLink to="/reviews" className={navLinkClass}>
              Reviews
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
            <NavLink to="/support" className={navLinkClass}>
              Customer support
            </NavLink>
            <NavLink to="/bug-detection" className={navLinkClass}>
              Report a bug
            </NavLink>
          </nav>
          <a className="button button--primary site-header__cta" href="mailto:support@launchpad.app">
            Email support
          </a>
          <div className="site-header__session" aria-live="polite">
            <div className="session-chip">
              <span className="session-chip__label">Signed in as</span>
              <span className="session-chip__name">{displayName}</span>
              <span className="session-chip__email">{displayEmail}</span>
            </div>
            <button
              className="button button--ghost session-chip__action"
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? 'Ending session…' : 'Log out'}
            </button>
          </div>
        </div>
      </header>

      <Outlet />

      <footer className="site-footer">
        <p>
          © {currentYear} LaunchPad Systems · <Link to="/support">Need help?</Link> ·{' '}
          <Link to="/bug-detection">Report a bug</Link>
        </p>
        <p>
          <Link to="/about">Meet the creators</Link> · Follow outage updates on{' '}
          <a href="https://status.launchpad.app" target="_blank" rel="noreferrer">
            status.launchpad.app
          </a>
        </p>
      </footer>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<AuthPage />} />
      <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="reviews" element={<ReviewsPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="support" element={<SupportPage />} />
        <Route path="bug-detection" element={<BugDetectionPage />} />
      </Route>
    </Routes>
  )
}

export default App
