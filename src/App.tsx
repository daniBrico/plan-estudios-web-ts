import { type JSX } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import { PlanEstudiosPage } from './pages/PlanEstudiosPage'
import { NotFoundPage } from './pages/NotFoundPage'
// import WorkingOnIt from './components/WorkingOnIt'
import { StatsPage } from './pages/StatsPage'
import Header from './components/header/Header'
import Footer from './components/Footer'
import ScrollToTopButton from './components/scroll-to-top-button/ScrollToTopButton'
import ThemeProvider from './context/ThemeContext'

function App(): JSX.Element {
  return (
    <>
      <ThemeProvider>
        <div className="relative flex min-h-screen w-full flex-col text-gray-900">
          <div
            className="bg-background pointer-events-none absolute inset-0 -z-1 dark:bg-zinc-900"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, rgba(255, 0, 100, 0.1) 0, rgba(255, 0, 100, 0.1) 1px, transparent 1px, transparent 20px),
              repeating-linear-gradient(-45deg, rgba(255, 0, 100, 0.1) 0, rgba(255, 0, 100, 0.1) 1px, transparent 1px, transparent 20px)`,
              backgroundSize: '40px 40px'
            }}
          />
          <Header />
          <main className="grow-1">
            <Routes>
              <Route index element={<Navigate to="/inicio" replace />} />
              <Route path="inicio" element={<HomePage />} />
              <Route path="plan-de-estudios" element={<PlanEstudiosPage />} />
              <Route path="info-academica" element={<StatsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <ScrollToTopButton />
          <Footer />
        </div>
      </ThemeProvider>
    </>
  )
}

export default App
