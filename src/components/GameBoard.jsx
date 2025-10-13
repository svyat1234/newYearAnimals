import React, { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import BackgroundLayer from './layers/BackgroundLayer';
import MiddlegroundLayer from './layers/MiddlegroundLayer';
import InteractiveLayer from './layers/InteractiveLayer';
import SnowLayer from './layers/SnowLayer';
import UILayer from './ui/UILayer';
import ModalSystem from './modals/ModalSystem';
import './GameBoard.css';

const API_BASE_URL = 'http://127.0.0.1:8000';

const GameBoard = () => {
  const [isQuestionOpen, setIsQuestionOpen] = useState(false)
  const [currentQuestionId, setCurrentQuestionId] = useState(1)
  const [questionStates, setQuestionStates] = useState({})
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompletionOpen, setIsCompletionOpen] = useState(false);
  const [finalResult, setFinalResult] = useState(null);
  const [isDonationOpen, setIsDonationOpen] = useState(false);
  const submissionTriggered = useRef(false);

  // Fetch total questions count on mount for comparison
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/questions/`)
      .then(res => res.json())
      .then(data => {
        setTotalQuestions(data.count || (Array.isArray(data) ? data.length : 0));
      })
      .catch(console.error);
  }, []);

  const openQuestion = (id) => {
    setCurrentQuestionId(id)
    setIsQuestionOpen(true)
  }

  const handleAnswered = (questionId, choiceId, selectedIndex) => {
    setQuestionStates(prev => ({
      ...prev,
      [questionId]: { 
        answered: true, 
        selectedAnswer: selectedIndex,
        choiceId: choiceId
      }
    }))
  }

  const answeredCount = useMemo(() => {
    return Object.values(questionStates).filter(s => s?.answered).length
  }, [questionStates])

  const submitQuizResults = useCallback(async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const answers = Object.entries(questionStates).map(([question_id, state]) => ({
      question_id: parseInt(question_id, 10),
      choice_id: state.choiceId
    }));

    try {
      const response = await fetch(`${API_BASE_URL}/api/submit-quiz/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      console.log('Quiz submitted successfully:', result);
      setFinalResult(result);
      setIsCompletionOpen(true);
    } catch (error) {
      console.error('Failed to submit quiz:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [questionStates, isSubmitting]);

  // Effect to check if all questions have been answered
  useEffect(() => {
    if (totalQuestions > 0 && answeredCount === totalQuestions && !submissionTriggered.current) {
      submissionTriggered.current = true;
      submitQuizResults();
    }
  }, [answeredCount, totalQuestions, submitQuizResults]);


  return (
    <div className="game-board">
      {/* Фоновый слой - статичная основа (небо, снег, ландшафт) */}
      <BackgroundLayer />
      
      {/* Средний слой - персонажи, деревья, объекты */}
      <MiddlegroundLayer />
      
      {/* Интерактивные элементы - кликабельные цифры */}
      <InteractiveLayer onOpenQuestion={openQuestion} answeredMap={questionStates} />
      
      {/* Снежный верхний слой (над всем UI, под модалками) */}
      <SnowLayer />

      {/* UI элементы - заголовки, кнопки */}
      <UILayer 
        answeredCount={answeredCount} 
        onOpenDonation={() => setIsDonationOpen(true)}
      />
      
      {/* Модальные окна */}
      <ModalSystem 
        isQuestionOpen={isQuestionOpen}
        isCompletionOpen={isCompletionOpen}
        finalResult={finalResult}
        currentQuestionId={currentQuestionId}
        onCloseQuestion={() => setIsQuestionOpen(false)}
        onCloseCompletion={() => setIsCompletionOpen(false)}
        questionStates={questionStates}
        onAnswered={handleAnswered}
        isDonationOpen={isDonationOpen}
        onCloseDonation={() => setIsDonationOpen(false)}
        onOpenDonation={() => setIsDonationOpen(true)}
      />
    </div>
  );
};

export default GameBoard;