import { type Career } from '../types/types'

const API_URL = 'http://localhost:3000/'

const apiFetch = async (url: string): Promise<Career> => {
  const res = await fetch(`${API_URL}${url}`)

  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)

  return res.json()
}

export default apiFetch
