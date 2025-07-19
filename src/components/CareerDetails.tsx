import { useEffect } from 'react'
import useCareerStore from '../store/careerStore'
import { useSubjectStore } from '../store/subjectStore'
import Table from './table/Table'

const CareerDetails: React.FC = () => {
  // context
  // careerStore
  const career = useCareerStore((state) => state.career)
  const careerSelectedID = useCareerStore((state) => state.careerSelectedID)
  // subjectStore
  const createAllSubjectStateDefault = useSubjectStore(
    (state) => state.createAllSubjectStateDefault
  )

  // useEffect
  useEffect(() => {
    if (!career) return

    createAllSubjectStateDefault(careerSelectedID, career)
  }, [career])

  return (
    <>
      <article className="container w-full gap-8 px-6 pb-36 md:flex md:flex-col md:items-center lg:px-0">
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
