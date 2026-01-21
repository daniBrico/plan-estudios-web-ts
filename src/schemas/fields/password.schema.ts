import { z } from 'zod'

export const passwordSchema = z
  .string()
  .min(8, 'Debe tener al menos 8 caracteres')
  .max(24, 'No puede superar los 24 caracteres')
  .refine((val) => !val.includes(' '), {
    message: 'No puede contener espacios'
  })
