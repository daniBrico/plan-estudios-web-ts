import {
  type Career,
  type CareerNames,
  type HttpClient
} from '../../types/types'

interface createCareerApiReturn {
  getCareer: () => Promise<Career>
  getCareerNames: () => Promise<CareerNames[]>
}

const JSONbinCareer = '67ad5c22ad19ca34f801555c'
const JSONbinCareerNames = '67bfcd05e41b4d34e49d8d9c'

export const createCareerApi = (
  httpClient: HttpClient
): createCareerApiReturn => ({
  getCareer: async (): Promise<Career> => await httpClient.get(JSONbinCareer),

  getCareerNames: async (): Promise<CareerNames[]> =>
    await httpClient.get(JSONbinCareerNames)
})
