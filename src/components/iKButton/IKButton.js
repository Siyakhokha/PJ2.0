import React from 'react';
import './IKButton.scss';

const IKButton = ({ disabled, onClick }) => {
  return (
    <>
      <div className="ikButton-container">
        <button disabled={disabled} onClick={onClick}>
          Complete Order
        </button>
      </div>
    </>
  );
};

export default IKButton;
