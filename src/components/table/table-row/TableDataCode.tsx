import useSubjectState from '../../../hooks/useSubjectState'
import { type SubjectCode } from '../../../types/types'

interface TableDataCodeProps {
  code: SubjectCode
  isDropdownOpen: boolean
}

const TableDataCode: React.FC<TableDataCodeProps> = ({
  code,
  isDropdownOpen
}) => {
  // customHooks
  const { getStyleForState } = useSubjectState(code)

  return (
    <td
      className={`text-sm transition md:p-2 md:text-center md:text-base ${getStyleForState()} ${isDropdownOpen ? `underline` : ''}`}
    >
      {code}
    </td>
  )
}

export default TableDataCode
