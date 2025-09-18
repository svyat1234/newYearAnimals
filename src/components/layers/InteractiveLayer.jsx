import React from 'react';
import './InteractiveLayer.css';
import { gameConfig } from '../../data/gameConfig';
import { useIsMobile } from '../../hooks/useIsMobile';

const InteractiveLayer = ({ onOpenQuestion }) => {
  const isMobile = useIsMobile(1024);
  return (
    <div className="interactive-layer">
      {gameConfig.points.map((p) => (
        <button
          key={p.id}
          type="button"
          className={`point-btn ${p.variant || 'default'} ${p.id === 2 ? 'variant-2' : ''}`}
          style={{
            position: 'absolute',
            top: `calc(${(isMobile ? (p.mobile?.top ?? p.top) : p.top) / (isMobile ? 3172 : 5541) * 100}%)`,
            ...(((isMobile ? p.mobile?.left : undefined) ?? p.left) != null && { left: `calc(${((isMobile ? p.mobile?.left : undefined) ?? p.left) / (isMobile ? 320 : 1920) * 100}%)` }),
            ...(((isMobile ? p.mobile?.right : undefined) ?? p.right) != null && { right: `calc(${((isMobile ? p.mobile?.right : undefined) ?? p.right) / (isMobile ? 320 : 1920) * 100}%)` })
          }}
          aria-label={`Открыть тест ${p.id}`}
          onClick={() => onOpenQuestion && onOpenQuestion(p.id)}
        >
          <span className="point-btn__text">{p.label ?? p.id}</span>
        </button>
      ))}
    </div>
  );
};

export default InteractiveLayer;