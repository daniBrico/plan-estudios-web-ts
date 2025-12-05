import classNames from 'classnames'
import { type JSX, useRef, useState } from 'react'
import NavbarItem from './NavbarItem'
import { useAuthContext } from '../../../hooks/useAuthContext'
import useCloseOnClickOutside from '../../../hooks/useCloseOnClickOutside'
import useCloseOnScroll from '../../../hooks/useCloseOnScroll'

const ProfileMenu = (): JSX.Element => {
  const [profileMenuIsOpen, setProfileMenuIsOpen] = useState(false)

  const navBarItemRef = useRef(null)
  const olRef = useRef(null)

  const { user, logout } = useAuthContext()

  useCloseOnClickOutside({
    isOpen: profileMenuIsOpen,
    onClose: () => setProfileMenuIsOpen(false),
    ref: navBarItemRef,
    excludeRefs: [olRef]
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
      <ol
        ref={olRef}
        className={classNames(
          'bg-carnation-400 absolute top-full right-0 mt-2 flex w-40 flex-col gap-2 rounded-md p-2 shadow-md transition-all duration-300 ease-in-out',
          {
            'translate-y-0 opacity-100': profileMenuIsOpen,
            'pointer-events-none -translate-y-1/3 opacity-0': !profileMenuIsOpen
          }
        )}
      >
        <li>
          <button
            className="hover:bg-carnation-500 w-full cursor-pointer rounded-md border py-1 pl-3 text-left text-white shadow-md hover:underline"
            onClick={() => setProfileMenuIsOpen(false)}
          >
            Mi Perfil
          </button>
        </li>
        <li>
          <button
            className="hover:bg-carnation-500 w-full cursor-pointer rounded-md border py-1 pl-3 text-left text-white shadow-md hover:underline"
            onClick={handleLogout}
          >
            Cerrar Sesión
          </button>
        </li>
      </ol>
    </>
  )
}

export default ProfileMenu
