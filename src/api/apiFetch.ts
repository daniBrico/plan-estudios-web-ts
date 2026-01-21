import { BACKEND_CONFIG } from '../config/config'
import { type HttpClient } from '../types/types'

const BACKEND_URL = BACKEND_CONFIG.BASE_URL

const apiFetch: HttpClient = {
  get: async <T>(url: string): Promise<T> => {
    const res = await fetch(`${BACKEND_URL}${url}`)

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)

    return res.json()
  }
}

export default apiFetch
