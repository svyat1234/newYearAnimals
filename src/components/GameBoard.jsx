import React from 'react';
import BackgroundLayer from './layers/BackgroundLayer';
import MiddlegroundLayer from './layers/MiddlegroundLayer';
import ForegroundLayer from './layers/ForegroundLayer';
import InteractiveLayer from './layers/InteractiveLayer';
import SnowLayer from './layers/SnowLayer';
import UILayer from './ui/UILayer';
import ModalSystem from './modals/ModalSystem';
import './GameBoard.css';

const GameBoard = () => {
  return (
    <div className="game-board">
      {/* Фоновый слой - статичная основа (небо, снег, ландшафт) */}
      <BackgroundLayer />
      
      {/* Средний слой - персонажи, деревья, объекты */}
      <MiddlegroundLayer />
      
      {/* Передний слой - тропинка, передний план */}
      <ForegroundLayer />
      
      {/* Интерактивные элементы - кликабельные цифры */}
      <InteractiveLayer />
      
      {/* Снежный верхний слой (над всем UI, под модалками) */}
      <SnowLayer />

      {/* UI элементы - заголовки, кнопки */}
      <UILayer />
      
      {/* Модальные окна */}
      <ModalSystem />
    </div>
  );
};

export default GameBoard;