import { Ticket } from '@acme/shared-models';
import styles from './tickets.module.css';
import { faBook, faLinkSlash, faMarker } from '@fortawesome/free-solid-svg-icons'
import DataTable from 'client/src/components/table';
import { useNavigate } from 'react-router-dom';
import Modal from 'client/src/components/modal';
import { useState } from 'react';
import AssigneeToggle from '../details/assignee-toggle';
import useFetchApis from 'client/src/hooks/useFetchApis';
export interface TicketsProps {
  tickets: Ticket[];
  setTickets: (ticket: Ticket[]) => void;
}

const columns = [{ field: 'id', label: 'ID' }, { field: 'description', label: 'Description' }, { field: 'completed', label: 'Completed?', type: 'boolean' }, { field: 'assigneeId', label: "Assignee" }]

export function Tickets(props: TicketsProps) {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [description, setDescription] = useState('');

  const [markTicket] = useFetchApis(`/api/tickets/:id/complete`)
  const [createTicket] = useFetchApis('/api/tickets');

  return (
    <div className={styles['tickets']}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}><h2>Tickets</h2> <button onClick={() => setOpenModal(true)}>Create ticket</button></div>
      {props.tickets ? (
        <DataTable columns={columns} rows={props.tickets} action={{
          nodes: [{
            icon: () => faBook, title: () => 'Details', onClick: (row: any) => {
              navigate(`/${row.id}`)
            }
          }, {
            icon: () => faMarker, title: (row: any) => row.completed ? 'Mark incompleted' : 'Mark completed',
            onClick: async (row: any) => {
              await markTicket({ params: { id: row.id }, method: row.completed ? 'DELETE' : 'PUT' });
              props.setTickets(props.tickets.map((ticket) => ticket.id === row.id ? { ...ticket, completed: !row.completed } : ticket))
            }
          }]
        }} onRowSelect={(row: any) => {
          navigate(`/${row.id}`)
        }} />
      ) : (
        <span>...</span>
      )}
      <Modal open={openModal} title="Create ticket" body={<div>
        <input name="description" style={{ padding: '10px' }} type="text" placeholder='Description' onChange={(e) => {
          setDescription(e.target.value);
        }} />
        <h3>Assign assignee</h3>
        <AssigneeToggle defaultAssigneeId={null} handleToggle={() => { }} />
      </div>} footer={<div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <button onClick={async () => {
          const data = await createTicket({ method: 'POST', body: { description } })
          props.setTickets([...props.tickets, data] as Ticket[]);
          setOpenModal(false);
        }} type='submit'>Save</button>
        <button>Cancel</button>
      </div>} handleClose={() => setOpenModal(false)} />
    </div>
  );
}

export default Tickets;
