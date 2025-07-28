import { useEffect, useState, type JSX } from 'react'
import { type Career, type ID, type SubjectState } from '../types/types'
import { useSubjectStore } from '../store/subjectStore'
import { getFromLocalStorage } from '../utils/storage'
import useCareerStore from '../store/careerStore'

interface allSubjectsStateInfoType {
  numSubjectsPassed: number
  numSubjectsCursando: number
  numSubjectsRegular: number
  totalNumOfSubjects: number
}

export const StatsPage = (): JSX.Element => {
  // context
  // subjectStore
  const allSubjectsState = useSubjectStore((state) => state.allSubjectsState)
  const getAllSubjectsStateInfo = useSubjectStore(
    (state) => state.getAllSubjectsStateInfo
  )
  const createAllSubjectStateDefault = useSubjectStore(
    (state) => state.createAllSubjectStateDefault
  )
  // careerStore
  const setCareerSelectedID = useCareerStore(
    (state) => state.setCareerSelectedID
  )

  // useState
  const [enrolledSubjects, setEnrolledSubjects] = useState<SubjectState[]>([])
  const [allSubjectsStateInfo, setAllSubjectsStateInfo] =
    useState<allSubjectsStateInfoType>(getAllSubjectsStateInfo())

  // useEffect
  useEffect(() => {
    if (allSubjectsState.length === 0) return

    setEnrolledSubjects(
      allSubjectsState.filter((subject) => subject.state === 'Cursando')
    )

    setAllSubjectsStateInfo(getAllSubjectsStateInfo)
  }, [allSubjectsState])

  useEffect(() => {
    const careerIDFromLS: ID | null = getFromLocalStorage('career-selected-id')
    const career: Career | null = getFromLocalStorage('career')

    if (careerIDFromLS === null) {
      setEnrolledSubjects([])
      setAllSubjectsStateInfo({
        numSubjectsPassed: 0,
        numSubjectsCursando: 0,
        numSubjectsRegular: 0,
        totalNumOfSubjects: 0
      })

      return
    }

    setCareerSelectedID(careerIDFromLS)
    createAllSubjectStateDefault(careerIDFromLS, career)
  }, [])

  const {
    numSubjectsPassed,
    numSubjectsCursando,
    numSubjectsRegular,
    totalNumOfSubjects
  } = allSubjectsStateInfo

  return (
    <section className="container p-4 lg:p-1">
      <h2 className="text-theme-first-color mb-4 text-lg font-semibold tracking-wide md:text-2xl lg:text-3xl">
        Cursando
      </h2>
      <div className="flex flex-col gap-2 rounded-md shadow-md">
        {enrolledSubjects.length ? (
          enrolledSubjects.map((subject) => (
            <div
              key={subject.code}
              className="bg-theme-third-color text-theme-second-text-color flex rounded-md p-2"
            >
              <p className="w-14">{subject.code}</p>
              <p>-</p>
              <p className="ml-2">{subject.name.longName}</p>
            </div>
          ))
        ) : (
          <div className="bg-theme-third-color text-theme-second-text-color flex rounded-md p-2">
            <p className="opacity-60">No hay materias cursando actualmente</p>
          </div>
        )}
      </div>

      {/* {enrolledSubjects.length ? <p>Al aprobar</p> : ''} */}

      <article className="m-auto mt-4 max-w-md px-6">
        <h2 className="text-theme-first-color mt-2 text-center text-2xl font-semibold sm:mt-8 md:mt-0 md:text-3xl">
          Información adicional
        </h2>
        <table className="bg-theme-third-color mx-auto mt-2 mb-8 w-full border-separate border-spacing-0 overflow-hidden rounded-md shadow-md sm:mt-4 md:mt-8">
          <tbody className="text-theme-second-text-color">
            <tr className={`bg-theme-third-color`}>
              <td className="rounded-tl-lg px-2 py-1 text-sm font-medium tracking-[0.01em] md:text-base">
                Total de Materias
              </td>
              <td className="rounded-tr-lg pr-1 text-center text-sm md:text-base">
                {totalNumOfSubjects}
              </td>
            </tr>
            <tr className={`bg-theme-third-color`}>
              <td className="px-2 py-1 text-sm font-medium tracking-[0.01em] md:text-base">
                Materias Aprobadas
              </td>
              <td className="pr-1 text-center text-sm md:text-base">
                {numSubjectsPassed}
              </td>
            </tr>
            <tr className={`bg-theme-third-color`}>
              <td className="px-2 py-1 text-sm font-medium tracking-[0.01em] md:text-base">
                Materias Cursando
              </td>
              <td className="pr-1 text-center text-sm md:text-base">
                {numSubjectsCursando}
              </td>
            </tr>
            <tr className={`bg-theme-third-color`}>
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
    </section>
  )
}
