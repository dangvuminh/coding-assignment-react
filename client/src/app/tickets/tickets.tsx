import { Ticket } from '@acme/shared-models';
import styles from './tickets.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faCheck, faClose, faEllipsisH, faLinkSlash } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import DataTable from 'client/src/components/table';
export interface TicketsProps {
  tickets: Ticket[];
}

const columns = [{ field: 'id', label: 'ID' }, { field: 'description', label: 'Description' }, { field: 'completed', label: 'Completed?', type: 'boolean' }, { field: 'assigneeId', label: "Assignee" }]

export function Tickets(props: TicketsProps) {
  const [showMenu, setShowMenu] = useState(0);
  return (
    <div className={styles['tickets']}>
      <h2>Tickets</h2>
      {props.tickets ? (
        // <table className='data-table'>
        //   <thead>
        //     <tr>
        //       <th>ID</th>
        //       <th>Description</th>
        //       <th>Assignee</th>
        //       <th>Completed?</th>
        //       <th></th>
        //     </tr>
        //   </thead>
        //   <tbody>
        //     {
        //       props.tickets.map((t) => (
        //         <tr>
        //           <td>{t.id}</td>
        //           <td>{t.description}</td>
        //           <td>{t.assigneeId}</td>
        //           <td>{t.completed ? <FontAwesomeIcon icon={faCheck} color='green'/> : <FontAwesomeIcon icon={faClose} color='red'/>}</td>
        //           <td style={{position: 'relative'}}><FontAwesomeIcon icon={faEllipsisH} onClick={()  => setShowMenu(t.id)}/>
        //           <div style={{position: 'absolute', top: 0,left: 40, display: showMenu === t.id ? 'block' : 'none', backgroundColor: 'ghostwhite'}}>
        //             <ul style={{width: '120px', padding: "10px", textAlign:'start'}}>
        //               <li><FontAwesomeIcon icon={faBook}/> Details</li>
        //               <li><FontAwesomeIcon icon={faLinkSlash}/> Unassign user</li>
        //             </ul>
        //           </div>
        //           </td>
        //         </tr>
        //       ))
        //     }
        //   </tbody>
        // </table>
        <DataTable columns={columns} rows={props.tickets} action={{
          nodes: [{
            icon: faBook, title: 'Details', onClick: (row: any) => {
              console.log(row);
            }
          }, { icon: faLinkSlash, title: 'Unassign user', onClick: () => { } }]
        }} />
      ) : (
        <span>...</span>
      )}
    </div>
  );
}

export default Tickets;
