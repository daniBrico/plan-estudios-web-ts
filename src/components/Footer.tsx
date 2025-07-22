import { type JSX } from 'react'
import { GithubCatIconSvg } from './svg-components/GithubCatIconSvg'
import { PortfolioIconSvg } from './svg-components/PortfolioIconSvg'

const Footer = (): JSX.Element => {
  const white = '#fff'

  return (
    <>
      <footer className="bg-theme-first-color relative bottom-0 left-0 px-4 py-2 md:py-4 lg:px-0">
        <div className="mx-auto max-w-4xl">
          <div className="flex gap-3 text-sm font-light text-white md:text-base">
            <a
              className="flex items-center gap-1"
              href="https://danibrico.github.io/portfolio/"
              rel="noopener"
              target="_blank"
            >
              <div className="w-6">
                <PortfolioIconSvg />
              </div>
              <p className="text-white underline xl:no-underline xl:hover:underline">
                @danielJorge
              </p>
            </a>
            <a
              className="flex items-center gap-1"
              href="https://github.com/daniBrico/plan-estudios-web-ts"
              rel="noopener"
              target="_blank"
            >
              <div className="w-6">
                <GithubCatIconSvg color={white} />
              </div>
              <p className="text-white underline xl:no-underline xl:hover:underline">
                Repositorio del proyecto
              </p>
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
