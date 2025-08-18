import { useSubjectStore } from '../../store/subjectStore'

interface CorrelativeToolTipProps {
  correlative: string
}

const CorrelativeToolTip: React.FC<CorrelativeToolTipProps> = ({
  correlative
}) => {
  const name = useSubjectStore((state) =>
    state.getSubjectNameFromCode(correlative)
  )

  return (
    <span className="bg-primary invisible absolute bottom-[150%] left-1/2 hidden -translate-x-1/2 transform rounded-sm border-2 border-white px-1.5 py-1 text-center whitespace-nowrap text-white shadow-sm shadow-gray-400/90 group-hover:visible group-hover:inline before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 before:border-x-8 before:border-y-12 before:border-white before:border-x-transparent before:border-b-transparent dark:border-stone-400 dark:bg-stone-800 dark:text-stone-300 dark:shadow-stone-950/90 dark:before:border-t-stone-400 dark:before:shadow-stone-950/90">
      {name?.shortName || name?.longName}
    </span>
  )
}

export default CorrelativeToolTip
