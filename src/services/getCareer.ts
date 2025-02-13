import planEstudios from '../models/local/plan-de-estudios.json'
import { type Career, type CareerResponseFromApi } from '../types/types'

const mapFromApiToCareer = (apiResponse: CareerResponseFromApi): Career => {
  const {
    id,
    nombre: careerName,
    duracion: careerDuration,
    tituloIntermedio: subCareerName,
    duracionTituloIntermedio: subCareerDuration,
  } = apiResponse

  const listOfSubjectsForYear = apiResponse.listaMateriasAnio.map(
    (subjectsForYear) => ({
      year: subjectsForYear.anio,
      subjects: subjectsForYear.materias.map((subject) => ({
        name: subject.nombre,
        code: subject.codigo,
        dictado: subject.dictado,
        correlatives: subject.correlativas,
        state: subject.estado,
      })),
    })
  )

  return {
    id,
    careerName,
    careerDuration,
    subCareerName,
    subCareerDuration,
    listOfSubjectsForYear,
  }
}

export const getCareer = function (): Career {
  return mapFromApiToCareer(planEstudios)
}
