import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CareerProvider } from './context/CareerContext.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CareerProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CareerProvider>
  </StrictMode>
)
