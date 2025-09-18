import React from 'react'

// Final completion modal shown after all questions are done.
// Props suggestion:
// - isOpen: boolean
// - onClose: () => void
// - result: { title, text, image? }
const CompletionModal = ({ isOpen = false, onClose, result }) => {
  if (!isOpen) return null
  return (
    <div className="modal completion-modal" role="dialog" aria-modal="true">
      <div className="modal__backdrop" onClick={onClose} />
      <div className="modal__content">
        <header className="modal__header">
          <h2 className="modal__title">{result?.title ?? 'Поздравляем!'}</h2>
          <button type="button" className="modal__close" onClick={onClose} aria-label="Закрыть" />
        </header>
        <div className="modal__body">
          {result?.image && (
            <img className="modal__image" src={result.image} alt="" />
          )}
          {result?.text && (
            <p className="modal__text">{result.text}</p>
          )}
        </div>
        <footer className="modal__footer">
          {/* Placeholder for future actions */}
        </footer>
      </div>
    </div>
  )
}

export default CompletionModal


