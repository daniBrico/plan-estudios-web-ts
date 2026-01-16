import axios from 'axios'
import { BACKEND_CONFIG } from '../config/config'

const httpClient = axios.create({
  baseURL: BACKEND_CONFIG.BASE_URL,
  withCredentials: true
})

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status
      const data = error.response?.data

      const cleanError = {
        status,
        errorCode: data?.errorCode,
        message: data?.message || 'Server error',
        emailSent: data?.emailSent,
        email: data?.email
      }

      return Promise.reject(cleanError)
    }

    return Promise.reject(error)
  }
)

export default httpClient
