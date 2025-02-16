import { type Career } from '../types/types'
import apiFetch from './apiFetch'

export const getCareer = async (id: string): Promise<Career> =>
  await apiFetch(`career/${id}`)
