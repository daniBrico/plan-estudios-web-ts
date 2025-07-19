import { type Subject } from '../../../types/types'
import TableRow from './TableRow'

interface TableRowsProps {
  subjects: Subject[]
}

const ListOfRows: React.FC<TableRowsProps> = ({ subjects }) => {
  return subjects.map((subject, index) => (
    <TableRow
      key={subject.code}
      code={subject.code}
      name={subject.name}
      offering={subject.offering}
      correlatives={subject.correlatives}
      index={index}
    />
  ))
}

export default ListOfRows
