import { Link, NavLink, Outlet, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import SupportPage from './pages/SupportPage'
import AboutPage from './pages/AboutPage'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  ['site-nav__link', isActive ? 'site-nav__link--active' : ''].join(' ').trim()

function Layout() {
  const currentYear = new Date().getFullYear()

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
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
            <NavLink to="/support" className={navLinkClass}>
              Customer support
            </NavLink>
          </nav>
          <a className="button button--primary site-header__cta" href="mailto:support@launchpad.app">
            Email support
          </a>
        </div>
      </header>

      <Outlet />

      <footer className="site-footer">
        <p>
          © {currentYear} LaunchPad Systems · <Link to="/support">Need help?</Link>
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
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="support" element={<SupportPage />} />
      </Route>
    </Routes>
  )
}

export default App
