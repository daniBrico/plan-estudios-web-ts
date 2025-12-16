export const errorMessages = {
  es: {
    EMAIL_ALREADY_EXISTS: 'El correo electrónico ya está registrado',
    INVALID_CREDENTIALS: 'Correo o contraseña incorrectos',
    TOKEN_EXPIRED: 'El token ha expirado. Realice una nueva verificación',
    TOKEN_INVALID: 'Token invalido. Realice una nueva verificación',
    GENERIC_ERROR: 'Ha ocurrido un error. Por favor, inténtalo de nuevo.'
  },
  en: {
    EMAIL_ALREADY_EXISTS: 'Email already in use',
    INVALID_CREDENTIALS: 'Wrong email or password. Please try again',
    TOKEN_EXPIRED:
      'The token has expired. Please request a new verification email',
    TOKEN_INVALID: 'Invalid token. Please request a new verification.',
    GENERIC_ERROR: 'An error occurred. Please try again.'
  }
} as const
