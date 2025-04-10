import { type JSX } from 'react'
import { Link, useLocation } from 'react-router-dom'

export const Navbar = (): JSX.Element => {
  const currentLocation = useLocation()

  const stylesSwitchLocation = (path: string): string =>
    currentLocation.pathname === path
      ? 'bg-first-color underline py-1 rounded-b-md'
      : 'bg-[#a43d3e] opacity-95 hover:opacity-90 py-0'

  return (
    <div className="w-full">
      <ul className="mx-auto flex max-w-4xl items-start text-sm md:text-base lg:text-lg">
        <li
          className={`cursor-pointer rounded-bl-md border-white text-white ${stylesSwitchLocation('/')} transition-all duration-300 ease-in-out hover:underline`}
        >
          <Link to="/" className="block h-full w-full px-2">
            Inicio
          </Link>
        </li>
        <li
          className={`cursor-pointer rounded-br-md border-white text-white ${stylesSwitchLocation('/plan-de-estudios')} transition-all duration-300 ease-in-out hover:underline`}
        >
          <Link to="/plan-de-estudios" className="block h-full w-full px-2">
            Plan de Estudios
          </Link>
        </li>
        {/* <li
          className={`cursor-pointer px-2 py-1 text-white ${stylesSwitchLocation('/estadisticas')}`}
        >
          <Link to="/estadisticas">Estadísticas</Link>
        </li> */}
      </ul>
    </div>
  )
}

export default Navbar
