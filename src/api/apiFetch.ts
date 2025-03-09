import { type HttpClient } from '../types/types'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const apiFetch: HttpClient = {
  get: async <T>(url: string): Promise<T> => {
    const res = await fetch(`${BACKEND_URL}${url}`)

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)

    return res.json()
  }
}

export default apiFetch
