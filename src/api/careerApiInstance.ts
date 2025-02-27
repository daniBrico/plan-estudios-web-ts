import apiFetch from './apiFetch'
import { createCareerApi } from './careerApi'

const careerApi = createCareerApi(apiFetch)

export default careerApi
