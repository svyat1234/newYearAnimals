import React from 'react';
import './InteractiveLayer.css';
import { gameConfig } from '../../data/gameConfig';

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
            top: `calc(${p.top / 1920 * 100}vw)`,
            ...(p.left != null && { left: `calc(${p.left / 1920 * 100}%)` }),
            ...(p.right != null && { right: `calc(${p.right / 1920 * 100}%)` })
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