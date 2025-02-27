import { type Career, type CareerNames, type HttpClient } from '../types/types'

interface createCareerApiReturn {
  getCareer: (id: string) => Promise<Career>
  getCareerNames: () => Promise<CareerNames[]>
}

export const createCareerApi = (
  httpClient: HttpClient
): createCareerApiReturn => ({
  getCareer: async (id: string): Promise<Career> =>
    await httpClient.get(`career/${id}`),

  getCareerNames: async (): Promise<CareerNames[]> =>
    await httpClient.get('career/names')
})
