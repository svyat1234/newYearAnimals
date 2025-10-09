import React, { useState } from 'react'
import './QuestionModal.css'
import { useIsMobile } from '../../hooks/useIsMobile'

const QuestionModal = ({ isOpen = true, onClose, questionData, answered: answeredProp = false, selectedAnswer: selectedAnswerProp = null, onAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(selectedAnswerProp)
  const [answered, setAnswered] = useState(answeredProp)

  const isMobile = useIsMobile(1024)

  React.useEffect(() => {
    setSelectedAnswer(selectedAnswerProp)
    setAnswered(answeredProp)
  }, [selectedAnswerProp, answeredProp, questionData])
  
  if (!questionData) return null; // Don't render if there's no data yet

  const question = questionData;
  // NOTE: The backend now provides a full absolute URL for the image.
  // The 'imageMobile' field is not part of the current backend model.
  const imageUrl = question.image; 

  return (
    <div 
      className={`modal question-modal ${answered ? 'is-answered' : ''}`} 
      role="dialog" 
      aria-modal="true"
      onClick={() => onClose && onClose()}
    >
        <div 
          className="question-modal__content"
          onClick={(e) => e.stopPropagation()}
        >

            <button 
              className="question-modal__close"
              type="button"
              aria-label="Закрыть тест"
              onClick={() => onClose && onClose()}
            ></button>

            {isMobile && (
              <div className="question-modal__heading">
                <span className="question-modal__subtitle">{question.subtitle}</span>
                <h2 className="question-modal__title">{question.title}</h2>
              </div>
            )}

            <div className="question-modal__img-wrap">
                {imageUrl && <img src={imageUrl} alt="" className="question-modal__img" />}
            </div> 

            <div className="question-modal__test">

                {!isMobile && (
                  <div className="question-modal__heading">
                      <span className="question-modal__subtitle">{question.subtitle}</span>
                      <h2 className="question-modal__title">{question.title}</h2>
                  </div>
                )}
                
                {/* Варианты ответов с кастомными чекбоксами */}
                <div className="question-modal__test-questions">
                    {question.choices.map((choice, index) => (
                        <div 
                            key={index} 
                            className={`question-modal__test-question ${answered ? (choice.isCorrect ? 'question-modal__test-question--right' : 'question-modal__test-question--wrong') : ''}`}
                        >
                            <label 
                                className="question-modal__test-option"
                                onClick={() => setSelectedAnswer(index)}
                            >
                                <input 
                                    className="question-modal__test-input" 
                                    type="radio" 
                                    name="question"
                                    checked={selectedAnswer === index}
                                    onChange={() => setSelectedAnswer(index)}
                                />
                                <span className={`question-modal__test-mark ${selectedAnswer === index ? 'question-modal__test-mark--active' : ''}`}></span>
                                <span className="question-modal__test-text">{choice.text}</span>
                            </label>
                            <div className={`question-modal__test-explain ${answered ? '' : 'is-hidden'}`}>
                                {choice.explanation}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="question-modal__test-btns">

                    <a href="" className={`link ${answered ? '' : 'link--hidden'}`}>Помочь фонду</a>

                    <button 
                        className="action-button"
                        disabled={!answered && selectedAnswer === null}
                        onClick={() => {
                            if (!answered) {
                                setAnswered(true)
                                if (typeof onAnswer === 'function') {
                                  const selectedChoice = question.choices[selectedAnswer];
                                  onAnswer(question.id, selectedChoice.id, selectedAnswer);
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