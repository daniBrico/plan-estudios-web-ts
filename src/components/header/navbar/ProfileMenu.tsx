import { type JSX, useRef, useState } from 'react'
import NavbarItem from './NavbarItem'
import { useAuthContext } from '../../../hooks/useAuthContext'
import useCloseOnClickOutside from '../../../hooks/useCloseOnClickOutside'
import useCloseOnScroll from '../../../hooks/useCloseOnScroll'
import DropdownMenu from './DropdownMenu/DropdownMenu'
import DropdownItem from './DropdownMenu/DropdownItem'

const ProfileMenu = (): JSX.Element => {
  const [profileMenuIsOpen, setProfileMenuIsOpen] = useState(false)

  const navBarItemRef = useRef(null)
  const ulRef = useRef(null)

  const { user, logout } = useAuthContext()

  useCloseOnClickOutside({
    isOpen: profileMenuIsOpen,
    onClose: () => setProfileMenuIsOpen(false),
    ref: navBarItemRef,
    excludeRefs: [ulRef]
  })

  useCloseOnScroll({
    isOpen: profileMenuIsOpen,
    onClose: () => setProfileMenuIsOpen(false)
  })

  const handleLogout = (): void => logout()

  return (
    <>
      <NavbarItem
        ref={navBarItemRef}
        label={user ? user.name : ''}
        isActive={profileMenuIsOpen}
        isFirst={true}
        isLast={true}
        onClick={() => setProfileMenuIsOpen(!profileMenuIsOpen)}
      />
      <DropdownMenu
        ref={ulRef}
        isOpen={profileMenuIsOpen}
        cssClassess="top-full right-0"
      >
        <DropdownItem onClick={() => setProfileMenuIsOpen(false)}>
          Mi perfil
        </DropdownItem>
        <DropdownItem onClick={() => handleLogout()}>
          Cerrar sesión
        </DropdownItem>
      </DropdownMenu>
    </>
  )
}

export default ProfileMenu
