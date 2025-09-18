import React, { useEffect, useState } from 'react'
import './ModalSystem.css'
import QuestionModal from './QuestionModal'
import CompletionModal from './CompletionModal'

// Minimal orchestrator stub. Real state/logic will be added later (from backend).
// Props suggestion:
// - currentQuestion (id or object) and isQuestionOpen
// - isCompletionOpen
// - handlers: onCloseQuestion, onCloseCompletion
const ModalSystem = ({ isQuestionOpen = false, currentQuestionId = 1, onCloseQuestion, questionStates = {}, onAnswered }) => {
  const stateForCurrent = questionStates[currentQuestionId] || { answered: false, selectedAnswer: null }

  // Блокируем прокрутку сайта, когда открыта модалка
  useEffect(() => {
    if (isQuestionOpen) {
      const prevBodyOverflow = document.body.style.overflow
      document.body.dataset.prevOverflow = prevBodyOverflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = document.body.dataset.prevOverflow || ''
        delete document.body.dataset.prevOverflow
      }
    }
  }, [isQuestionOpen])

  return (
    <div className="modal-system" aria-hidden>
      {isQuestionOpen && (
        <QuestionModal 
          isOpen={isQuestionOpen}
          questionId={currentQuestionId}
          answered={stateForCurrent.answered}
          selectedAnswer={stateForCurrent.selectedAnswer}
          onAnswer={(selectedIndex) => onAnswered && onAnswered(currentQuestionId, selectedIndex)}
          onClose={onCloseQuestion}
        />
      )}
      {/* <CompletionModal isOpen={false} onClose={() => {}} result={{ title: '', text: '', image: '' }} /> */}
    </div>
  )
}

export default ModalSystem