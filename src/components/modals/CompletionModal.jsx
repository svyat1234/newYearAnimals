import React, { useState, useEffect } from 'react'
import './CompletionModal.css'
import { useIsMobile } from '../../hooks/useIsMobile'

const staticSecondTabText = 'Каждый ваш вклад помогает нам заботиться о животных, попавших в беду. Ваша поддержка дает им шанс на новую, счастливую жизнь.'

const CompletionModal = ({ isOpen = false, onClose, completionData }) => {
  const isMobile = useIsMobile(1024);
  const [activeTab, setActiveTab] = useState(0); // 0: first, 1: second

  useEffect(() => {
    if (isOpen) {
      setActiveTab(0); // Reset to the first tab whenever the modal is opened
    }
  }, [isOpen]);

  if (!isOpen || !completionData) return null;

  const content = completionData;
  const closeButtonColor = '#7A9AEA'; // Using a default color now

  // Determine which background to use based on the active tab and device type
  const getBackgroundImage = () => {
    const isFirstTab = activeTab === 0;
    
    // For the first tab
    if (isFirstTab) {
      return isMobile 
        ? (content.backgroundMobileSlide1 || content.backgroundDesktopSlide1) 
        : (content.backgroundDesktopSlide1 || content.backgroundMobileSlide1);
    }
    
    // For the second tab
    return isMobile
      ? (content.backgroundMobileSlide2 || content.backgroundDesktopSlide2)
      : (content.backgroundDesktopSlide2 || content.backgroundMobileSlide2);
  };

  const panelBackground = `url(${getBackgroundImage()})`;

  return (
    <div className="modal completion-modal" role="dialog" aria-modal="true" onMouseDown={onClose}>
      <div className="completion-modal__content" onMouseDown={(e) => e.stopPropagation()}>
        {/* Close button sits over blue panel area per spec */}

        {/* Tabs */}
        <div className="completion-modal__tabs">
          <div
            className={`completion-modal__tab ${activeTab === 0 ? 'is-active' : ''}`}
            onClick={() => setActiveTab(0)}
          />
          <div
            className={`completion-modal__tab ${activeTab === 1 ? 'is-active' : ''}`}
            onClick={() => setActiveTab(1)}
          />
        </div>

        {/* Blue panel with background and text content */}
        <div className="completion-modal__panel" style={{ backgroundImage: getBackgroundImage() ? panelBackground : 'none' }}>
          {/* Panel inner spacing */}
          <div className="completion-modal__panel-inner">
            {/* First tab example layout (title, description, result, buttons) */}
            
            {activeTab === 0 && (
              <div className="completion-modal__panel-body">
                <button 
                  type="button" 
                  className="completion-modal__close" 
                  aria-label="Закрыть" 
                  onMouseDown={onClose}
                  style={{ backgroundColor: closeButtonColor }}
                />

                <h2 className="completion-modal__title-line">
                  <span className="completion-modal__title-prefix">Ты:</span>
                  <span className="completion-modal__title-main">{content.title}</span>
                </h2>

                <div className="completion-modal__result-wrap">
                  {/* --- Это тестовая редакция --- */} 
                  {content.foregroundImage && activeTab === 0 && (
                    <div className="completion-modal__img-wrap">
                      <img src={content.foregroundImage} alt="" className="completion-modal__img" />
                    </div>
                  )}
                            {/* ---  --- */} 
                  <div className="completion-modal__result-content">
                    <p className="completion-modal__desc">{content.description}</p>
                    <div className="completion-modal__result">
                      <div className="completion-modal__result-title">Твой результат</div>
                      <div className="completion-modal__result-value">{content.resultText}</div>
                    </div>
                    <div className="completion-modal__actions">
                      <button type="button" className="completion-modal__restart">Пройти еще раз</button>
                      <button type="button" className="action-button">Поделиться</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Second tab layout (simple text + action) */}
            {activeTab === 1 && (
              <div className="completion-modal__panel-body completion-modal__panel-body--left">

                <button 
                  type="button" 
                  className="completion-modal__close" 
                  aria-label="Закрыть" 
                  onMouseDown={onClose}
                  style={{ backgroundColor: closeButtonColor }}
                />

                <p
                  className="completion-modal__desc"
                  dangerouslySetInnerHTML={{ __html: staticSecondTabText }}
                />

                <div className="completion-modal__about-actions">
                  <p className="completion-modal__secondary">А ещё хвостики всегда будут рады просто твоей поддержке</p>
                  <button type="button" className="action-button">Помочь фонду</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompletionModal