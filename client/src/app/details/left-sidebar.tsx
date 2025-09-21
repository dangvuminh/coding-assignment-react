import { Ticket } from '@acme/shared-models';
import { faArrowLeft, faCheck, faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { TicketImp } from './type';

const LeftSidebar = ({
  tickets,
  details,
}: {
  tickets: Ticket[];
  details: TicketImp | undefined;
}) => {
  const navigate = useNavigate();
  const f = tickets.filter((t) => {
    return t.assigneeId == details?.assigneeId && t.id != details?.id;
  });

  return (
    <div className="property-sidebar sidebar" style={{ width: '20%' }}>
      <div
        className="showCursor"
        style={{ border: '1px solid gainsboro', display: 'inline-block', padding: 5 }}
      >
        <FontAwesomeIcon
          icon={faArrowLeft}
          onClick={() => {
            navigate('/');
          }}
        />
      </div>
      <h3>Other tickets by {details?.assignee}</h3>
      {f.map((ticket) => {
        return (
          <div
          className='showCursor showActive'
            style={{
              border: '1px solid gainsboro',
              marginBottom: '15px',
              borderRadius: '6px',
              padding: '5px',
            }}
            onClick={() => {
              navigate(`/${ticket.id}`)
            }}
          >
            {ticket.description.substring(0, 25)}{' '}
            {ticket.completed ? (
              <FontAwesomeIcon icon={faCheck} color="green" />
            ) : (
              <FontAwesomeIcon icon={faClose} color="red" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LeftSidebar;
