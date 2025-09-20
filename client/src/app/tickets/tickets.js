import { Ticket } from '@acme/shared-models';
import styles from './tickets.module.css';
import { faBook, faMarker, faPlus } from '@fortawesome/free-solid-svg-icons'
import DataTable from 'client/src/components/table';
import { useNavigate } from 'react-router-dom';
import Modal from 'client/src/components/modal';
import { useMemo, useState } from 'react';
import AssigneeToggle from '../components/assignee-toggle';
import useFetchApis from 'client/src/hooks/useFetchApis';
import Button from 'client/src/components/buttons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import StatusToggle from '../components/status-toggle';
import DummySidebar from '../dummy-sidebar';
export interface TicketsProps {
  tickets: Ticket[];
  setTickets: (ticket: Ticket[]) => void;
  users: User[];
  originalTickets: Ticket[];
}

const columns = [{ field: 'id', label: 'ID' }, { field: 'description', label: 'Description' }, { field: 'completed', label: 'Completed?', type: 'boolean' }, { field: 'assignee', label: "Assignee" }]

export function Tickets(props: TicketsProps) {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [description, setDescription] = useState('');

  const [markTicket] = useFetchApis(`/api/tickets/:id/complete`)
  const [createTicket] = useFetchApis('/api/tickets');

  const mappedRows = useMemo(() => {
    const userMap = {};
    props.users.forEach((user) => {
      userMap[user.id] = user.name;
    });
    return props.tickets.map((col) => ({ ...col, assignee: userMap?.[col.assigneeId] || 'Unassigned' }));
  }, [props.users, props.tickets]);

  return (
    <div className={styles['tickets']}>
      <DummySidebar />
      {props.tickets ? (
        <div style={{ width: '80%', margin: "0 auto" }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: "20px" }}>
            <div style={{ display: 'flex' }}>
              <h2 style={{ marginRight: '10px' }}>Tickets</h2>
              <StatusToggle onClick={(status) => {
                if (status === '') {
                  props.setTickets(props.originalTickets);
                } else
                  props.setTickets(props.originalTickets.filter((ticket) => status === 'completed' ? ticket.completed : !ticket.completed))
              }} />
            </div>
            <Button onClick={() => setOpenModal(true)} prefixIcon={<FontAwesomeIcon icon={faPlus} />}>Create ticket</Button>
          </div>
          <DataTable columns={columns} rows={mappedRows} action={{
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
        </div>
      ) : (
        <span>...</span>
      )}
      <Modal open={openModal} title="Create ticket" body={<div>
        <input name="description" style={{ padding: '10px', width: "95%" }} type="text" placeholder='Description' onChange={(e) => {
          setDescription(e.target.value);
        }} />
        <h3>Assign assignee</h3>
        <AssigneeToggle defaultAssigneeId={null} handleToggle={() => { }} />
      </div>} footer={<div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button onClick={async () => {
          const data = await createTicket({ method: 'POST', body: { description } })
          props.setTickets([...props.tickets, data] as Ticket[]);
          setOpenModal(false);
        }} type='submit'>Save</Button>
        <Button variant="error" onClick={() => setOpenModal(false)}>Cancel</Button>
      </div>} handleClose={() => setOpenModal(false)} />
      <div className={`modal-shadow-bg ${openModal && 'active'}`} />
    </div>
  );
}

export default Tickets;
