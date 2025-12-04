/* Career */
export interface Career {
  _id: ID
  name: string
  duration: number
  intermediateDegree: string
  intermediateDegreeDuration: number
  subjectsByYear: SubjectsByYear[]
}

export type CareerNamesAndID = Pick<Career, '_id' | 'name'>
export type CareerHeaderInfo = Omit<Career, '_id' | 'subjectsByYear'>
export type ID = string

/* Subject */
export interface SubjectsByYear {
  year: string
  subjects: Subject[]
}

export interface SubjectNameAndYear {
  subjectNameAndCode: SubjectNameAndCode
  year: string
}

export type Year = string
export interface SubjectNameAndCode {
  name: Name
  code: SubjectCode
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
  correlativeAndState: { correlative: SubjectCode; corrState: State }[]
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

/* User */
export interface User {
  _id?: string
  name: string
  lastName: string
  email: string
}

export interface UserRegisterInputs {
  name: string
  lastName: string
  email: string
  password: string
}

export interface UserLoginInputs {
  email: string
  password: string
}

export interface HttpClient {
  get<T>(url: string): Promise<T>
}

/* Theme */

type ThemeType = 'light' | 'dark' | 'system'

/* Responses */

interface GenericResponse {
  message: string
}

/* Auth Response */

export interface RegisterResponse extends GenericResponse {
  user: User
}

export interface LoginResponse extends GenericResponse {
  user: User
}

export interface VerifyTokenResponse extends GenericResponse {
  user: User
}
