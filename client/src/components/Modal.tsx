import React, { MouseEventHandler } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineClose } from 'react-icons/ai';

function ModalBox({message, onClose}: {message: string, onClose: MouseEventHandler<HTMLSpanElement>}) {
    return (
        <>
            <div className='modal-mask'></div>
            <div className='modal-box'>
                <div className='modal-header'>
                    <p>Title</p>
                    <span className='modal-close-icon' onClick={onClose}><AiOutlineClose /></span>
                </div>
                <div className='modal-body'>
                    <p>Body content message</p>
                </div>
                <div className='modal-footer'>
                    <button>Close</button>
                    <button>Confirm</button>
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
