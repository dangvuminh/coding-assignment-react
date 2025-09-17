import { Ticket } from '@acme/shared-models';
import styles from './tickets.module.css';
import { faBook, faLinkSlash } from '@fortawesome/free-solid-svg-icons'
import DataTable from 'client/src/components/table';
import { useNavigate } from 'react-router-dom';
export interface TicketsProps {
  tickets: Ticket[];
}

const columns = [{ field: 'id', label: 'ID' }, { field: 'description', label: 'Description' }, { field: 'completed', label: 'Completed?', type: 'boolean' }, { field: 'assigneeId', label: "Assignee" }]

export function Tickets(props: TicketsProps) {
  const navigate = useNavigate();
  return (
    <div className={styles['tickets']}>
      <h2>Tickets</h2>
      {props.tickets ? (
        <DataTable columns={columns} rows={props.tickets} action={{
          nodes: [{
            icon: faBook, title: 'Details', onClick: (row: any) => {
              console.log(row);
              navigate(`/${row.id}`)
            }
          }, { icon: faLinkSlash, title: 'Unassign user', onClick: () => { } }]
        }} onRowSelect={(row: any) => {
          navigate(`/${row.id}`)
        }} />
      ) : (
        <span>...</span>
      )}
    </div>
  );
}

export default Tickets;
