import React, { useEffect } from 'react'
import useCareerStore from '../store/careerStore'
import { useSubjectStore } from '../store/subjectStore'
import Table from './table/Table'

const CareerDetails: React.FC = () => {
  const { careerSelectedID, career } = useCareerStore()

  const { createAllSubjectStateDefault } = useSubjectStore()

  useEffect(() => {
    if (!career) return

    createAllSubjectStateDefault(careerSelectedID, career)
  }, [career])

  return (
    <>
      <article className="relative top-20 container w-full gap-8 px-6 pb-36 md:flex md:flex-col md:items-center lg:px-0">
        {career && career.subjectsByYear
          ? career.subjectsByYear.map((subjectForYear) => (
              <Table
                key={subjectForYear.year}
                tableTitle={subjectForYear.year}
                subjects={subjectForYear.subjects}
              />
            ))
          : null}
      </article>
    </>
  )
}

export default CareerDetails
