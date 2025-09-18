import React, { useMemo, useState } from 'react';
import BackgroundLayer from './layers/BackgroundLayer';
import MiddlegroundLayer from './layers/MiddlegroundLayer';
import ForegroundLayer from './layers/ForegroundLayer';
import InteractiveLayer from './layers/InteractiveLayer';
import SnowLayer from './layers/SnowLayer';
import UILayer from './ui/UILayer';
import ModalSystem from './modals/ModalSystem';
import './GameBoard.css';

const GameBoard = () => {
  const [isQuestionOpen, setIsQuestionOpen] = useState(false)
  const [currentQuestionId, setCurrentQuestionId] = useState(1)
  const [questionStates, setQuestionStates] = useState({})

  const openQuestion = (id) => {
    setCurrentQuestionId(id)
    setIsQuestionOpen(true)
  }

  const handleAnswered = (id, selectedIndex) => {
    setQuestionStates(prev => ({
      ...prev,
      [id]: { answered: true, selectedAnswer: selectedIndex }
    }))
  }

  const answeredCount = useMemo(() => {
    return Object.values(questionStates).filter(s => s?.answered).length
  }, [questionStates])

  return (
    <div className="game-board">
      {/* Фоновый слой - статичная основа (небо, снег, ландшафт) */}
      <BackgroundLayer />
      
      {/* Средний слой - персонажи, деревья, объекты */}
      <MiddlegroundLayer />
      
      {/* Передний слой - тропинка, передний план */}
      <ForegroundLayer />
      
      {/* Интерактивные элементы - кликабельные цифры */}
      <InteractiveLayer onOpenQuestion={openQuestion} />
      
      {/* Снежный верхний слой (над всем UI, под модалками) */}
      <SnowLayer />

      {/* UI элементы - заголовки, кнопки */}
      <UILayer answeredCount={answeredCount} />
      
      {/* Модальные окна */}
      <ModalSystem 
        isQuestionOpen={isQuestionOpen}
        currentQuestionId={currentQuestionId}
        onCloseQuestion={() => setIsQuestionOpen(false)}
        questionStates={questionStates}
        onAnswered={handleAnswered}
      />
    </div>
  );
};

export default GameBoard;