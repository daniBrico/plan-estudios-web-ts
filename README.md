# Plan de estudios web

Esta aplicación representa el plan de estudios de la UNO (Universidad Nacional del Oeste) de la carrera de informática. Permite al usuario seleccionar el estado de las materias que han cursado, especificando si están aprobadas, regularizadas, en curso, o si la debe recursar. Además, en la sección de "Info. Académica", muestra un pequeño cuadro con información relacionada a las materias.

Los cambios realizados por el usuario se guardan en el almacenamiento local (Local Storage), a menos que se quite la carrera seleccionada del selector.

La aplicación obtiene la información de la carrera (por el momento, solo de Informática) desde una API que se conecta a una base de datos MongoDB.

Repositorio de la API: [link](https://github.com/daniBrico/api-plan-de-estudios-ts).

Fue desarrollada utilizando React, TailwindCSS y Typescript.

Puedes visitar el sitio en el siguiente [link](https://danibrico.github.io/plan-estudios-web-ts).
