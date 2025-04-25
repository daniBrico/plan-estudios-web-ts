import { type JSX } from 'react'

export const StatsPage = (): JSX.Element => {
  return (
    <section className="mx-auto max-w-4xl p-4">
      <h2 className="text-first-color text-center text-lg font-semibold tracking-wide md:text-2xl lg:text-3xl">
        Cursando
      </h2>
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
    </section>
  )
}
