import useSubjectState from '../../hooks/useSubjectState'
import { type Correlative as CorrelativeType } from '../../types/types'
import CorrelativeToolTip from './CorrelativeToolTip'

interface CorrelativeProps {
  correlative: CorrelativeType
  tooltip: boolean
  cssClasess?: string
}

const Correlative: React.FC<CorrelativeProps> = ({
  correlative,
  tooltip,
  cssClasess
}) => {
  const { getStyleForState } = useSubjectState(correlative.code)

  return (
    <div className={`group relative inline-block text-left ${cssClasess}`}>
      <span className={`${getStyleForState()}`}>{correlative.code}</span>
      {tooltip && <CorrelativeToolTip correlative={correlative.code} />}
    </div>
  )
}

export default Correlative
