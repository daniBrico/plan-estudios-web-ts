import { LoadingSpinner2 } from '../LoadingSpinner2'

interface SubmitButtonProps {
  loading: boolean
  label: string
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ loading, label }) => {
  return (
    <div className="flex w-full justify-center">
      <button
        className="relative cursor-pointer rounded-md border border-gray-500 bg-gray-600 px-2 py-1 text-lg text-gray-100 transition-all duration-300 ease-in-out hover:bg-gray-500 disabled:cursor-auto disabled:bg-gray-500 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700 dark:disabled:bg-stone-700 dark:disabled:text-stone-500"
        type="submit"
        disabled={loading}
      >
        {label}
        {loading && (
          <div className="absolute top-0 -right-12 cursor-auto">
            <LoadingSpinner2
              size="w-9 h-9"
              thickness="border-4"
              color="border-t-gray-600"
            />
          </div>
        )}
      </button>
    </div>
  )
}

export default SubmitButton
