import { type JSX } from 'react'
import { Link, useLocation } from 'react-router-dom'

export const Navbar = (): JSX.Element => {
  const currentLocation = useLocation()

  const stylesSwitchLocation = (path: string): string =>
    currentLocation.pathname === path
      ? 'bg-first-color underline'
      : 'bg-[#a43d3e] border-t-2 opacity-95'

  return (
    <div className="w-full">
      <ul className="mx-auto flex max-w-4xl text-sm md:text-base">
        <li
          className={`cursor-pointer border-r-2 border-white px-2 py-1 text-white ${stylesSwitchLocation('/')}`}
        >
          <Link to="/">Inicio</Link>
        </li>
        <li
          className={`cursor-pointer border-r-2 border-white px-2 py-1 text-white ${stylesSwitchLocation('/plan-de-estudios')}`}
        >
          <Link to="/plan-de-estudios">Plan de Estudios</Link>
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
