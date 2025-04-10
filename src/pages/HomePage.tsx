import { type JSX } from 'react'

function HomePage(): JSX.Element {
  return (
    <>
      <div className="w-full">
        <div className="mx-auto max-w-4xl p-4 text-sm sm:p-6 md:text-base lg:px-0">
          <h1 className="text-first-color text-center text-lg font-semibold tracking-wide md:text-2xl lg:text-3xl">
            ¡Bienvenidos al Plan de Estudios Web!
          </h1>
          <p className="mt-2">
            Esta web representa el Plan de Estudios de la carrera de Informática
            de la Universidad Nacional del Oeste (
            <a
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.uno.edu.ar/index.php/carreras/66-licenciatura-en-informatica"
            >
              UNO
            </a>
            ).
          </p>
          <br />
          <p>
            Además de tener al alcance la información del documento, permite
            interactuar de cierta forma con él, modificando el estado de las
            materias y obteniendo algunas estadísticas (en desarrollo).
          </p>
          <br />
          <p>
            Este es un pequeño proyecto realizado por un estudiante. La
            información utilizada es pública y podrá encontrarla en los sitios
            oficiales linkeados.
          </p>
          <h2 className="text-first-color mt-2 text-lg font-semibold tracking-wide md:text-xl lg:text-2xl">
            Características
          </h2>
          <p>
            Al comienzo, el selector de carrera estará vacío. Debe seleccionar
            el Plan de Estudios (por ahora solo tiene el de Informática), para
            cargar todas las materias del mismo. <br /> <br />
            Cuando modifique los estados de las materias, esta información será
            guardada en el almacenamiento local del navegador para no perder sus
            cambios.
          </p>
          <br />
          <p>
            Si presiona la casilla de correlativas, se abrirá una ventana
            emergente con el o los nombres de las mismas junto a su código de
            materia.
          </p>
          <br />
          <p className="mb-1">
            <b>Importante</b>:
          </p>
          <ul>
            <li className="ml-8 list-disc">
              Si una materia tiene correlativas y al menos una se encuentra sin
              aprobar, no se permite modificar el estado de la misma.
            </li>
            <li className="ml-8 list-disc">
              Si se quita el estado de una materia, aquellas que dependan de
              esta, sea cual sea el estado que tengan, será quitado también.
            </li>
            <li className="ml-8 list-disc">
              Si se borra la carrera seleccionada del selector, el
              almacenamiento local será borrado por completo con todos los
              cambios realizados.
            </li>
          </ul>
          <br />
        </div>
      </div>
    </>
  )
}

export default HomePage
