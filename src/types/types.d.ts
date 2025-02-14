export interface Career {
  id: number
  careerName: string
  careerDuration: number
  subCareerName: string
  subCareerDuration: number
  listOfSubjectsForYear: ListOfSubjectsForYear[]
}

export interface ListOfSubjectsForYear {
  year: string
  subjects: Subjects[]
}

enum State {
  Aprobada = 'Aprobada',
  Cursando = 'Cursando',
  Recursar = 'Recursar',
  Regular = 'Regular'
}

export interface Subjects {
  name: string
  code: string
  dictado: string
  correlatives: string[]
  state: State | null
}

export interface CareerResponseFromApi {
  id: number
  nombre: string
  duracion: number
  tituloIntermedio: string
  duracionTituloIntermedio: number
  listaMateriasAnio: Array<{
    anio: string
    materias: Array<{
      nombre: string
      codigo: string
      dictado: string
      correlativas: string[]
      estado: State | null
    }>
  }>
}

export type CareerInfoHeader = Omit<Career, 'id' | 'listOfSubjectsForYear'>
