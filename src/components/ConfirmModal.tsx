import classNames from 'classnames'
import CheckSvg from './svg-components/CheckSvg'
import XmarkSvg from './svg-components/XmarkSvg'
import useCloseOnScrollOrClickOutside from '../hooks/useCloseOnScrollOrClickOutside'
import { useRef } from 'react'

interface ConfirmModalProps {
  isModalConfirmOpened: boolean
  handleModalConfirm: (value: 'confirm' | 'cancel') => void
  setIsModalConfirmOpened: React.Dispatch<React.SetStateAction<boolean>>
  cancelCareerRef: React.RefObject<HTMLDivElement | null>
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isModalConfirmOpened,
  handleModalConfirm,
  setIsModalConfirmOpened,
  cancelCareerRef
}) => {
  const modalConfirmRef = useRef<HTMLDivElement>(null)

  const handleOnClose = (currentTarget: Node): void => {
    const isClickInsideCancel =
      currentTarget && cancelCareerRef.current?.contains(currentTarget)

    if (isClickInsideCancel) return

    setIsModalConfirmOpened(false)
  }

  useCloseOnScrollOrClickOutside({
    isOpen: isModalConfirmOpened,
    onClose: (currentTarget) => handleOnClose(currentTarget as Node),
    ref: modalConfirmRef
  })

  return (
    <div className="flex justify-center" ref={modalConfirmRef}>
      <div
        className={classNames(
          'absolute z-200 mx-auto flex flex-col items-center gap-1 rounded-sm border border-gray-800/40 bg-gray-50 p-2 text-center text-pretty text-gray-800 opacity-0 transition-all duration-300 ease-in-out dark:border-gray-400/40 dark:bg-stone-800 dark:text-gray-300',
          {
            'translate-y-2 opacity-100': isModalConfirmOpened,
            'pointer-events-none': !isModalConfirmOpened
          }
        )}
      >
        <span className="flex items-center gap-1">
          Los cambios realizados se perderán
        </span>
        <div className="flex items-center justify-center gap-2 stroke-2">
          <span>¿Deseas continuar?</span>
          <button
            onClick={() => handleModalConfirm('confirm')}
            className="w-8 cursor-pointer rounded-full bg-green-600/20 stroke-green-600/90 transition-transform duration-300 ease-in-out hover:scale-110"
          >
            <CheckSvg />
          </button>
          <button
            onClick={() => handleModalConfirm('cancel')}
            className="w-8 cursor-pointer rounded-full bg-red-600/20 stroke-red-600/90 transition-transform duration-300 ease-in-out hover:scale-110"
          >
            <XmarkSvg />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
