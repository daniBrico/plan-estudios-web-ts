import classNames from 'classnames'

interface LoadingSpinnerProps {
  size?: string
  thickness?: string
  color?: string
  className?: string
}

export const LoadingSpinner2: React.FC<LoadingSpinnerProps> = ({
  size,
  thickness = 'border-[3px]',
  color = 'border-t-carnation-400 dark:border-t-stone-800',
  className
}) => {
  return (
    <div
      className={classNames(
        'animate-loading-spinner rounded-full border-solid border-transparent',
        size,
        thickness,
        color,
        className
      )}
    />
  )
}
