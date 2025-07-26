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

export type SubjectCode = string
export type Correlatives = string[]
export type Name = {
  longName: string
  shortName: string
}

export interface Subject {
  name: Name
  code: SubjectCode
  offering: string
  correlatives: Correlatives
  state: State | null
}

export interface SubjectState {
  code: SubjectCode
  name: Name
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

// Services

export interface HttpClient {
  get<T>(url: string): Promise<T>
}

// Theme

type ThemeType = 'light' | 'dark' | 'system'
