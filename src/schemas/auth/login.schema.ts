import { z } from 'zod'
import { passwordSchema } from '../fields/password.schema'
import { emailSchema } from '../fields/email.schema'

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema
})

export type LoginFormFields = z.infer<typeof loginSchema>
