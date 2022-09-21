import React, { MouseEventHandler } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineClose } from 'react-icons/ai';

function ModalBox({
  title,
  message,
  onClose,
  onConfirm,
}: {
  title: string;
  message: string;
  onClose: MouseEventHandler<HTMLSpanElement>;
  onConfirm: any;
}) {
  return (
    <>
      <div className='modal-mask'></div>
      <div className='modal-box'>
        <div className='modal-header'>
          <p>{title}</p>
          <span className='modal-close-icon' onClick={onClose}>
            <AiOutlineClose />
          </span>
        </div>
        <div className='modal-body'>
          <p>{message}</p>
        </div>
        <div className='modal-footer'>
          <button onClick={onClose}>Close</button>
          <button onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </>
  );
}

export default ModalBox;

ModalBox.propTypes = {
  message: PropTypes.string,
  onClose: PropTypes.func,
};
