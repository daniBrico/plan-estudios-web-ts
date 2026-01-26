import { useRef, useState, type JSX } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import NavbarItem from './NavbarItem'
import { useAuthContext } from '../../../hooks/useAuthContext'
import ProfileMenu from './ProfileMenu'
import DropdownMenu from './DropdownMenu/DropdownMenu'
import DropdownItem from './DropdownMenu/DropdownItem'
import useCloseOnClickOutside from '../../../hooks/useCloseOnClickOutside'
import useCloseOnScroll from '../../../hooks/useCloseOnScroll'

const navItems = [
  { path: '/inicio', label: 'Inicio' },
  { path: '/plan-de-estudios', label: 'Plan de Estudios' },
  { path: '/info-academica', label: 'Info. Académica' }
]

const navAuthItems = [
  { path: '/register', label: 'Registrarse' },
  { path: '/login', label: 'Iniciar Sesión' }
]

export const Navbar = (): JSX.Element => {
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  const currentLocation = useLocation()
  const navigate = useNavigate()

  const navBarItemRef = useRef(null)
  const ulRef = useRef(null)

  const { isAuthenticated, isAuthLoading } = useAuthContext()

  const handleClickNavigate = (path: string): void => {
    if (currentLocation.pathname !== path) navigate(path)
    setMenuIsOpen(false)
  }

  useCloseOnClickOutside({
    isOpen: menuIsOpen,
    onClose: () => setMenuIsOpen(false),
    ref: navBarItemRef,
    excludeRefs: [ulRef]
  })

  useCloseOnScroll({
    isOpen: menuIsOpen,
    onClose: () => setMenuIsOpen(false)
  })

  return (
    <nav className="relative mx-auto w-full max-w-4xl">
      <div className="absolute flex w-full justify-between px-4 lg:px-0">
        <ul className="flex items-start text-sm md:text-base lg:ml-0 lg:text-lg">
          <NavbarItem
            ref={navBarItemRef}
            label="Menu"
            isActive={menuIsOpen}
            isFirst={true}
            isLast={true}
            onClick={() => setMenuIsOpen(!menuIsOpen)}
          />
          <DropdownMenu ref={ulRef} isOpen={menuIsOpen} cssClassess="top-full">
            {navItems.map((item) => (
              <DropdownItem
                key={item.path}
                onClick={() => handleClickNavigate(item.path)}
              >
                {item.label}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </ul>
        <ul className="relative flex items-start text-sm md:text-base lg:ml-0 lg:text-lg">
          {isAuthLoading ? null : isAuthenticated ? (
            <ProfileMenu />
          ) : (
            navAuthItems.map((item, index) => (
              <NavbarItem
                key={item.path}
                label={item.label}
                isActive={currentLocation.pathname === item.path}
                isFirst={index === 0}
                isLast={index === navAuthItems.length - 1}
                onClick={() => handleClickNavigate(item.path)}
              />
            ))
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
