import {
  type Year,
  type Correlatives,
  type SubjectNameAndCode
} from '../types/types'
import useCareerStore from '../store/careerStore'
import classNames from 'classnames'
import { useMemo } from 'react'
import Correlative from './correlative/Correlative'

interface CorrelativeModalProps {
  correlatives: Correlatives
  cssClasses: string
  isOpen: boolean
}

export const CorrelativeModal: React.FC<CorrelativeModalProps> = ({
  correlatives,
  cssClasses,
  isOpen
}) => {
  const getSubjectNameAndYearFromCode = useCareerStore(
    (state) => state.getSubjectNameAndYearFromCode
  )
  const memoizedSubjectsNameAndYear = useMemo(() => {
    return getSubjectNameAndYearFromCode(correlatives)
  }, [correlatives, getSubjectNameAndYearFromCode])

  const groupedSubjectsByYear = useMemo(() => {
    const grouped: { year: Year; subjectNameAndCode: SubjectNameAndCode[] }[] =
      []

    memoizedSubjectsNameAndYear.forEach((el) => {
      const subjectNameAndYearFoundIx = grouped.findIndex(
        (indexEl) => indexEl.year === el.year
      )

      if (subjectNameAndYearFoundIx === -1) {
        grouped.push({
          year: el.year,
          subjectNameAndCode: [el.subjectNameAndCode]
        })
      } else {
        grouped[subjectNameAndYearFoundIx].subjectNameAndCode.push(
          el.subjectNameAndCode
        )
      }
    })

    return grouped
  }, [memoizedSubjectsNameAndYear])

  return (
    <div
      className={classNames(
        'absolute top-full left-0 z-400 flex w-full items-center rounded-br-md rounded-bl-md bg-linear-to-b py-1 opacity-0 shadow-xl transition-all duration-300 ease-in-out dark:to-stone-900 dark:shadow-xl',
        cssClasses,
        {
          'translate-y-0 opacity-100': isOpen,
          'pointer-events-none -translate-y-2': !isOpen
        }
      )}
    >
      <div className="scrollbar-styles flex max-h-52 w-full flex-col gap-8 overflow-x-hidden overflow-y-auto pt-6 pb-1">
        {groupedSubjectsByYear.map((el) => {
          return (
            <div key={el.year} className="relative flex flex-col gap-2">
              <p className="absolute -top-6 left-0 ml-2 text-xs font-light md:text-sm">
                {el.year}
              </p>
              {el.subjectNameAndCode.map((subject, index) => {
                return (
                  <div
                    key={el.subjectNameAndCode[index].code}
                    className="flex items-center pl-4"
                  >
                    <Correlative
                      correlative={subject.code}
                      tooltip={false}
                      cssClasess="w-12 lg:text-base text-sm md:text-md md:w-14"
                    />
                    <span className="md:text-md ml-0.5 text-sm md:ml-2 lg:text-base">
                      {subject.name.longName}
                    </span>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
