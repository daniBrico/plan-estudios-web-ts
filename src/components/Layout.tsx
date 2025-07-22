import { type JSX } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import ScrollToTopButton from './scroll-to-top-button/ScrollToTopButton'

export const Layout = (): JSX.Element => {
  return (
    <>
      <Header />
      <main className="h-full">
        <Outlet />
      </main>
      <ScrollToTopButton />
      <Footer />
    </>
  )
}
