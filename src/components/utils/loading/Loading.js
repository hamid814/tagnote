import React from 'react';

import './loading.scss';

const Loading = () => {
  return (
    <div className="loading">
      <div className="loading-container">
        <div className="loading-block top first">
          <div className="face"></div>
          <div className="face"></div>
          <div className="face"></div>
        </div>
        <div className="loading-block top second">
          <div className="face"></div>
          <div className="face"></div>
          <div className="face"></div>
        </div>
        <div className="loading-block top third">
          <div className="face"></div>
          <div className="face"></div>
          <div className="face"></div>
        </div>
        <div className="loading-block center">
          <div className="face"></div>
          <div className="face"></div>
          <div className="face"></div>
        </div>
        <div className="loading-block bottom first">
          <div className="face"></div>
          <div className="face"></div>
          <div className="face"></div>
        </div>
        <div className="loading-block bottom second">
          <div className="face"></div>
          <div className="face"></div>
          <div className="face"></div>
        </div>
        <div className="loading-block bottom third">
          <div className="face"></div>
          <div className="face"></div>
          <div className="face"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
