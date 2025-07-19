import { type State, type SubjectCode } from '../../../types/types'
import { useSubjectStore } from '../../../store/subjectStore'

interface TableDataCodeProps {
  code: SubjectCode
}

const TableDataCode: React.FC<TableDataCodeProps> = ({ code }) => {
  // subjectStore
  const subjectState = useSubjectStore(
    (state) =>
      state.allSubjectsState.find((subject) => subject.code === code)?.state
  )

  // functions
  const setClassForState = (subjectState: State | undefined): string => {
    if (!subjectState) return ''

    const stateClassMap: Record<State | '', string> = {
      Aprobada: 'text-theme-green',
      Habilitada: 'text-theme-blue',
      Cursando: 'text-theme-blue',
      Deshabilitada: 'text-theme-first-color',
      Recursar: 'text-theme-blue',
      Regular: 'text-theme-yellow',
      '': ''
    }

    return stateClassMap[subjectState] || ''
  }

  return (
    <td
      className={`$ text-sm transition md:p-2 md:text-center md:text-base ${setClassForState(subjectState)}`}
    >
      {code}
    </td>
  )
}

export default TableDataCode
