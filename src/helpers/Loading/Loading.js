import React from 'react';
import './Loading.scss';

const Loading = ({ text }) => {
  return (
    <div className="loading-bar">
      <div className="loading-bar-item">
        <img
          src="https://f.hubspotusercontent40.net/hubfs/6412394/LoadingLogo.gif"
          alt="iK-Load-Animation"
        />
        {text && <p>{text}</p>}
      </div>
    </div>
  );
};

export default Loading;
