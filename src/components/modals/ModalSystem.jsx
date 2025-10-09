import React, { useEffect, useState } from 'react'
import './ModalSystem.css'
import QuestionModal from './QuestionModal'
import CompletionModal from './CompletionModal'

const API_BASE_URL = 'http://127.0.0.1:8000';

const ModalSystem = ({ 
  isQuestionOpen = false, 
  isCompletionOpen = false,
  currentQuestionId = 1, 
  onCloseQuestion, 
  onCloseCompletion,
  questionStates = {}, 
  onAnswered,
  finalResult
}) => {
  const [questions, setQuestions] = useState([]);
  const [userCompletionResult, setUserCompletionResult] = useState(null);
  
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/questions/`)
      .then(response => response.json())
      .then(data => setQuestions(data.results || data)) // Handle pagination if DRF adds it
      .catch(error => console.error("Failed to fetch questions:", error));
  }, []);

  // Fetch specific user result when completion modal is opened
  useEffect(() => {
    if (isCompletionOpen && finalResult && finalResult.score !== undefined) {
      fetch(`${API_BASE_URL}/api/user-result/?score=${finalResult.score}`)
        .then(response => response.json())
        .then(data => setUserCompletionResult(data))
        .catch(error => console.error("Failed to fetch user completion result:", error));
    } else if (!isCompletionOpen) {
      // Reset result when modal closes
      setUserCompletionResult(null);
    }
  }, [isCompletionOpen, finalResult]);

  const stateForCurrent = questionStates[currentQuestionId] || { answered: false, selectedAnswer: null }
  
  // Блокируем прокрутку сайта, когда открыта модалка
  useEffect(() => {
    if (isQuestionOpen || isCompletionOpen) {
      const prevBodyOverflow = document.body.style.overflow
      document.body.dataset.prevOverflow = prevBodyOverflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = document.body.dataset.prevOverflow || ''
        delete document.body.dataset.prevOverflow
      }
    }
  }, [isQuestionOpen, isCompletionOpen])

  const currentQuestionData = questions.find(q => q.questionNumber === currentQuestionId);

  return (
    <div className="modal-system" aria-hidden={!isQuestionOpen && !isCompletionOpen}>
      {isQuestionOpen && currentQuestionData && (
        <QuestionModal 
          isOpen={isQuestionOpen}
          questionData={currentQuestionData}
          answered={stateForCurrent.answered}
          selectedAnswer={stateForCurrent.selectedAnswer}
          onAnswer={(questionId, choiceId, selectedIndex) => onAnswered && onAnswered(questionId, choiceId, selectedIndex)}
          onClose={onCloseQuestion}
        />
      )}
      <CompletionModal 
        isOpen={isCompletionOpen && !isQuestionOpen} 
        onClose={onCloseCompletion}
        completionData={userCompletionResult}
      />
    </div>
  )
}

export default ModalSystem