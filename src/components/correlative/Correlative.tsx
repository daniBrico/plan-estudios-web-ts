import useSubjectState from '../../hooks/useSubjectState'
import CorrelativeToolTip from './CorrelativeToolTip'

interface CorrelativeProps {
  correlative: string
  tooltip: boolean
  cssClasess?: string
}

const Correlative: React.FC<CorrelativeProps> = ({
  correlative,
  tooltip,
  cssClasess
}) => {
  const { getStyleForState } = useSubjectState(correlative)

  return (
    <div className={`group relative inline-block text-left ${cssClasess}`}>
      <span className={`${getStyleForState()}`}>{correlative}</span>
      {tooltip && <CorrelativeToolTip correlative={correlative} />}
    </div>
  )
}

export default Correlative
