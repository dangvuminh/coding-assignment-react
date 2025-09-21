import Button from 'client/src/components/buttons';
import './index.scss';
import { useState } from 'react';

const StatusToggle = ({
  onClick,
}: {
  onClick: (status: 'completed' | 'incompleted' | '') => void;
}) => {
  const [status, setStatus] = useState('');
  return (
    <div className="status-toggle">
      <Button
        className={status}
        variant="success"
        onClick={() => {
          const value = status !== 'completed' ? 'completed' : '';
          onClick(value);
          setStatus(value);
        }}
      >
        Completed
      </Button>
      <Button
        className={status}
        variant="error"
        onClick={() => {
          const value = status !== 'incompleted' ? 'incompleted' : '';
          onClick(value);
          setStatus(value);
        }}
      >
        Incompleted
      </Button>
    </div>
  );
};

export default StatusToggle;
