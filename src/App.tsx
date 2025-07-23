import { type JSX } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import { PlanEstudiosPage } from './pages/PlanEstudiosPage'
import { NotFoundPage } from './pages/NotFoundPage'
// import WorkingOnIt from './components/WorkingOnIt'
import { StatsPage } from './pages/StatsPage'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTopButton from './components/scroll-to-top-button/ScrollToTopButton'

function App(): JSX.Element {
  return (
    <>
      <Header />
      <main className="h-full">
        <Routes>
          <Route index element={<Navigate to="/inicio" replace />} />
          <Route path="inicio" element={<HomePage />} />
          <Route path="plan-de-estudios" element={<PlanEstudiosPage />} />
          <Route path="estadisticas" element={<StatsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <ScrollToTopButton />
      <Footer />
    </>
  )
}

export default App
