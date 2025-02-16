import React from 'react'
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
  return (
    <>
      <h2 className="bg-first-color md:text-first-color sticky top-2 z-20 mt-4 mb-2 rounded-tl-md rounded-tr-md py-1 text-center text-xl text-white md:static md:rounded-none md:bg-white md:text-2xl">
        {tableTitle}
      </h2>
      <table className="md:shadow-shadow-box mx-auto mb-5 w-full rounded-t-lg rounded-tl-lg rounded-b-lg">
        <thead className="bg-first-color top-2 z-20 hidden rounded-t-lg md:sticky md:table-header-group">
          <tr className="rounded-t-lg text-white">
            <th className="border-back rounded-tl-lg border-b-2 p-2 text-base font-bold tracking-wide">
              Código
            </th>
            <th className="border-back border-b-2 p-2 text-left text-base font-bold tracking-wide">
              Materia
            </th>
            <th className="border-back border-b-2 p-2 text-base font-bold tracking-wide">
              Dictado
            </th>
            <th className="border-back w-32 border-b-2 p-2 text-base font-bold tracking-wide">
              Correlativas
            </th>
            <th className="border-back w-32 rounded-tr-lg border-b-2 p-2 text-base font-bold tracking-wide">
              Estado
            </th>
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
      <h2 className="text-first-color mx-auto mt-2 text-center text-2xl font-semibold md:text-3xl">
        Plan de Estudios
      </h2>
      <article className="m-auto max-w-4xl px-4 lg:flex lg:flex-col lg:items-center lg:px-0">
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
