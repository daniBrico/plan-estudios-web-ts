import { type JSX } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import NavbarItem from './NavbarItem'

const navItems = [
  { path: '/inicio', label: 'Inicio' },
  { path: '/plan-de-estudios', label: 'Plan de Estudios' },
  { path: '/info-academica', label: 'Info. Académica' }
]

export const Navbar = (): JSX.Element => {
  const currentLocation = useLocation()
  const navigate = useNavigate()

  const handleClickNavigate = (path: string): void => {
    if (currentLocation.pathname !== path) navigate(path)
  }

  return (
    <nav className="relative mx-auto mb-8 w-full max-w-4xl">
      <ul className="absolute mx-auto ml-4 flex items-start text-sm md:text-base lg:ml-0 lg:text-lg">
        {navItems.map((item, index) => (
          <NavbarItem
            key={item.path}
            label={item.label}
            isActive={currentLocation.pathname === item.path}
            isFirst={index === 0}
            isLast={index === navItems.length - 1}
            onClick={() => handleClickNavigate(item.path)}
          />
        ))}
      </ul>
    </nav>
  )
}

export default Navbar
