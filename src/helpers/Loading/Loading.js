import React from 'react';
import './Loading.scss';

const Loading = ({ text }) => {
  return (
    <div className="loader">
      <div className="loader-item">
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
