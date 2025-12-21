import { z } from 'zod'
import { nameSchema } from '../fields/name.schema'
import { lastNameSchema } from '../fields/lastName.schema'
import { emailSchema } from '../fields/email.schema'
import { passwordStrongSchema } from '../fields/passwordStrong.schema'

export const registerSchema = z.object({
  name: nameSchema,
  lastName: lastNameSchema,
  email: emailSchema,
  password: passwordStrongSchema
})

export type RegisterFormFields = z.infer<typeof registerSchema>
