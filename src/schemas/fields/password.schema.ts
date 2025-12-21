import { z } from 'zod'

export const passwordSchema = z
  .string()
  .min(8, 'Debe tener al menos 8 caracteres')
  .max(64, 'No puede superar los 64 caracteres')
  .regex(/[a-z]/, 'Debe contener al menos una minúscula')
  .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
  .regex(/[0-9]/, 'Debe contener al menos un número')
  .regex(/[^a-zA-Z0-9]/, 'Debe contener al menos un símbolo')
  .refine((val) => !val.includes(' '), {
    message: 'No puede contener espacios'
  })
