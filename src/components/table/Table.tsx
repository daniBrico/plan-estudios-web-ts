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
      className={`text-base font-bold tracking-wide ${clasess} ${key === 'code' ? 'px-2 py-2 whitespace-nowrap' : 'p-2'}`}
    >
      {key === 'code' ? `(${countOfSubjectsByYear}) ${value}` : value}
    </th>
  )
}

const Table: React.FC<TableProps> = ({ tableTitle, subjects }) => {
  const countOfSubjectsByYear = subjects.length

  return (
    <div className="mb-4 w-full rounded-lg md:mb-0 md:shadow-xl md:dark:shadow-stone-950/30">
      <div className="relative h-full pt-8 md:pt-0">
        <div className="pointer-events-none absolute top-0 right-0 h-full w-full pb-21 md:invisible md:hidden">
          <h2 className="bg-primary md:text-primary sticky top-2 z-[150] rounded-tl-md rounded-tr-md py-0.5 text-center text-xl text-white md:invisible md:static md:mb-3 md:hidden md:w-full md:rounded-none md:bg-inherit md:text-2xl dark:bg-stone-900 dark:text-stone-300">
            {`(${countOfSubjectsByYear}) ${tableTitle}`}
          </h2>
        </div>
        <table
          className="text-primary relative mx-auto w-full border-separate border-spacing-0 before:invisible before:absolute before:top-1/2 before:left-1/2 before:z-50 before:hidden before:w-full before:-translate-x-1/2 before:-translate-y-1/2 before:-rotate-6 before:justify-center before:text-8xl before:font-bold before:opacity-30 before:content-[attr(data-before)] md:before:visible md:before:flex dark:text-stone-600"
          data-before={tableTitle}
        >
          <thead className="bg-primary thead hidden w-full rounded-t-lg md:table-header-group dark:bg-stone-900">
            <tr className="rounded-t-lg text-white dark:text-stone-300/95">
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
