import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './modal.scss';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { ReactElement } from 'react';

const Modal = ({
  open,
  title,
  body,
  footer,
  handleClose,
}: {
  open: boolean;
  title: string;
  body: ReactElement;
  footer?: ReactElement;
  handleClose: () => void;
}) => {
  return open ? (
    <div className="modal">
      <div className="modal-content">
        <div className="header-modal">
          <h3>{title}</h3> <FontAwesomeIcon icon={faClose} onClick={handleClose} />
        </div>
        <div className="body">{body}</div>
      </div>
      <div className="footer">{footer}</div>
    </div>
  ) : (
    <></>
  );
};

export default Modal;
