import { type JSX } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import HomePage from './pages/HomePage'
import { PlanEstudiosPage } from './pages/PlanEstudiosPage'
import { NotFoundPage } from './pages/NotFoundPage'
import WorkingOnIt from './components/WorkingOnIt'

function App(): JSX.Element {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/inicio" replace />} />
          <Route path="inicio" element={<HomePage />} />
          <Route path="plan-de-estudios" element={<PlanEstudiosPage />} />
          <Route path="estadisticas" element={<WorkingOnIt />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
