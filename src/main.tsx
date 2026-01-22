import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App'
import './styles/index.css'
import { registerSW } from 'virtual:pwa-register'

// Register the service worker
registerSW({
  onNeedRefresh() {
    // Automatically update the app when new version is available
    console.log('New content available, refreshing...')
  },
  onOfflineReady() {
    console.log('App ready to work offline')
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
