# Plan de estudios web

Esta aplicación representa el plan de estudios de la UNO (Universidad Nacional del Oeste) de la carrera de informática. Permite a los usuarios seleccionar el estado de las materias que han cursado, especificando si están aprobadas, regularizadas, en curso, o si deben recursarlas. Además, al final de la página, muestra un pequeño cuadro con información relacionada a las materias y sus estados.

Los cambios realizados por el usuario se guardan en el almacenamiento local (Local Storage), a menos que se quite la carrera seleccionada en el selector.

La aplicación obtiene la información de la carrera (por el momento, solo de Informática) desde una API que se conecta a una base de datos MongoDB.

Fue desarrollada utilizando React, TailwindCSS y Typescript.
