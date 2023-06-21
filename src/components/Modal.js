import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

const PopupModal = (props) => {
  const {
    isOpen, toggle, children, title = "", size = "md"
  } = props;

  const closeBtn = <button className="close" onClick={toggle}>&times;</button>;

  return (
    <div>
      <Modal size={size} isOpen={isOpen} toggle={toggle}>
        <ModalHeader close={closeBtn} toggle={toggle}>{title}</ModalHeader>
        <ModalBody>
          {children}
        </ModalBody>
      </Modal>
    </div>
  );
}

export default PopupModal;