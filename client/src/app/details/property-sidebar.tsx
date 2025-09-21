import useFetchApis from 'client/src/hooks/useFetchApis';
import AssigneeDropDown from '../components/assignee-dropdown';
import { Ticket } from '@acme/shared-models';
import { TicketImp } from './type';

const PropertySidebar = ({
  details,
  setDetails,
}: {
  details: TicketImp;
  setDetails: (ticket: TicketImp) => void;
}) => {
  const [unassignUser] = useFetchApis('/api/tickets/:ticketId/unassign');
  const [assignUser] = useFetchApis('/api/tickets/:ticketId/assign/:userId');
  const [markTicket] = useFetchApis(`/api/tickets/:id/complete`);
  return (
    <div className="property-sidebar sidebar" style={{ width: '30%' }}>
      <h3>Status</h3>
      {(details?.completed === true || details?.completed === false) && (
        <div>
          <input
            type="checkbox"
            defaultChecked={details.completed}
            onChange={async (e) => {
              const method = e.target.checked ? 'PUT' : 'DELETE';
              await markTicket({ params: { id: details.id.toString() }, method: method });
              setDetails({ ...details, completed: e.target.checked });
            }}
          />
          {!details.completed ? 'Mark completed' : 'Mark incompleted'}
        </div>
      )}
      <h3>Assignee</h3>
      {details?.id && (
        <AssigneeDropDown
          assigneeId={details.assigneeId || -1}
          onSelect={async (user) => {
            user.id != -1
              ? await assignUser({
                  method: 'PUT',
                  params: { ticketId: details.id.toString(), userId: user.id.toString() },
                })
              : await unassignUser({ method: 'PUT', params: { userId: user.id.toString() } });
            setDetails({ ...details, assigneeId: user.id });
          }}
        />
      )}
    </div>
  );
};

export default PropertySidebar;
