import axios from 'axios'

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
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
        emailSent: data?.emailSent
      }

      return Promise.reject(cleanError)
    }

    return Promise.reject(error)
  }
)

export default httpClient
