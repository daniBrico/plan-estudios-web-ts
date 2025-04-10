import { type JSX } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import HomePage from './pages/HomePage'
import { PlanEstudiosPage } from './pages/PlanEstudiosPage'

function App(): JSX.Element {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/plan-de-estudios" element={<PlanEstudiosPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
