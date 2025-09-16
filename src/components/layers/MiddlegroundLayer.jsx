import React from 'react';
import './MiddlegroundLayer.css';
import { useIsMobile } from '../../hooks/useIsMobile';
import { sprites } from '../../data/sprites';
import QueuedImage from '../QueuedImage';

const MiddlegroundLayer = () => {
  const isMobile = useIsMobile(1024);

  return (
    <div className="middleground-layer">
      {sprites.map(item => {
        if (isMobile && item.mobile?.hidden) return null;
        return (
        <QueuedImage
          key={item.id}
          src={item.src}
          alt=""
          imgProps={{ className: `sprite ${item.cls || ''}` }}
          style={{
            position: 'absolute',
            top: `calc(${(isMobile ? (item.mobile?.top ?? item.top) : item.top) / (isMobile ? 3172 : 5541) * 100}%)`,
            ...(((isMobile ? item.mobile?.left : undefined) ?? item.left) != null && { left: `calc(${((isMobile ? item.mobile?.left : undefined) ?? item.left) / (isMobile ? 320 : 1920) * 100}%)` }),
            ...(((isMobile ? item.mobile?.width : undefined) ?? item.width) != null && { width: `calc(${((isMobile ? item.mobile?.width : undefined) ?? item.width) / (isMobile ? 320 : 1920) * 100}%)`, height: 'auto' }),
            zIndex: item.z ?? 1
          }}
        />
      )})}
    </div>
  );
};

export default MiddlegroundLayer;