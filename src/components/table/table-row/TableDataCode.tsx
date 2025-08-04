import useSubjectState from '../../../hooks/useSubjectState'
import { type SubjectCode } from '../../../types/types'

interface TableDataCodeProps {
  code: SubjectCode
  isDropdownOpen: boolean
  index: number
  subjectsLength: number
}

const TableDataCode: React.FC<TableDataCodeProps> = ({
  code,
  isDropdownOpen,
  index,
  subjectsLength
}) => {
  // customHooks
  const { getStyleForState } = useSubjectState(code)

  // const subjectState = useSubjectStore((state) => {
  //   const currentSubjectState = state.allSubjectsState.find(
  //     (subject) => subject.code === code
  //   )

  //   if (currentSubjectState)
  //     return currentSubjectState.correlativeAndState.every(
  //       (el) => el.corrState === 'Aprobada' || el.corrState === 'Regular'
  //     )
  // })

  // useEffect(() => {
  //   if (!subjectState) return

  //   if (code === '07031')
  //     console.log('🚀 ~ TableDataCode ~ subjectState: ', subjectState)
  // }, [subjectState])

  return (
    <td
      className={`text-sm transition md:p-2 md:text-center md:text-base ${getStyleForState()} ${isDropdownOpen ? `underline` : ''} ${index === subjectsLength - 1 ? 'rounded-bl-lg' : ''}`}
    >
      {code}
    </td>
  )
}

export default TableDataCode
