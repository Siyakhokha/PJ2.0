import React from 'react';
import './Styles/Alerts.scss';

const Alerts = ({ ErrortextAlert, error }) => {
  return (
    <div className="alerts">
      {ErrortextAlert && <p>{ErrortextAlert}</p>}
      <p>{error && error}</p>
    </div>
  );
};

export default Alerts;
