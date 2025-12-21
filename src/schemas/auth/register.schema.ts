import { z } from 'zod'
import { passwordSchema } from '../fields/password.schema'
import { nameSchema } from '../fields/name.schema'
import { lastNameSchema } from '../fields/lastName.schema'
import { emailSchema } from '../fields/email.schema'

export const registerSchema = z.object({
  name: nameSchema,
  lastName: lastNameSchema,
  email: emailSchema,
  password: passwordSchema
})

export type RegisterFormFields = z.infer<typeof registerSchema>
