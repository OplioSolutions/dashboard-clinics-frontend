export type ApiUser = { id: string; email: string | null }
export type ApiProfile = {
  id: number
  company_id: number
  name: string
  email: string
  role: 'admin' | 'staff'
  status: 'active' | 'inactive'
}

const DEFAULT_BASE_URL = 'http://localhost:8787'
const API_BASE_URL = (import.meta.env as any).VITE_API_BASE_URL || DEFAULT_BASE_URL

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
    ...init,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.error || `Request failed: ${res.status}`)
  }
  return (await res.json()) as T
}

export async function apiSignIn(email: string, password: string): Promise<{ user: ApiUser; profile: ApiProfile }> {
  return apiFetch('/auth/signin', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}

export async function apiSignOut(): Promise<{ ok: boolean }> {
  return apiFetch('/auth/signout', { method: 'POST' })
}

export async function apiMe(): Promise<{ user: ApiUser; profile: ApiProfile | null }> {
  return apiFetch('/auth/me', { method: 'GET' })
}


