import { type State } from './enums'

export interface Career {
  _id: number
  name: string
  duration: number
  intermediateDegree: string
  intermediateDegreeDuration: number
  subjectsByYear: SubjectsByYear[]
}

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
