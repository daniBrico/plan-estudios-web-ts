import React, { JSX } from 'react'
import { type SubjectsByYear, type Subject } from '../types/types'
import { TableRows } from './TableRow'

interface ListOfTablesProps {
  tableTitle: string
  subjects: Subject[]
}

const ListOfTables: React.FC<ListOfTablesProps> = ({
  tableTitle,
  subjects
}) => {
  const titles = [
    { label: 'code', value: 'Código', classes: 'rounded-tl-lg' },
    { label: 'subject', value: 'Materia', classes: 'text-left' },
    { label: 'offering', value: 'Dictado', classes: '' },
    { label: 'correlatives', value: 'Correlativas', classes: 'w-32' },
    { label: 'state', value: 'Estado', classes: 'rounded-tr-lg w-32' }
  ]

  const renderTableHeads = (
    label: string,
    value: string,
    clasess: string
  ): JSX.Element => {
    return (
      <th
        key={label}
        className={`border-back border-b-2 p-2 text-base font-bold tracking-wide ${clasess}`}
      >
        {value}
      </th>
    )
  }

  return (
    <>
      <h2 className="bg-first-color md:text-first-color sticky top-2 z-20 mt-4 mb-2 rounded-tl-md rounded-tr-md py-1 text-center text-xl text-white md:static md:rounded-none md:bg-inherit md:text-2xl">
        {tableTitle}
      </h2>
      <table className="md:shadow-shadow-box mx-auto mb-5 w-full rounded-t-lg rounded-tl-lg rounded-b-lg">
        <thead className="bg-first-color top-2 z-20 hidden rounded-t-lg md:sticky md:table-header-group">
          <tr className="rounded-t-lg text-white">
            {titles.map((title) =>
              renderTableHeads(title.label, title.value, title.classes)
            )}
          </tr>
        </thead>
        <tbody className="grid grid-cols-1 gap-1 text-black sm:grid-cols-2 md:table-row-group">
          <TableRows subjects={subjects} />
        </tbody>
      </table>
    </>
  )
}

interface CareerDetailsProps {
  subjectsByYear: SubjectsByYear[]
}

export const CareerDetails: React.FC<CareerDetailsProps> = ({
  subjectsByYear
}) => {
  return (
    <>
      <article className="m-auto max-w-4xl px-4 lg:flex lg:flex-col lg:items-center lg:px-0">
        <h2 className="text-first-color mx-auto mt-2 text-center text-2xl font-semibold md:text-3xl">
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
    </>
  )
}
