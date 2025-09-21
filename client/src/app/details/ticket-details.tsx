import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropertySidebar from './property-sidebar';
import useFetchApis from 'client/src/hooks/useFetchApis';
import LeftSidebar from './left-sidebar';
import './details.scss';
import { Ticket, User } from '@acme/shared-models';
import { TicketImp } from './type';

const TicketDetails = () => {
  const params = useParams();
  const [details, setDetails] = useState<TicketImp>();
  const [fetchTicket, { error: ticketError, loading: loadingTicket }] =
    useFetchApis(`/api/tickets/:id`);
  const [fetchUsers, { error: userError, loading: loadingUsers }] = useFetchApis(`/api/users/:id`);

  useEffect(() => {
    const fetchDetails = async () => {
      const det = (await fetchTicket({ params: { id: params['id'] || '' } })) as Ticket;
      const user = (await fetchUsers({ params: { id: det.assigneeId?.toString() || '' } })) as User;
      setDetails({ ...det, assignee: user.name });
    };
    fetchDetails();
  }, [params['id']]);
  return (
    <div className="ticket-details" style={{ display: 'flex', justifyContent: 'space-between' }}>
      <LeftSidebar />
      <div className="details-content">
        {' '}
        <h2>
          Ticket ID: {details?.id}{' '}
          <span style={{ fontSize: 14 }}>{details?.completed ? 'Completed' : 'Incompleted'}</span>
        </h2>
        <div>
          <div>
            <h3>Description: {!loadingTicket ? details?.description : 'Loading...'}</h3>
          </div>
        </div>
      </div>
      {!loadingTicket && !loadingUsers ? (
        <PropertySidebar details={details as TicketImp} setDetails={setDetails} />
      ) : (
        'Loading...'
      )}
    </div>
  );
};

export default TicketDetails;
