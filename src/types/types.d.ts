// Career
export interface Career {
  _id: ID
  name: string
  duration: number
  intermediateDegree: string
  intermediateDegreeDuration: number
  subjectsByYear: SubjectsByYear[]
}

export type CareerNames = Pick<Career, '_id' | 'name'>
export type CareerHeaderInfo = Omit<Career, '_id' | 'subjectsByYear'>
export type ID = string

// Subject
export interface SubjectsByYear {
  year: string
  subjects: Subject[]
}

export type Code = string
export type Correlatives = string[]

export interface Subject {
  name: string
  code: Code
  offering: string
  correlatives: Correlatives
  state: State | null
}

export interface SubjectState {
  code: Code
  state: State
}

export type Correlatives = Subject['correlatives']

export type State =
  | 'Aprobada'
  | 'Cursando'
  | 'Regular'
  | 'Recursar'
  | 'Habilitada'
  | 'Deshabilitada'

export type DropdownOp = 'Aprobada' | 'Cursando' | 'Regular' | 'Recursar' | ''
