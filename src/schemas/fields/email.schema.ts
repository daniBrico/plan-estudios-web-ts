import { z } from 'zod'

export const emailSchema = z
  .email('Debe ser un email válido')
  .trim()
  .toLowerCase()
