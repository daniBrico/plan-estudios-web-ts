import classNames from 'classnames'

interface NotificationMessageProps {
  show: boolean
  message: string
}

const NotificationMessage: React.FC<NotificationMessageProps> = ({
  show,
  message
}) => {
  return (
    <div
      className={classNames(
        'pointer-events-none absolute top-full z-50 mt-2 flex w-full items-center justify-center rounded-md border border-gray-200 bg-white px-2 py-2 shadow-md transition-all duration-300 ease-in-out dark:border-stone-800 dark:bg-stone-900',
        {
          'translate-y-0 opacity-100': show,
          '-translate-y-full opacity-0': !show
        }
      )}
    >
      <p className="text-center text-sm text-pretty text-gray-800 md:text-base dark:text-stone-300">
        {message}
      </p>
    </div>
  )
}

export default NotificationMessage
