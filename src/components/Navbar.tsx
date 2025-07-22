import React, { type JSX } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const NAV_PATHS = {
  HOME: '/inicio',
  STUDY_PLAN: '/plan-de-estudios',
  STATS: '/estadisticas'
}

type NavItem = {
  path: (typeof NAV_PATHS)[keyof typeof NAV_PATHS]
  label: string
}

const navItems: NavItem[] = [
  { path: NAV_PATHS.HOME, label: 'Inicio' },
  { path: NAV_PATHS.STUDY_PLAN, label: 'Plan de Estudios' },
  { path: NAV_PATHS.STATS, label: 'Estadísticas' }
]

const BASE_STYLES =
  'border-back text-white transition-all duration-300 ease-in-out hover:underline'
const ACTIVE_STYLES = 'bg-theme-first-color underline py-1 rounded-b-md'
const INACTIVE_STYLES = 'bg-[#a43d3e] opacity-95 hover:bg-[#a43d3e]/90 py-0'

export const Navbar = (): JSX.Element => {
  const currentLocation = useLocation()
  const navigate = useNavigate()

  const getNavItemsStyles = (path: string): string =>
    `${BASE_STYLES} ${currentLocation.pathname === path ? ACTIVE_STYLES : INACTIVE_STYLES}`

  const handleClickNavigate = (path: string): void => {
    if (currentLocation.pathname !== path) navigate(path)
  }

  return (
    <nav className="relative mx-auto mb-8 w-full max-w-4xl">
      <ul className="absolute mx-auto ml-4 flex items-start text-sm md:text-base lg:ml-0 lg:text-lg">
        {navItems.map((item, index) => (
          <li
            key={item.path}
            className={`${getNavItemsStyles(item.path)} ${index === 0 ? 'rounded-bl-md' : index === navItems.length - 1 ? 'rounded-br-md' : 'border-r border-l'}`}
          >
            <button
              className="block h-full w-full cursor-pointer px-2"
              onClick={() => handleClickNavigate(item.path)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar
