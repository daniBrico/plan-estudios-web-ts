import classNames from 'classnames'
import useSubjectState from '../../../hooks/useSubjectState'
import { type Name, type SubjectCode } from '../../../types/types'

interface TableDataNameProps {
  code: SubjectCode
  name: Name
  isDropdownOpen: boolean
}

const TableDataName: React.FC<TableDataNameProps> = ({
  code,
  name,
  isDropdownOpen
}) => {
  const { getStyleForState } = useSubjectState(code)

  return (
    <td
      className={classNames(
        'order-first col-span-2 border-stone-900 text-sm font-medium text-wrap transition md:p-2 md:text-base md:font-normal',
        {
          [getStyleForState() + ' underline']: isDropdownOpen
        }
      )}
    >
      <p className="invisible hidden md:visible md:inline">{name.longName}</p>
      <p className="md:invisible md:hidden">
        {name.shortName || name.longName}
      </p>
    </td>
  )
}

export default TableDataName
