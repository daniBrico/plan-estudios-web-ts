# Plan de Estudios Web

Aplicación web desarrollada para visualizar y gestionar el plan de estudios de la carrera de Informática de la UNO (Universidad Nacional del Oeste).

Permite al usuario registrar el estado de las materias (aprobadas, regularizadas, en curso o a recursar) y visualizar información académica relevante en una sección dedicada. El estado del progreso se persiste en el almacenamiento local del navegador, manteniéndose entre sesiones mientras la carrera seleccionada permanezca activa.

La aplicación onsume una API REST propia para obtener la información de las carreras y planes de estudio, integrándose con una base de datos MongoDB.

También permite el registro de usuarios y la verificación de cuenta por correo electrónico, integrándose con la API para gestionar la autenticación de forma segura.

Esta funcionalidad sienta la base para futuras mejoras orientadas a personalización, persistencia del progreso académico y nuevas características asociadas al usuario.

## Tecnologías y herramientas

- **React + TypeScript**
- **TailwindCSS** para estilos
- **React Router** para navegación
- **TanStack Query** para manejo de datos asincrónicos y cacheo
- **Zustand** para estado global
- **React Hook Form + Zod** para manejo y validación de formularios tipados
- **Axios** para comunicación con la API
- **classnames** para composición dinámica de clases

La aplicación cuenta con una estructura de carpetas modular y escalable, orientada a la separación de responsabilidades y al mantenimiento del proyecto.

## Enlaces

- API utilizada: [Repositorio](https://github.com/daniBrico/api-plan-de-estudios-ts)
- Sitio web: [Plan de Estudios](https://danibrico.github.io/plan-estudios-web-ts)

## Objetivo del proyecto

El proyecto fue desarrollado con el objetivo de aplicar buenas prácticas en aplicaciones React modernas, haciendo foco en tipado estricto, manejo de estado, validación de datos y arquitectura escalable.
