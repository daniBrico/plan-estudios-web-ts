import { type JSX } from 'react'
import GithubCatIconSvg from './svg-components/GithubCatIconSvg'
import BriefcaseSvg from './svg-components/BriefcaseSvg'

const Footer = (): JSX.Element => {
  return (
    <>
      <footer className="bg-carnation-400 relative bottom-0 left-0 px-4 py-2 shadow-[0_-4px_10px_rgba(0,0,0,0.2)] md:py-4 lg:px-0 dark:bg-stone-900">
        <div className="mx-auto max-w-4xl">
          <div className="flex gap-3 text-sm font-light text-white md:text-base">
            <a
              className="flex items-center gap-1 dark:text-stone-200"
              href="https://danibrico.github.io/portfolio/"
              rel="noopener"
              target="_blank"
            >
              <div className="w-7">
                <BriefcaseSvg />
              </div>
              <p className="text-white hover:underline">@danielJorge</p>
            </a>
            <a
              className="flex items-center gap-1 dark:text-stone-200"
              href="https://github.com/daniBrico/plan-estudios-web-ts"
              rel="noopener"
              target="_blank"
            >
              <div className="w-6">
                <GithubCatIconSvg />
              </div>
              <p className="text-white hover:underline">
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
