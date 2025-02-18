import { type CareerNames, type Career } from '../types/types'
import apiFetch from './apiFetch'

export const getCareer = async (id: string): Promise<Career> =>
  await apiFetch(`career/${id}`)

export const getCareerNames = async (): Promise<CareerNames[]> =>
  await apiFetch('career/names')
