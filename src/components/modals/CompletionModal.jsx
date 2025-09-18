import React, { useState } from 'react'
import './CompletionModal.css'
import { completionData } from '../../data/modals/results'

// Completion modal markup only (no business logic)
// Props:
// - isOpen: boolean
// - onClose: () => void
// - data?: completionData override (optional)
const CompletionModal = ({ isOpen = false, onClose, data }) => {
  if (!isOpen) return null

  const content = data || completionData
  const [activeTab, setActiveTab] = useState(0) // 0: first, 1: second
  const tab = content.tabs[activeTab]

  return (
    <div className="modal completion-modal" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="completion-modal__content" onClick={(e) => e.stopPropagation()}>
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
        <div className="completion-modal__panel" style={{ backgroundImage: `url(${tab.background})` }}>
          {/* Panel inner spacing */}
          <div className="completion-modal__panel-inner">
            {/* First tab example layout (title, description, result, buttons) */}
            
            {activeTab === 0 && (
              <div className="completion-modal__panel-body">
                <button type="button" className="completion-modal__close" aria-label="Закрыть" onClick={onClose} />

                <h2 className="completion-modal__title-line">
                  <span className="completion-modal__title-prefix">Ты:</span>
                  <span className="completion-modal__title-main">{content.title}</span>
                </h2>

                <div className="completion-modal__result-wrap">
                  
                  <div className="completion-modal__result-content">
                    <p className="completion-modal__desc">{content.description}</p>
                    <div className="completion-modal__result">
                      <div className="completion-modal__result-title">Твой результат</div>
                      <div className="completion-modal__result-value">2/9</div>
                    </div>
                    <div className="completion-modal__actions">
                      <button type="button" className="completion-modal__restart">Пройти еще раз</button>
                      <button type="button" className="action-button">{tab.buttonText}</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Second tab layout (simple text + action) */}
            {activeTab === 1 && (
              <div className="completion-modal__panel-body completion-modal__panel-body--left">

                <button type="button" className="completion-modal__close" aria-label="Закрыть" onClick={onClose} />

                <p className="completion-modal__desc">{tab.text}</p>

                <div className="completion-modal__about-actions">
                  <p className="completion-modal__secondary">А ещё хвостики всегда будут рады просто твоей поддержке</p>
                  <div className="completion-modal__actions">
                    <button type="button" className="action-button">{tab.buttonText}</button>
                  </div>
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