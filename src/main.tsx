import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App'
import { PWAAssetsGenerator } from './app/components/PWAAssetsGenerator'
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

// Check URL for generator mode
const urlParams = new URLSearchParams(window.location.search);
const isGeneratorMode = urlParams.get('generator') === 'true';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {isGeneratorMode ? <PWAAssetsGenerator /> : <App />}
  </React.StrictMode>,
)
