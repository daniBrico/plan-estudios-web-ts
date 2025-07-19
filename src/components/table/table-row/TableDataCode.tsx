import useSubjectState from '../../../hooks/useSubjectState'
import { type SubjectCode } from '../../../types/types'

interface TableDataCodeProps {
  code: SubjectCode
}

const TableDataCode: React.FC<TableDataCodeProps> = ({ code }) => {
  // customHooks
  const { getStyleForState } = useSubjectState(code)

  return (
    <td
      className={`$ text-sm transition md:p-2 md:text-center md:text-base ${getStyleForState()}`}
    >
      {code}
    </td>
  )
}

export default TableDataCode
