import { type JSX } from 'react'
import { RightArrowSvg } from '../components/svg-components/RightArrowSvg'
import { Link } from 'react-router-dom'

export const NotFoundPage = (): JSX.Element => {
  return (
    <>
      <article className="container flex flex-1 flex-col items-center justify-center px-4">
        <div className="flex flex-col">
          <h1 className="text-primary text-8xl font-extrabold tracking-wide sm:text-9xl md:text-9xl dark:text-stone-700">
            404
          </h1>
          <div className="mt-4 flex h-48 flex-col gap-4 text-sm text-gray-800 md:text-lg dark:text-stone-500">
            {/* <span className="font-bold">LOOKS LIKE YOU'RE LOST</span> */}
            <span className="font-bold">PARECE QUE TE ENCUENTRAS PERDIDO</span>
            <p className="opacity-40 dark:opacity-90">
              La página que estás buscando no está disponible o no existe!
            </p>
            {/* <p className="opacity-40">
              The page you are looking for not avaible!
            </p> */}
            <Link className="mt-auto flex" to={'/inicio'}>
              <div className="group flex cursor-pointer gap-4">
                <button className="cursor-pointer text-start font-bold group-hover:underline">
                  VOLVER AL INICIO
                </button>
                {/* <button className="cursor-pointer text-start font-bold">
                  GO TO HOME
                </button> */}
                <div className="w-10 fill-gray-800 stroke-gray-800 dark:stroke-stone-500">
                  <RightArrowSvg />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </article>
    </>
  )
}
