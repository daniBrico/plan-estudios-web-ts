import classNames from 'classnames'
import { type JSX, useState } from 'react'
import NavbarItem from './NavbarItem'
import { useAuthContext } from '../../../hooks/useAuthContext'

const ProfileMenu = (): JSX.Element => {
  const [profileMenuIsOpen, setProfileMenuIsOpen] = useState(false)

  const { user, logout } = useAuthContext()

  const handleLogout = (): void => logout()

  return (
    <>
      <NavbarItem
        label={user ? user.name : ''}
        isActive={profileMenuIsOpen}
        isFirst={true}
        isLast={true}
        onClick={() => setProfileMenuIsOpen(!profileMenuIsOpen)}
      />
      <ol
        className={classNames(
          'bg-carnation-400 absolute top-full right-0 mt-2 flex w-40 flex-col gap-2 rounded-md p-2 shadow-md transition-all duration-300 ease-in-out',
          {
            'translate-y-0 opacity-100': profileMenuIsOpen,
            'pointer-events-none -translate-y-1/3 opacity-0': !profileMenuIsOpen
          }
        )}
      >
        <li className="hover:bg-carnation-500 cursor-pointer rounded-md border py-1 pl-3 text-white shadow-md hover:underline">
          Mi Perfil
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
