import React, { type JSX } from 'react'
import { type SubjectsByYear, type Subject } from '../types/types'
import { TableRows } from './TableRow'
import { useCareerContext } from '../hooks/useCareerContext'

interface ListOfTablesProps {
  tableTitle: string
  subjects: Subject[]
}

const titles = [
  { key: 'code', value: 'Código', classes: 'rounded-tl-lg' },
  { key: 'subject', value: 'Materia', classes: 'text-left' },
  { key: 'offering', value: 'Dictado', classes: '' },
  { key: 'correlatives', value: 'Correlativas', classes: 'w-32' },
  { key: 'state', value: 'Estado', classes: 'rounded-tr-lg w-32' }
]

const renderTableHeads = (
  key: string,
  value: string,
  clasess: string,
  countOfSubjectsByYear: number
): JSX.Element => {
  return (
    <th
      key={key}
      className={`border-back border-b-2 text-base font-bold tracking-wide ${clasess} ${key === 'code' ? 'px-2 py-2 whitespace-nowrap' : 'p-2'}`}
    >
      {key === 'code' ? `(${countOfSubjectsByYear}) ${value}` : value}
    </th>
  )
}

const ListOfTables: React.FC<ListOfTablesProps> = ({
  tableTitle,
  subjects
}) => {
  const countOfSubjectsByYear = subjects.length

  return (
    <div className="w-full">
      <h2 className="bg-first-color md:text-first-color sticky top-2 z-[150] mt-4 rounded-tl-md rounded-tr-md py-0.5 text-center text-xl text-white md:invisible md:static md:mb-3 md:hidden md:w-full md:rounded-none md:bg-inherit md:text-2xl">
        {`(${countOfSubjectsByYear}) ${tableTitle}`}
      </h2>
      <table
        className="custom-content md:shadow-shadow-box relative mx-auto w-full rounded-lg"
        style={
          {
            '--dynamic-content': `'${tableTitle}'`
          } as React.CSSProperties
        }
      >
        <thead className="bg-first-color thead hidden w-full rounded-t-lg md:table-header-group">
          <tr className="rounded-t-lg text-white">
            {titles.map((title) =>
              renderTableHeads(
                title.key,
                title.value,
                title.classes,
                countOfSubjectsByYear
              )
            )}
          </tr>
        </thead>
        <tbody className="mt-2 grid w-full grid-cols-1 gap-1 text-black sm:grid-cols-2 md:table-row-group">
          <TableRows subjects={subjects} />
        </tbody>
      </table>
    </div>
  )
}

interface CareerDetailsProps {
  subjectsByYear: SubjectsByYear[]
}

export const CareerDetails: React.FC<CareerDetailsProps> = ({
  subjectsByYear
}) => {
  const {
    numSubjectsCursando,
    numSubjectsPassed,
    numSubjectsRegular,
    getTotalNumOfSubjects
  } = useCareerContext()

  return (
    <>
      <article className="relative m-auto w-full max-w-4xl gap-8 px-6 md:flex md:flex-col md:items-center lg:px-0">
        <h2 className="text-first-color mx-auto mt-2 text-center text-2xl font-semibold md:mb-4 md:text-3xl">
          Plan de Estudios
        </h2>
        {subjectsByYear.map((subjectForYear) => (
          <ListOfTables
            key={subjectForYear.year}
            tableTitle={subjectForYear.year}
            subjects={subjectForYear.subjects}
          />
        ))}
      </article>
      <article className="m-auto mt-4 max-w-md px-6">
        <h2 className="text-first-color mx-auto mt-2 text-center text-2xl font-semibold sm:mt-8 md:text-3xl">
          Información adicional
        </h2>
        <table className="md:shadow-shadow-box mx-auto mt-2 mb-8 w-full rounded-md sm:mt-4 md:mt-8">
          <tbody className="text-black">
            <tr className={`bg-third-color`}>
              <td className="rounded-tl-lg px-2 py-1 text-sm font-medium tracking-[0.01em] md:text-base">
                Total de Materias
              </td>
              <td className="rounded-tr-lg pr-1 text-center text-sm md:text-base">
                {getTotalNumOfSubjects()}
              </td>
            </tr>
            <tr className={`bg-third-color`}>
              <td className="px-2 py-1 text-sm font-medium tracking-[0.01em] md:text-base">
                Materias Aprobadas
              </td>
              <td className="pr-1 text-center text-sm md:text-base">
                {numSubjectsPassed}
              </td>
            </tr>
            <tr className={`bg-third-color`}>
              <td className="px-2 py-1 text-sm font-medium tracking-[0.01em] md:text-base">
                Materias Cursando
              </td>
              <td className="pr-1 text-center text-sm md:text-base">
                {numSubjectsCursando}
              </td>
            </tr>
            <tr className={`bg-third-color`}>
              <td className="rounded-bl-lg px-2 py-1 text-sm font-medium tracking-[0.01em] md:text-base">
                Materias Regularizadas
              </td>
              <td className="rounded-br-lg pr-1 text-center text-sm md:text-base">
                {numSubjectsRegular}
              </td>
            </tr>
          </tbody>
        </table>
      </article>
    </>
  )
}
