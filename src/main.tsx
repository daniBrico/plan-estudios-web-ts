// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CareerProvider } from './context/CareerContext.tsx'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <CareerProvider>
    <App />
  </CareerProvider>
  // </StrictMode>
)
