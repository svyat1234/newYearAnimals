import React, { useState } from 'react'
import './QuestionModal.css'
import { questionModals } from '../../data/modals/questions'

// Basic question modal markup. Styling and logic will be added later.
// Props suggestion:
// - isOpen: boolean
// - onClose: () => void
// - questionId: number (1-9)
const QuestionModal = ({ isOpen = true, onClose, questionId = 1, answered: answeredProp = false, selectedAnswer: selectedAnswerProp = null, onAnswer }) => {
  // Получаем данные вопроса по ID
  const question = questionModals.find(q => q.id === questionId) || questionModals[0] // fallback на 1-й вопрос
  
  // Состояние для выбранного ответа
  const [selectedAnswer, setSelectedAnswer] = useState(selectedAnswerProp)
  const [answered, setAnswered] = useState(answeredProp)

  // синхронизация с пропсами при открытии
  React.useEffect(() => {
    setSelectedAnswer(selectedAnswerProp)
    setAnswered(answeredProp)
  }, [selectedAnswerProp, answeredProp, questionId])
  
  // if (!isOpen) return null // Временно закомментировано для верстки
  return (
    <div 
      className={`modal question-modal ${answered ? 'is-answered' : ''}`} 
      role="dialog" 
      aria-modal="true"
      onClick={() => onClose && onClose()}
    >
        <div 
          className="modal__content"
          onClick={(e) => e.stopPropagation()}
        >

            <button 
              className="modal__close"
              type="button"
              aria-label="Закрыть тест"
              onClick={() => onClose && onClose()}
            ></button>

            <div className="modal__img-wrap">
                <img src={question.image} alt="" className="modal__img" />
            </div> 

            <div className="modal__test">

                <div className="modal__heading">
                    <span className="modal__subtitle">{question.subtitle}</span>
                    <h2 className="modal__title">{question.title}</h2>
                </div>
                
                {/* Варианты ответов с кастомными чекбоксами */}
                <div className="modal__test-questions">
                    {question.choices.map((choice, index) => (
                        <div 
                            key={index} 
                            className={`modal__test-question ${answered ? (choice.isCorrect ? 'modal__test-question--right' : 'modal__test-question--wrong') : ''}`}
                        >
                            <label 
                                className="modal__test-option"
                                onClick={() => setSelectedAnswer(index)}
                            >
                                <input 
                                    className="modal__test-input" 
                                    type="radio" 
                                    name="question"
                                    checked={selectedAnswer === index}
                                    onChange={() => setSelectedAnswer(index)}
                                />
                                <span className={`modal__test-mark ${selectedAnswer === index ? 'modal__test-mark--active' : ''}`}></span>
                                <span className="modal__test-text">{choice.text}</span>
                            </label>
                            <div className={`modal__test-explain ${answered ? '' : 'is-hidden'}`}>
                                {choice.explanation}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="modal__test-btns">

                    <a href="" className={`link ${answered ? '' : 'link--hidden'}`}>Помочь фонду</a>

                    <button 
                        className="action-button"
                        disabled={!answered && selectedAnswer === null}
                        onClick={() => {
                            if (!answered) {
                                setAnswered(true)
                                if (typeof onAnswer === 'function') {
                                  onAnswer(selectedAnswer)
                                }
                                return
                            }
                            if (onClose) onClose()
                        }}
                    >
                        {answered ? 'Продолжить' : 'Ответить'}
                    </button>

                </div>
            </div>
        </div>
    </div>
  )
}

export default QuestionModal