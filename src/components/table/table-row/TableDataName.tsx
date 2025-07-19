import { useEffect, useState } from 'react'
import useDropdownButtonStore from '../../store/dropdownButtonStore'
import {
  type Name,
  type Correlatives,
  type SubjectCode
} from '../../types/types'
import useSubjectState from '../../hooks/useSubjectState'

interface TableDataNameProps {
  code: SubjectCode
  name: Name
  correlatives: Correlatives
}

const TableDataName: React.FC<TableDataNameProps> = ({
  code,
  name,
  correlatives
}) => {
  // useState
  const [cssForState, setCssForState] = useState('')

  // customHooks
  const { setClassForState, subjectState } = useSubjectState({
    code,
    correlatives
  })

  // useContext
  const { isDropdownOpen } = useDropdownButtonStore()

  // useEffect
  useEffect(() => {
    // if (subjectState === undefined) return

    setCssForState(setClassForState(subjectState))
  }, [subjectState])

  return (
    <td
      className={`order-first col-span-2 text-sm font-medium text-wrap transition md:p-2 md:text-base md:font-normal ${isDropdownOpen ? `${cssForState} underline` : ''}`}
    >
      <p className="invisible hidden md:visible md:inline">{name.longName}</p>
      <p className="md:invisible md:hidden">
        {name.shortName || name.longName}
      </p>
    </td>
  )
}

export default TableDataName
