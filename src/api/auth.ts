export type AuthenticatedUser = {
  id: string
  name: string
  email: string
  createdAt: string
}

export type RegisterPayload = {
  name: string
  email: string
  password: string
}

export type LoginPayload = {
  email: string
  password: string
}

type AuthResponse = {
  user: AuthenticatedUser
}

const jsonHeaders = {
  'Content-Type': 'application/json',
}

async function parseResponse<T>(response: Response): Promise<T> {
  const text = await response.text()
  const data = text ? (JSON.parse(text) as T & { message?: string }) : ({} as T)

  if (!response.ok) {
    const message = (data as { message?: string })?.message || 'Unable to fulfill request'
    throw new Error(message)
  }

  return data
}

export async function registerUser(payload: RegisterPayload) {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: jsonHeaders,
    body: JSON.stringify(payload),
    credentials: 'include',
  })

  return parseResponse<AuthResponse>(response)
}

export async function loginUser(payload: LoginPayload) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: jsonHeaders,
    body: JSON.stringify(payload),
    credentials: 'include',
  })

  return parseResponse<AuthResponse>(response)
}

export async function logoutUser() {
  const response = await fetch('/api/auth/logout', {
    method: 'POST',
    credentials: 'include',
  })

  await parseResponse<Record<string, never>>(response)
}

export async function fetchCurrentUser() {
  const response = await fetch('/api/auth/me', {
    credentials: 'include',
  })

  return parseResponse<AuthResponse>(response)
}

