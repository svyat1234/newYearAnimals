import React from 'react'
import './NotFound.css'
import NotFoundImage from '../../assets/images/404.svg'
import NotFoundLogo from '../../assets/images/logo.svg'

// 404 page component - will be controlled by backend
// Props:
// - title?: string (optional custom title)
// - message?: string (optional custom message)
// - onBackHome?: () => void (optional back to home handler)
const NotFound = ({ title = '404', message = '«Привет… я, кажется, заблудилась. Ты не поможешь мне вернуться на главную?»' }) => {
  return (
    <div className="not-found">

      <div className="not-found__container">

      <a href="" className="not-found__logo">
        <img src={NotFoundLogo} alt="" className="not-found__logo-img" />
      </a>

        {/* Main content */}
        <div className="not-found__content">
          <h1 className="not-found__title">{title}</h1>
          <p className="not-found__message">{message}</p>
          
          {/* Action buttons */}
          <div className="not-found__actions">
            <a href="" 
              className="not-found__back-btn action-button"
            >
              На главную
            </a>
          </div>
        </div>
      </div>

      <img src={NotFoundImage} alt="вы заблудились" className="not-found__image" />
    </div>
  )
}

export default NotFound
