import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { setImageQueueConcurrency } from './utils/imageQueue'

setImageQueueConcurrency(4)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Register service worker only in production; in dev ensure old SW/caches are cleared
if (import.meta.env?.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const swUrl = '/sw.js'
    navigator.serviceWorker.register(swUrl).catch((err) => {
      console.error('SW registration failed:', err)
    })
  })
} else if ('serviceWorker' in navigator) {
  // Dev: unregister any existing service workers and clear caches to avoid white screen
  navigator.serviceWorker.getRegistrations?.().then((regs) => {
    regs.forEach((reg) => reg.unregister().catch(() => {}))
  }).catch(() => {})
  if (window.caches?.keys) {
    caches.keys().then((keys) => keys.forEach((k) => caches.delete(k))).catch(() => {})
  }
}
