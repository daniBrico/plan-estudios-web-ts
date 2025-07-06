// SubjectStateContext.tsx - Contexto específico para estados
import React, { useState, useMemo } from 'react'
import {
  type SubjectCode,
  type State,
  type SubjectState,
  type Name
} from '../types/types'
import { SubjectStateContext } from '../hooks/useSubjectContext'
// import { getFromLocalStorage } from '../utils/storage'
// import useCareerStore from '../store/careerStore'

export const SubjectStateProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  // useState
  const [allSubjectsState, setAllSubjectsState] = useState<SubjectState[]>([])

  // useContext

  // useCallback
  const getSubjectState = (code: SubjectCode): State | undefined => {
    return allSubjectsState.find((subject) => subject.code === code)?.state
  }

  /*
    Función callback que no devuelve nada. Primero recorre el contenido de allSubjectsSTate, al elemento previo, que es un
    arreglo de tipo SubjectState, si coincide con una materia, retorna un objeto con todo el contenido de subject y
    le agrega el state nuevo.
    Cada vez que cambia el valor de suscribers, la función se vuelve a definir.
  */
  const changeSubjectState = (code: SubjectCode, state: State): void => {
    setAllSubjectsState((prev) => {
      return prev.map((subject) => {
        if (subject.code === code) return { ...subject, state }

        return subject
      })
    })
  }

  /*
    Retorna un valor booleano si todas las correlativas recibidas por parámetro están aprobadas o regulares
    dentro de allSubjectsState
  */
  const areAllCorrelativesPassed = (correlatives: SubjectCode[]): boolean => {
    return correlatives.every((correlative) =>
      allSubjectsState.some(
        (subject) =>
          subject.code === correlative &&
          (subject.state === 'Aprobada' || subject.state === 'Regular')
      )
    )
  }

  // useEffect

  // load allSubjectsState from API or localStorage
  // useEffect(() => {
  //   if (!careerSelectedID || !career) return

  //   try {
  //     const item = getFromLocalStorage(careerSelectedID)

  //     if (!item) {
  //       const subjectsStateStored = career.subjectsByYear.flatMap(
  //         (subjectsByYear) =>
  //           subjectsByYear.subjects.map((subject) => ({
  //             code: subject.code,
  //             name: subject.name,
  //             state:
  //               subject.correlatives.length > 0 ? 'Deshabilitada' : 'Habilitada'
  //           }))
  //       ) as SubjectState[]

  //       setAllSubjectsState(subjectsStateStored)
  //       // saveToLocalStorage(careerSelectedID, subjectsStateStored)
  //     } else {
  //       setAllSubjectsState(item as SubjectState[])
  //     }
  //   } catch (error) {
  //     console.error('Error parsing career data from localStorage', error)
  //   }
  // }, [career])

  // Event handlers and functions
  const getSubjectNameFromCode = (code: string): Name | undefined =>
    allSubjectsState.find((subject) => subject.code === code)?.name

  const value = useMemo(
    () => ({
      getSubjectState,
      changeSubjectState,
      areAllCorrelativesPassed,
      getSubjectNameFromCode,
      allSubjectsState
    }),
    [
      getSubjectState,
      changeSubjectState,
      areAllCorrelativesPassed,
      getSubjectNameFromCode,
      allSubjectsState
    ]
  )

  return (
    <SubjectStateContext.Provider value={value}>
      {children}
    </SubjectStateContext.Provider>
  )
}
