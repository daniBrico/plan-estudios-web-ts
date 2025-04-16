import { type JSX } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV_PATHS = {
  HOME: '/',
  STUDY_PLAN: '/plan-de-estudios'
}

type NavItem = {
  path: (typeof NAV_PATHS)[keyof typeof NAV_PATHS]
  label: string
}

const navItems: NavItem[] = [
  { path: NAV_PATHS.HOME, label: 'Inicio' },
  { path: NAV_PATHS.STUDY_PLAN, label: 'Plan de Estudios' }
]

const BASE_STYLES =
  'cursor-pointer border-white text-white transition-all duration-300 ease-in-out hover:underline'
const ACTIVE_STYLES = 'bg-first-color underline py-1 rounded-b-md'
const INACTIVE_STYLES = 'bg-[#a43d3e] opacity-95 hover:opacity-90 py-0'

export const Navbar = (): JSX.Element => {
  const currentLocation = useLocation()

  const getNavItemsStyles = (path: string): string =>
    `${BASE_STYLES} ${currentLocation.pathname === path ? ACTIVE_STYLES : INACTIVE_STYLES}`

  return (
    <nav className="relative mx-auto mb-8 w-full max-w-4xl">
      <ul className="absolute mx-auto ml-4 flex items-start text-sm md:text-base lg:ml-0 lg:text-lg">
        {navItems.map((item, index) => (
          <li
            key={item.path}
            className={`${getNavItemsStyles(item.path)} ${index === 0 ? 'rounded-bl-md' : 'rounded-br-md'}`}
          >
            <Link to={item.path} className="block h-full w-full px-2">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar
