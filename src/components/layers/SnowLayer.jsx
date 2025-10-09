import React from 'react';
import './SnowLayer.css';
import { useIsMobile } from '../../hooks/useIsMobile';
import snowMobile from '../../assets/images/snow-mobile.svg';

const SnowLayer = () => {
  const isMobile = useIsMobile(1024);
  if (!isMobile) return null;
  return (
    <div className="snow-layer" aria-hidden="true">
      <img src={snowMobile} alt="" className="snow-image" draggable={false} />
    </div>
  );
};

export default SnowLayer;


