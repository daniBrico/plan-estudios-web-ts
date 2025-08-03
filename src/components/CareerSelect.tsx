import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import SearchIconSvg from './svg-components/SearchIconSvg'
import useGetCareerNames from '../hooks/useGetCareerNames'
import XmarkSvg from './svg-components/XmarkSvg'
import ArrowDownSvg from './svg-components/ArrowDownSvg'
import { type ID, type CareerNamesAndID } from '../types/types'
import { getFromLocalStorage } from '../utils/storage'
import useCloseOnScrollOrClickOutside from '../hooks/useCloseOnScrollOrClickOutside'
import ConfirmModal from './ConfirmModal'

interface SelectCareersProps {
  onCareerChange: (careerAndID: CareerNamesAndID | null) => void
}

const SelectCareers: React.FC<SelectCareersProps> = ({ onCareerChange }) => {
  const [selectedCareerAndID, setSelectedCareerAndID] =
    useState<CareerNamesAndID | null>(null)
  const [isSelectorOpened, setIsSelectorOpened] = useState<boolean>(false)
  const [isModalConfirmOpened, setIsModalConfirmOpened] =
    useState<boolean>(false)
  const [inputValue, setInputValue] = useState('')

  const selectorRef = useRef<HTMLDivElement>(null)

  const { careerNamesAndIDFromAPI } = useGetCareerNames()

  useCloseOnScrollOrClickOutside({
    isOpen: isSelectorOpened,
    onClose: () => setIsSelectorOpened(false),
    ref: selectorRef
  })

  const handleOptionSelected = (careerNameAndID: CareerNamesAndID): void => {
    if (careerNameAndID._id === selectedCareerAndID?._id) return

    setSelectedCareerAndID(careerNameAndID)
    setInputValue('')
    onCareerChange(careerNameAndID)
  }

  const handleCancelDropdown = (): void => {
    if (selectedCareerAndID === null) return

    setIsModalConfirmOpened(true)
  }

  const handleCancelClick = (e: React.MouseEvent): void => {
    e.stopPropagation()

    setIsSelectorOpened(false)

    handleCancelDropdown()
  }

  const handleModalConfirm = (value: 'confirm' | 'cancel'): void => {
    setIsModalConfirmOpened(false)

    if (value === 'cancel') return

    setSelectedCareerAndID(null)
    setIsSelectorOpened(false)
    onCareerChange(null)
  }

  useEffect(() => {
    const opFromLocalStorage: ID | null =
      getFromLocalStorage('career-selected-id')

    if (opFromLocalStorage === null) return

    if (careerNamesAndIDFromAPI.length === 0) return

    const selectedOption = careerNamesAndIDFromAPI.find(
      (option) => option._id === opFromLocalStorage
    )

    if (selectedOption === undefined) return

    setSelectedCareerAndID(selectedOption)
    handleOptionSelected(selectedOption)
  }, [careerNamesAndIDFromAPI])

  return (
    <div className="relative w-full font-medium select-none" ref={selectorRef}>
      {/* Select Careers */}
      <div
        className="flex w-full items-center justify-between rounded-sm border border-gray-800/40 bg-white p-2 dark:border-gray-400/40 dark:bg-stone-900"
        onClick={() => setIsSelectorOpened(!isSelectorOpened)}
      >
        <span
          className={classNames(
            'w-full rounded-tl-sm rounded-bl-sm bg-gray-300/20 px-1.5 py-0.5 font-normal text-gray-800 dark:bg-stone-800/80 dark:text-gray-300',
            {
              'text-gray-800/70 dark:text-gray-500/80': !selectedCareerAndID
            }
          )}
        >
          {selectedCareerAndID?.name ?? 'Seleccione la Carrera'}
        </span>
        <div className="flex items-center justify-center gap-1 rounded-tr-sm rounded-br-sm bg-gray-300/20 stroke-gray-800/40 stroke-2 px-1.5 py-0.5 dark:bg-stone-800/90 dark:stroke-gray-500/80">
          <div
            className="w-6 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-115"
            onClick={(e) => handleCancelClick(e)}
          >
            <XmarkSvg />
          </div>
          <span className="font-thin text-gray-800/40 dark:text-gray-500/80">
            |
          </span>
          <div
            className={classNames(
              'w-6 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-115',
              {
                'rotate-180': isSelectorOpened
              }
            )}
          >
            <ArrowDownSvg />
          </div>
        </div>
      </div>
      {/* Modal Confirm */}
      <ConfirmModal
        isModalConfirmOpened={isModalConfirmOpened}
        handleModalConfirm={handleModalConfirm}
        setIsModalConfirmOpened={setIsModalConfirmOpened}
      />
      {/* Select Careers Options */}
      <ul
        className={classNames(
          'absolute z-500 max-h-60 w-full overflow-y-auto rounded-sm border border-gray-800/40 bg-white opacity-0 transition-all duration-300 ease-in-out dark:border-gray-400/40 dark:bg-stone-900',
          {
            'translate-y-2 opacity-100': isSelectorOpened,
            'pointer-events-none': !isSelectorOpened
          }
        )}
      >
        <div className="sticky top-0 flex items-center bg-white px-2 dark:bg-stone-900">
          <div className="w-5 stroke-gray-800/40 stroke-2 dark:stroke-gray-500/80">
            <SearchIconSvg />
          </div>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
            placeholder="Ingrese el nombre de la carrera"
            className="w-full p-2 outline-none placeholder:text-gray-800/60 dark:text-gray-300 dark:placeholder:text-gray-500/80"
          />
        </div>
        {careerNamesAndIDFromAPI.map((careerNameAndID) => (
          <li
            key={careerNameAndID._id}
            className={classNames(
              'cursor-pointer p-2 text-sm text-gray-800 hover:bg-sky-600 hover:text-white dark:text-gray-300 dark:hover:bg-stone-800/40',
              {
                'bg-sky-600 text-white dark:bg-stone-800/40 dark:text-gray-300':
                  careerNameAndID.name === selectedCareerAndID?.name,
                hidden: !careerNameAndID.name
                  .toLocaleLowerCase()
                  .startsWith(inputValue)
              }
            )}
            onClick={() => handleOptionSelected(careerNameAndID)}
          >
            {careerNameAndID.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SelectCareers
