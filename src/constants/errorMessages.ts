export const errorMessages = {
  es: {
    EMAIL_ALREADY_EXISTS:
      'No se pudo completar el registro. Verificá los datos ingresados.',
    INVALID_CREDENTIALS: 'Correo o contraseña incorrectos',
    TOKEN_EXPIRED: 'El token ha expirado. Realice una nueva verificación',
    TOKEN_INVALID: 'Token invalido. Realice una nueva verificación',
    EMAIL_SENT:
      'Si la dirección de correo es correcta, enviaremos un código de verificación. Asegúrate de revisar la bandeja de entrada o la carpeta de spam. Si no lo recibes en unos minutos, podrás solicitar un reenvío al intentar iniciar sesión.',
    VERIFICATION_EMAIL_TOO_SOON:
      'Ya hemos enviamos un mail de verificación anteriormente. Espera unos minutos e inicia sesión para volver a intentarlo.',
    VERIFICATION_EMAIL_LIMITE_REACHED:
      'Alcanzaste el número máximo de intentos de verificación permitidos por hoy. Intenta nuevamente mañana.',
    VERIFICATION_EMAIL_SEND_FAILED:
      'Lo sentimos. Ha ocurrido un problema al intentar enviar el mail de verificación. Vuelva a intentarlo en otro momento.',
    EMAIL_VERIFICATION_REQUIRED:
      'La cuenta aún no ha sido verificada. Un nuevo mail de verificación ha sido enviado. Asegúrate de revisar la bandeja de entrada o la carpeta de spam.',
    GENERIC_ERROR: 'Ha ocurrido un error. Por favor, inténtalo de nuevo.'
  },
  en: {
    EMAIL_ALREADY_EXISTS:
      'The registration could not be completed. Please check the information you entered.',
    INVALID_CREDENTIALS: 'Wrong email or password. Please try again',
    TOKEN_EXPIRED:
      'The token has expired. Please request a new verification email',
    TOKEN_INVALID: 'Invalid token. Please request a new verification.',
    EMAIL_SENT: '',
    VERIFICATION_EMAIL_TOO_SOON:
      'We have already sent a verification email recently. Please wait a few minutes and try logging in again.',
    VERIFICATION_EMAIL_LIMITE_REACHED:
      'You have reached the maximum number of verification attempts allowed today. Please try again tomorrow.',
    VERIFICATION_EMAIL_SEND_FAILED:
      'Sorry, we were unable to send the verification email. Please try again later.',
    EMAIL_VERIFICATION_REQUIRED:
      'The account has not yet been verified. A new verification email has been sent. Please make sure to check your inbox or spam folder.',
    GENERIC_ERROR: 'An error occurred. Please try again.'
  }
} as const
