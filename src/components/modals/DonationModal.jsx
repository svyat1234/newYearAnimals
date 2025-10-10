import React, { useState } from 'react'
import './DonationModal.css'

const DonationModal = ({ isOpen = false, onClose }) => {
  const [isMonthly, setIsMonthly] = useState(false)
  const [selectedAmount, setSelectedAmount] = useState(null)
  const [customAmount, setCustomAmount] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [agree, setAgree] = useState(false)

  if (!isOpen) return null

  return (
    <div className="modal donation-modal" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="donation-modal__content" onClick={(e) => e.stopPropagation()}>
        
        {/* Кнопка закрытия */}
        <button 
          className="donation-modal__close" 
          type="button" 
          aria-label="Закрыть" 
          onClick={onClose}
        />

        {/* Здесь ваша вёрстка */}
        <div className="donation-modal__body">
          <h2>Помочь фонду</h2>
          <span className="donation-modal__subtitle">Поддержите животных, которые подверглись опасности в зимний период</span>
          <div className="donation-modal__period-buttons">
            <button className="donation-modal__period-button">Ежемесячно</button>
            <button className="donation-modal__period-button">Один раз</button>
          </div>
          <div className="donation-modal__amounts">
            <button className="donation-modal__amount">500 ₽</button>
            <button className="donation-modal__amount">1 500 ₽</button>
            <button className="donation-modal__amount">3 000 ₽</button>
            <button className="donation-modal__amount">5 000 ₽</button>
            <button className="donation-modal__amount">10 000 ₽</button>
            <button className="donation-modal__amount">Другая сумма</button>
          </div>

          <div className="donation-modal__form">
            
            <div className="donation-modal__inputs">
              <input type="text" placeholder="Имя" />
              <input type="email" placeholder="Email" />
            </div>

            <label className="donation-modal__agree">
              <input type="checkbox" className="donation-modal__checkbox" />
              <span className="donation-modal__checkbox-custom"></span>
              <span className="donation-modal__agree-text">
                Я согласен с условиями <a href="#" className="donation-modal__link">Оферты</a>
              </span>
            </label> 
            
            <button className="donation-modal__form-button">Помочь</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default DonationModal

