import { z } from 'zod'

export const nameSchema = z
  .string()
  .trim()
  .min(2, 'El nombre debe tener al menos dos caracteres')
  .max(25, 'El nombre no debe superar los 25 caracteres')
  .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'El nombre solo puede contener letras')
