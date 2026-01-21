import { z } from 'zod'

export const lastNameSchema = z
  .string()
  .trim()
  .min(2, 'El apellido debe tener al menos dos caracteres')
  .max(50, 'El apellido no debe superar los 50 caracteres')
  .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'El apellido solo puede contener letras')
