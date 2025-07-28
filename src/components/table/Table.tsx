import React, { type JSX } from 'react'
import { type Subject } from '../../types/types'
import ListOfRows from './table-row/ListOfRows'

interface TableProps {
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

const Table: React.FC<TableProps> = ({ tableTitle, subjects }) => {
  const countOfSubjectsByYear = subjects.length

  return (
    <div className="mb-4 w-full md:rounded-lg md:shadow-xl">
      <div className="relative h-full pt-8">
        <div className="pointer-events-none absolute top-0 right-0 h-full w-full pb-21">
          <h2 className="bg-theme-first-color md:text-theme-first-color sticky top-2 z-[150] rounded-tl-md rounded-tr-md py-0.5 text-center text-xl text-white md:invisible md:static md:mb-3 md:hidden md:w-full md:rounded-none md:bg-inherit md:text-2xl">
            {`(${countOfSubjectsByYear}) ${tableTitle}`}
          </h2>
        </div>
        <table
          className="custom-content relative mx-auto w-full border-separate border-spacing-0 rounded-lg md:overflow-hidden"
          style={
            {
              '--dynamic-content': `'${tableTitle}'`
            } as React.CSSProperties
          }
        >
          <thead className="bg-theme-first-color thead hidden w-full rounded-t-lg md:table-header-group">
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
            <ListOfRows subjects={subjects} />
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Table
