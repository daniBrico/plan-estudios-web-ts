import {
  type Career,
  type CareerNamesAndID,
  type HttpClient
} from '../types/types'

interface createCareerApiReturn {
  getCareer: (id: string) => Promise<Career>
  getCareerNames: () => Promise<CareerNamesAndID[]>
}

export const createCareerApi = (
  httpClient: HttpClient
): createCareerApiReturn => ({
  getCareer: async (id: string): Promise<Career> =>
    await httpClient.get(`career/${id}`),

  getCareerNames: async (): Promise<CareerNamesAndID[]> =>
    await httpClient.get('career/names')
})
