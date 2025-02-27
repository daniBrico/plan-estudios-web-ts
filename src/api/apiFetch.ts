import { type HttpClient } from '../types/types'

const API_URL = 'http://localhost:3000/'

const apiFetch: HttpClient = {
  get: async <T>(url: string): Promise<T> => {
    const res = await fetch(`${API_URL}${url}`)

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)

    return res.json()
  }
}

export default apiFetch

// const API_URL = 'http://localhost:3000/'

// const apiFetch = async <T>(url: string): Promise<T> => {
//   const res = await fetch(`${API_URL}${url}`)

//   if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)

//   return res.json()
// }

// export default apiFetch
