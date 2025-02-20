import { type State } from './enums'

export interface Career {
  _id: string
  name: string
  duration: number
  intermediateDegree: string
  intermediateDegreeDuration: number
  subjectsByYear: SubjectsByYear[]
}

export type CareerNames = Pick<Career, '_id' | 'name'>

export interface SubjectsByYear {
  year: string
  subjects: Subject[]
}

export interface Subject {
  name: string
  code: string
  offering: string
  correlatives: string[]
  state: State | null
}

export type CareerHeaderInfo = Omit<Career, '_id' | 'subjectsByYear'>

type useGetCareerType = {
  career: Career | null
  careerLoading: boolean
  careerError: Error | null
}

export interface SubjectState {
  code: string
  state: string
}

export type Correlatives = Subject['correlatives']
