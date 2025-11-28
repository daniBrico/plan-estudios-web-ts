import axios from 'axios'

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL
  // withCredentials: true // si usas cookies JWT
})

/* httpClient.interceptors.request.use((config) => {
  // Opcional: agregar token manualmente si lo guardás en localStorage
  // const token = localStorage.getItem("token");
  // if (token) config.headers.Authorization = `Bearer ${token}`;

  return config
})
*/

export default httpClient
