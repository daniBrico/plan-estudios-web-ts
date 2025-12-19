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
        'pointer-events-none absolute top-full z-50 mt-1 flex w-full items-center justify-center rounded-md border border-gray-200 bg-white py-2 shadow-md transition-all duration-300 ease-in-out',
        {
          'translate-y-0 opacity-100': show,
          '-translate-y-full opacity-0': !show
        }
      )}
    >
      <p className="text-center text-sm text-pretty md:text-base">{message}</p>
    </div>
  )
}

export default NotificationMessage
