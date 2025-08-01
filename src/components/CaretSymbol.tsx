import { type JSX } from 'react'

const CaretSymbol = (): JSX.Element => {
  return (
    <div className="border-t-primary h-0 w-0 border-t-[6px] border-r-[5px] border-l-[5px] border-r-transparent border-l-transparent dark:border-t-stone-500" />
  )
}

export default CaretSymbol
