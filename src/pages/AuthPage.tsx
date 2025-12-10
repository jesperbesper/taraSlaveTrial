import { useState } from 'react'
import type { FormEvent } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

type FormErrors = {
  login?: string
  register?: string
}

const initialLoginState = {
  email: '',
  password: '',
}

const initialRegisterState = {
  name: '',
  email: '',
  password: '',
}

function AuthPage() {
  const { status, user, login, register } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectPath = (location.state as { from?: string } | null)?.from || '/'

  const [loginValues, setLoginValues] = useState(initialLoginState)
  const [registerValues, setRegisterValues] = useState(initialRegisterState)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState({
    login: false,
    register: false,
  })

  if (status === 'checking') {
    return (
      <div className="full-page-gate" role="status" aria-live="polite">
        <p className="full-page-gate__text">Loading authentication experience…</p>
      </div>
    )
  }

  if (status === 'authenticated' && user) {
    return <Navigate to={redirectPath} replace />
  }

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrors((prev) => ({ ...prev, login: undefined }))
    setIsSubmitting((prev) => ({ ...prev, login: true }))

    try {
      await login({
        email: loginValues.email.trim(),
        password: loginValues.password,
      })
      navigate(redirectPath, { replace: true })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to log in'
      setErrors((prev) => ({ ...prev, login: message }))
    } finally {
      setIsSubmitting((prev) => ({ ...prev, login: false }))
    }
  }

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrors((prev) => ({ ...prev, register: undefined }))
    setIsSubmitting((prev) => ({ ...prev, register: true }))

    try {
      await register({
        name: registerValues.name.trim(),
        email: registerValues.email.trim(),
        password: registerValues.password,
      })
      navigate(redirectPath, { replace: true })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to register'
      setErrors((prev) => ({ ...prev, register: message }))
    } finally {
      setIsSubmitting((prev) => ({ ...prev, register: false }))
    }
  }

  return (
    <div className="auth-page">
      <section className="auth-hero">
        <p className="eyebrow">LaunchPad access</p>
        <h1>Secure access to mission control</h1>
        <p className="lead">
          Log in or register to reach your personalized LaunchPad experience. We use signed JSON Web Tokens
          packed into HTTP-only cookies so your session stays secure across every page.
        </p>
        <ul className="auth-benefits">
          <li>JWT sessions stored in HTTP-only cookies</li>
          <li>Single sign-on across the entire dashboard</li>
          <li>No tracking scripts — only first-party data</li>
        </ul>
      </section>

      <div className="auth-grid">
        <form className="auth-card" onSubmit={handleLogin}>
          <h2>Welcome back</h2>
          <p>Use your email and password to continue.</p>

          <label className="auth-field">
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={loginValues.email}
              onChange={(event) => setLoginValues((prev) => ({ ...prev, email: event.target.value }))}
              placeholder="you@launchpad.app"
              required
              autoComplete="email"
            />
          </label>

          <label className="auth-field">
            <span>Password</span>
            <input
              type="password"
              name="password"
              value={loginValues.password}
              onChange={(event) => setLoginValues((prev) => ({ ...prev, password: event.target.value }))}
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </label>

          {errors.login ? <p className="form-status form-status--error">{errors.login}</p> : null}

          <button className="button button--primary" type="submit" disabled={isSubmitting.login}>
            {isSubmitting.login ? 'Signing you in…' : 'Log in'}
          </button>
        </form>

        <form className="auth-card auth-card--accent" onSubmit={handleRegister}>
          <h2>Create an account</h2>
          <p>New to LaunchPad? Register and we’ll create a session instantly.</p>

          <label className="auth-field">
            <span>Full name</span>
            <input
              type="text"
              name="name"
              value={registerValues.name}
              onChange={(event) => setRegisterValues((prev) => ({ ...prev, name: event.target.value }))}
              placeholder="Ari Commander"
              required
              autoComplete="name"
            />
          </label>

          <label className="auth-field">
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={registerValues.email}
              onChange={(event) => setRegisterValues((prev) => ({ ...prev, email: event.target.value }))}
              placeholder="ari@launchpad.app"
              required
              autoComplete="email"
            />
          </label>

          <label className="auth-field">
            <span>Password</span>
            <input
              type="password"
              name="password"
              value={registerValues.password}
              onChange={(event) => setRegisterValues((prev) => ({ ...prev, password: event.target.value }))}
              placeholder="At least 8 characters"
              minLength={8}
              required
              autoComplete="new-password"
            />
          </label>

          {errors.register ? <p className="form-status form-status--error">{errors.register}</p> : null}

          <button className="button button--ghost" type="submit" disabled={isSubmitting.register}>
            {isSubmitting.register ? 'Creating secure session…' : 'Register and continue'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AuthPage

