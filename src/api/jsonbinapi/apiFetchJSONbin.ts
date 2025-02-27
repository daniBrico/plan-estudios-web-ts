import { type HttpClient } from '../../types/types'

const API_URL = 'https://api.jsonbin.io/v3/b/'

const apiFetch: HttpClient = {
  get: async <T>(url: string): Promise<T> => {
    const res = await fetch(`${API_URL}${url}`)

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)

    return res.json()
  }
}

export default apiFetch
