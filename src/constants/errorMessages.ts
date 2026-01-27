export const errorMessages = {
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
  GENERIC_ERROR: 'Ha ocurrido un error. Por favor, inténtalo de nuevo.',
  UNDEFINED: 'Ha ocurrido un error inesperado. Intente más tarde.'
} as const
