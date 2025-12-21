import { passwordSchema } from './password.schema'

export const passwordStrongSchema = passwordSchema
  .regex(/[a-z]/, 'Debe contener al menos una minúscula')
  .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
  .regex(/[0-9]/, 'Debe contener al menos un número')
  // .regex(/[^a-zA-Z0-9]/, 'Debe contener al menos un símbolo')
  .refine((val) => !val.includes(' '), {
    message: 'No puede contener espacios'
  })
