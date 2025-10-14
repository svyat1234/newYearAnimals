import React, { useState, useEffect } from 'react'
import './DonationModal.css'
import { donationConfig } from '../../data/donationConfig'
import { pay } from '../../services/cloudPayments';

const DonationModal = ({ isOpen = false, onClose }) => {
  const [isMonthly, setIsMonthly] = useState(true) // опция на месяц (true), разово (false)
  const [selectedAmount, setSelectedAmount] = useState(500) // сумма платежа, меняется в зависимости от того какую кнопку выбрал
  const [customAmount, setCustomAmount] = useState('') // кастомная сумма, если выбрана такая 
  const [name, setName] = useState('') // имя
  const [email, setEmail] = useState('') // почта 
  const [agree, setAgree] = useState(true) // галочка о согласии с  офертой
  const [errors, setErrors] = useState({}) // валидация
  const [isPaying, setIsPaying] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const publicId = import.meta.env.VITE_CP_PUBLIC_ID || ''
  const currency = 'RUB'
  const amount = selectedAmount === 'custom' ? (Number(customAmount) || 0) : selectedAmount
  const recurrent = isMonthly
  const accountId = email.trim()
  const description = 'Пожертвование'
  const paymentData = { name: name.trim(), isMonthly: recurrent }

  // Блокировка скролла body при открытии модала
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    // Очистка при размонтировании компонента
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Валидация формы
  const validateForm = () => {
    const newErrors = {}
    
    if (!name.trim()) {
      newErrors.name = 'Поле "Имя" обязательно для заполнения'
    }
    
    if (!email.trim()) {
      newErrors.email = 'Поле "Электронная почта" обязательно для заполнения'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Введите корректный email адрес'
    }
    
    if (!agree) {
      newErrors.agree = 'Необходимо согласиться с условиями'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      console.log('Форма валидна, можно отправлять:', {
        publicId,
        currency,
        amount,
        description,
        accountId,
        recurrent,
        data: paymentData,
        isMonthly,
        selectedAmount,
        name,
        email,
        agree
      })
      // Здесь будет интеграция с CloudPayments
    }
  }

  const handlePay = async () => {
    // Basic validation
    if (!agree) {
      setPaymentError('Нужно согласиться с условиями оферты.');
      return;
    }
    if (amount <= 0) {
      setPaymentError('Сумма должна быть положительной.');
      return;
    }
    if (!email) {
        setPaymentError('Укажите email.');
        return;
    }


    setIsPaying(true);
    setPaymentError('');
    setPaymentSuccess(false);

    const result = await pay({
      amount: amount,
      email: email,
      data: {
        name: name,
        isRecurrent: isMonthly,
      }
    });

    setIsPaying(false);

    if (result.success) {
      setPaymentSuccess(true);
      // Возможно, закрыть модалку через 2-3 секунды
      // setTimeout(onClose, 3000);
    } else {
      setPaymentError(`Ошибка: ${result.reason || 'Платеж не удался.'}`);
    }
  };

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
        <form className="donation-modal__form-wrapper" onSubmit={handleSubmit}>
          <div className="donation-modal__body">
            {paymentSuccess ? (
              <div className="donation-modal__success">
                <h3>Спасибо!</h3>
                <p>Ваше пожертвование успешно принято.</p>
              </div>
            ) : (
              <>
                <div className="donation-modal__body-content">
                  <h2 className="donation-modal__title">Помочь фонду</h2>
                  <span className="donation-modal__subtitle">Поддержите животных, которые подверглись опасности в зимний период</span>
                  <div className="donation-modal__period-buttons">
                    <button 
                      type="button"
                      className={`donation-modal__period-button ${isMonthly ? 'active' : ''}`}
                      onClick={() => setIsMonthly(true)}
                    >
                      Ежемесячно
                    </button>
                    <button 
                      type="button"
                      className={`donation-modal__period-button ${!isMonthly ? 'active' : ''}`}
                      onClick={() => setIsMonthly(false)}
                    >
                      Один раз
                    </button>

                    <div className={`donation-modal__period-active-background ${isMonthly ? 'monthly' : 'once'}`}></div>
                  </div>
                  <div className="donation-modal__amounts">
                    {donationConfig.amounts.map((amount) => (
                      <button 
                        key={amount.value}
                        type="button" 
                        className={`donation-modal__amount ${selectedAmount === amount.value ? 'donation-modal__amount--active' : ''}`}
                        onClick={() => setSelectedAmount(amount.value)}
                      >
                        {amount.label}
                      </button>
                    ))}
                  </div>

                  <span className="donation-modal__amount-desc">
                    {donationConfig.amounts.find(amount => amount.value === selectedAmount)?.description}
                  </span>

                </div>
                <div className="donation-modal__form">

                  <span className="donation-modal__form-title">Ваши данные</span>
                  
                  <div className="donation-modal__inputs">
                    <div className="donation-modal__input-wrapper">
                      <input 
                        type="text" 
                        placeholder="Имя" 
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value)
                          if (errors.name) setErrors({...errors, name: ''})
                        }}
                        className={errors.name ? 'error' : ''}
                      />
                      {errors.name && <span className="donation-modal__error">{errors.name}</span>}
                    </div>
                    <div className="donation-modal__input-wrapper">
                      <input 
                        type="email" 
                        placeholder="Электронная почта" 
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          if (errors.email) setErrors({...errors, email: ''})
                        }}
                        className={errors.email ? 'error' : ''}
                      />
                      {errors.email && <span className="donation-modal__error">{errors.email}</span>}
                    </div>
                  </div>

                  <div className="donation-modal__agree-wrapper">
                    <label className="donation-modal__agree">
                      <input 
                        type="checkbox" 
                        className="donation-modal__checkbox" 
                        checked={agree}
                        onChange={(e) => {
                          setAgree(e.target.checked)
                          if (errors.agree) setErrors({...errors, agree: ''})
                        }}
                      />
                      <span className={`donation-modal__checkbox-custom ${agree ? 'checked' : ''}`}></span>
                      <span className="donation-modal__agree-text">
                        Я согласен с условиями <a href="#" className="donation-modal__link">Оферты</a>
                      </span>
                    </label>
                    {errors.agree && <span className="donation-modal__error">{errors.agree}</span>}
                  </div> 
                  
                  <div className="donation-modal__form-button-wrapper">
                    <button type="submit" className="donation-modal__form-button action-button" onClick={handlePay} disabled={isPaying}>
                      {isPaying ? 'Обработка...' : 'Помочь'}
                    </button>
                    {paymentError && <p className="donation-modal__error">{paymentError}</p>}
                  </div>
                </div>
              </>
            )}
          </div>
        </form>

      </div>
    </div>
  )
}

export default DonationModal

