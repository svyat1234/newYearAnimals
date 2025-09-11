import React from 'react';
import './MiddlegroundLayer.css';
import { sprites } from '../../data/sprites';
import QueuedImage from '../QueuedImage';

const MiddlegroundLayer = () => {
  return (
    <div className="middleground-layer">
      {sprites.map(item => (
        <QueuedImage
          key={item.id}
          src={item.src}
          alt=""
          imgProps={{ className: `sprite ${item.cls || ''}` }}
          style={{
            position: 'absolute',
            top: `calc(${item.top / 1920 * 100}vw)`,
            ...(item.left != null && { left: `calc(${item.left / 1920 * 100}%)` }),
            ...(item.width != null && { width: `calc(${item.width / 1920 * 100}%)`, height: 'auto' }),
            zIndex: item.z ?? 1
          }}
        />
      ))}
    </div>
  );
};

export default MiddlegroundLayer;