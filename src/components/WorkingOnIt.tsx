import { type JSX } from 'react'
// import codeThinking from '../assets/code-thinking.svg'
import CodeThinkingSvg from './svg-components/CodeThinkingSvg'

export const WorkingOnIt = (): JSX.Element => {
  return (
    <div className="flex flex-1 flex-col justify-center gap-4">
      <div className="w-2xs sm:w-md md:w-lg">
        <CodeThinkingSvg />
      </div>
      <div className="flex flex-col gap-1 text-sm text-gray-800 sm:text-base md:text-lg">
        <span className="font-bold">TRABAJANDO EN ELLO</span>
        <p className="opacity-40">Paciencia. Estamos mejorando el sitio.</p>
      </div>
    </div>
  )
}

export default WorkingOnIt
