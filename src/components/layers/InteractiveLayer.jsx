import React from 'react';
import './InteractiveLayer.css';
import { gameConfig } from '../../data/gameConfig';

const vw = (px) => `calc(${px / 1920 * 100}vw)`;

const InteractiveLayer = () => {
  return (
    <div className="interactive-layer">
      {gameConfig.points.map((p) => (
        <button
          key={p.id}
          type="button"
          className={`point-btn ${p.variant || 'default'} ${p.id === 2 ? 'variant-2' : ''}`}
          style={{
            position: 'absolute',
            top: vw(p.top),
            ...(p.left != null && { left: vw(p.left) }),
            ...(p.right != null && { right: vw(p.right) })
          }}
          aria-label={`Открыть тест ${p.id}`}
        >
          <span className="point-btn__text">{p.label ?? p.id}</span>
        </button>
      ))}
    </div>
  );
};

export default InteractiveLayer;