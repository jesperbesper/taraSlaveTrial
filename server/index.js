import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'node:crypto'

const PORT = Number(process.env.PORT) || 4000
const JWT_SECRET = process.env.JWT_SECRET || 'change-me-in-production'
const COOKIE_NAME = 'session'
const COOKIE_TTL_MS = 7 * 24 * 60 * 60 * 1000 // 7 days

const origin = process.env.CLIENT_ORIGIN || 'http://localhost:5173'

const app = express()

app.use(
  cors({
    origin,
    credentials: true,
  }),
)
app.use(express.json())
app.use(cookieParser())

const usersByEmail = new Map()
const usersById = new Map()

const baseCookieConfig = {
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  path: '/',
}

const sanitizeUser = (user) => {
  if (!user) return null
  const { passwordHash, ...safeUser } = user
  return safeUser
}

const setSessionCookie = (res, userId) => {
  const token = jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: '7d' })
  res.cookie(COOKIE_NAME, token, {
    ...baseCookieConfig,
    maxAge: COOKIE_TTL_MS,
  })
  return token
}

const requireAuth = (req, res, next) => {
  const token = req.cookies?.[COOKIE_NAME]
  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' })
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET)
    const user = usersById.get(payload.sub)
    if (!user) {
      return res.status(401).json({ message: 'Session is no longer valid' })
    }
    req.user = user
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired session' })
  }
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.get('/api/auth/me', requireAuth, (req, res) => {
  res.json({ user: sanitizeUser(req.user) })
})

app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body || {}

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' })
    }

    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters' })
    }

    const normalizedEmail = String(email).trim().toLowerCase()

    if (usersByEmail.has(normalizedEmail)) {
      return res.status(409).json({ message: 'An account with that email already exists' })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const newUser = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: normalizedEmail,
      passwordHash,
      createdAt: new Date().toISOString(),
    }

    usersByEmail.set(normalizedEmail, newUser)
    usersById.set(newUser.id, newUser)

    setSessionCookie(res, newUser.id)

    return res.status(201).json({ user: sanitizeUser(newUser) })
  } catch (error) {
    console.error('Error registering user', error)
    return res.status(500).json({ message: 'Unable to register right now' })
  }
})

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body || {}

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    const normalizedEmail = String(email).trim().toLowerCase()
    const user = usersByEmail.get(normalizedEmail)

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash)
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    setSessionCookie(res, user.id)
    return res.json({ user: sanitizeUser(user) })
  } catch (error) {
    console.error('Error logging in user', error)
    return res.status(500).json({ message: 'Unable to log in right now' })
  }
})

app.post('/api/auth/logout', (req, res) => {
  res.clearCookie(COOKIE_NAME, baseCookieConfig)
  res.status(204).end()
})

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.listen(PORT, () => {
  console.log(`Auth server listening on http://localhost:${PORT}`)
})

