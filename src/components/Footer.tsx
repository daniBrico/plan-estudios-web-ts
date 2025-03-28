import { type JSX } from 'react'
import { GithubCatIconSvg } from './svg-components/GithubCatIconSvg'
import { PortfolioIconSvg } from './svg-components/PortfolioIconSvg'

const lastUpdate = (): string => {
  const currentDate = new Date()
  const day = String(currentDate.getDate()).padStart(2, '0')
  const month = String(currentDate.getMonth() + 1).padStart(2, '0')
  const year = currentDate.getFullYear()

  return `Últ. Act. ${day}/${month}/${year}`
}

function Footer(): JSX.Element {
  const white = '#fff'

  return (
    <>
      <footer className="bg-first-color relative bottom-0 left-0 px-4 py-2">
        <div className="mx-auto max-w-4xl">
          <div className="flex justify-between px-1 text-sm font-light text-white md:text-base">
            <p>@danielJorge</p>
            <p>{lastUpdate()}</p>
          </div>
          <div className="mt-2 flex flex-col gap-2 px-1 text-sm font-light sm:flex-row sm:gap-6 md:text-base">
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
                Portafolio web
              </p>
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
