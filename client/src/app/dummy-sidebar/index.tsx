import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBook,
  faChevronDown,
  faInbox,
  faLocation,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import './index.scss';

const DummySidebar = () => {
  return (
    <div className="dummy">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h4>
          Mealsuite <FontAwesomeIcon icon={faChevronDown} />
        </h4>
        <FontAwesomeIcon icon={faSearch} style={{ alignSelf: 'center', padding: '20px' }} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <FontAwesomeIcon icon={faLocation} /> My tickets
      </div>
      <div style={{ marginBottom: '10px' }}>
        <FontAwesomeIcon icon={faInbox} /> Inbox
      </div>
      <div style={{ marginBottom: '10px' }}>
        <FontAwesomeIcon icon={faBook} />
        Drafts
      </div>
    </div>
  );
};

export default DummySidebar;
