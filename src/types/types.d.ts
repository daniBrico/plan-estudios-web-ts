/* Career */
export interface Career {
  id: ID
  name: string
  duration: number
  intermediateDegree: string
  intermediateDegreeDuration: number
  subjectsByYear: SubjectsByYear[]
}

export type CareerNamesAndID = Pick<Career, 'id' | 'name'>
export type CareerHeaderInfo = Omit<Career, 'id' | 'subjectsByYear'>
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
  id: ID
}

export type SubjectCode = string
export interface Correlative {
  id: string
  code: SubjectCode
}
export type Correlatives = Correlative[]
export type Name = {
  longName: string
  shortName: string
}

export interface Subject {
  id: ID
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
  correlativeAndState: { correlative: Correlative; corrState: State }[]
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
  id?: string
  name: string
  lastName: string
  email: string
}

export interface HttpClient {
  get<T>(url: string): Promise<T>
}

/* Theme */

type ThemeType = 'light' | 'dark' | 'system'

/* Responses */

interface GenericResponse {
  message: string
  status: number
}

/* Auth Response */

export interface RegisterResponse extends GenericResponse {
  email: string
  code: string
  emailSent?: boolean
}

export interface LoginResponse extends GenericResponse {
  user?: User
  emailSent?: boolean
  code: string
}

export interface VerifyTokenResponse extends GenericResponse {
  user?: User
}

export interface VerifyEmailResponse extends GenericResponse {
  success: boolean
}
