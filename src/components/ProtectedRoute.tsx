import { Navigate, useLocation } from 'react-router-dom'
import type { ReactElement } from 'react'
import { useAuth } from '../context/AuthContext'

type ProtectedRouteProps = {
  children: ReactElement
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { status, user } = useAuth()
  const location = useLocation()
  const pendingDestination = `${location.pathname}${location.search}${location.hash}`

  if (status === 'checking') {
    return (
      <div className="full-page-gate" role="status" aria-live="polite">
        <p className="full-page-gate__text">Checking your session…</p>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: pendingDestination }} replace />
  }

  return children
}

export default ProtectedRoute

