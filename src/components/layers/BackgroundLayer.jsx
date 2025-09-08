import React from 'react';
import './BackgroundLayer.css';

const BackgroundLayer = () => {
  return (
    <div className="background-layer">
      <img src="/background.svg" alt="Background" className="background-image" />
    </div>
  );
};

export default BackgroundLayer;