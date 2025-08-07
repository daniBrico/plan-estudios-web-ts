import classNames from 'classnames'
import useSubjectState from '../../../hooks/useSubjectState'
import { type SubjectCode } from '../../../types/types'

interface TableDataCodeProps {
  code: SubjectCode
  isDropdownOpen: boolean
  index: number
  subjectsLength: number
  isCorrModalOpen: boolean
}

const TableDataCode: React.FC<TableDataCodeProps> = ({
  code,
  isDropdownOpen,
  index,
  subjectsLength,
  isCorrModalOpen
}) => {
  const { getStyleForState } = useSubjectState(code)

  // Podría utilizar el componente Correlative
  return (
    <td
      className={classNames(
        'border-stone-900 text-sm md:p-2 md:text-center md:text-base',
        [getStyleForState()],
        {
          underline: isDropdownOpen,
          'rounded-bl-lg': index === subjectsLength - 1 && !isCorrModalOpen,
          'rounded-bl-none': isCorrModalOpen
        }
      )}
    >
      {code}
    </td>
  )
}

export default TableDataCode
