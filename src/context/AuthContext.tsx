import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  fetchCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
  type AuthenticatedUser,
  type LoginPayload,
  type RegisterPayload,
} from '../api/auth'

type AuthStatus = 'checking' | 'authenticated' | 'unauthenticated'

type AuthContextValue = {
  user: AuthenticatedUser | null
  status: AuthStatus
  login: (payload: LoginPayload) => Promise<AuthenticatedUser>
  register: (payload: RegisterPayload) => Promise<AuthenticatedUser>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthenticatedUser | null>(null)
  const [status, setStatus] = useState<AuthStatus>('checking')

  useEffect(() => {
    let isMounted = true

    fetchCurrentUser()
      .then(({ user: profile }) => {
        if (!isMounted) return
        setUser(profile)
        setStatus('authenticated')
      })
      .catch(() => {
        if (!isMounted) return
        setUser(null)
        setStatus('unauthenticated')
      })

    return () => {
      isMounted = false
    }
  }, [])

  const handleLogin = useCallback(async (payload: LoginPayload) => {
    const { user: profile } = await loginUser(payload)
    setUser(profile)
    setStatus('authenticated')
    return profile
  }, [])

  const handleRegister = useCallback(async (payload: RegisterPayload) => {
    const { user: profile } = await registerUser(payload)
    setUser(profile)
    setStatus('authenticated')
    return profile
  }, [])

  const handleLogout = useCallback(async () => {
    try {
      await logoutUser()
    } finally {
      setUser(null)
      setStatus('unauthenticated')
    }
  }, [])

  const contextValue = useMemo<AuthContextValue>(
    () => ({
      user,
      status,
      login: handleLogin,
      register: handleRegister,
      logout: handleLogout,
    }),
    [user, status, handleLogin, handleRegister, handleLogout],
  )

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

