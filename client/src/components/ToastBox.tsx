import React from 'react';
import PropTypes from 'prop-types';

function ToastBox({ message }: { message: string }) {
  return (
    <div className='toast-box'>
      <p>{message}</p>
    </div>
  );
}

export default ToastBox;

ToastBox.propTypes = {
  message: PropTypes.string,
};
