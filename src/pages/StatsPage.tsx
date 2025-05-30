import { useEffect, useState, type JSX } from 'react'
import { useCareerContext } from '../hooks/useCareerContext'
import { type SubjectState } from '../types/types'

export const StatsPage = (): JSX.Element => {
  const [enrolledSubjects, setEnrolledSubjects] = useState<SubjectState[]>([])
  const {
    getTotalNumOfSubjects,
    numSubjectsPassed,
    numSubjectsRegular,
    numSubjectsCursando,
    allSubjectsState
  } = useCareerContext()

  useEffect(() => {
    if (!allSubjectsState.length) return

    setEnrolledSubjects(
      allSubjectsState.filter((subject) => subject.state === 'Cursando')
    )
  }, [allSubjectsState])

  return (
    <section className="container p-4 md:p-1">
      <h2 className="text-theme-first-color mb-4 text-lg font-semibold tracking-wide md:text-2xl lg:text-3xl">
        Cursando
      </h2>
      <div className="flex flex-col gap-2">
        {enrolledSubjects.length ? (
          enrolledSubjects.map((subject) => (
            <div
              key={subject.code}
              className="bg-theme-third-color text-theme-text-color flex gap-4 rounded-md p-2"
            >
              <p className="w-14">{subject.code}</p>
              <p>-</p>
              <p>{subject.name.longName}</p>
            </div>
          ))
        ) : (
          <p className="opacity-60">No hay materias cursando actualmente</p>
        )}
      </div>

      {/* {enrolledSubjects.length ? <p>Al aprobar</p> : ''} */}

      <article className="m-auto mt-4 max-w-md px-6">
        <h2 className="text-theme-first-color mt-2 text-center text-2xl font-semibold sm:mt-8 md:mt-0 md:text-3xl">
          Información adicional
        </h2>
        <table className="mx-auto mt-2 mb-8 w-full rounded-md sm:mt-4 md:mt-8">
          <tbody className="text-theme-text-color">
            <tr className={`bg-theme-third-color`}>
              <td className="rounded-tl-lg px-2 py-1 text-sm font-medium tracking-[0.01em] md:text-base">
                Total de Materias
              </td>
              <td className="rounded-tr-lg pr-1 text-center text-sm md:text-base">
                {getTotalNumOfSubjects()}
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
