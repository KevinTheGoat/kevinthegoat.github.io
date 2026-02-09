import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import App from './App'
import { ThemeProvider } from './context/ThemeContext'
import { DemoProvider } from './context/DemoContext'
import './index.css'

// Register GSAP plugins globally (once)
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const rootElement = document.getElementById('root')

const app = (
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <DemoProvider>
            <App />
          </DemoProvider>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
)

// Use hydrate if pre-rendered HTML exists (react-snap), otherwise createRoot
if (rootElement.hasChildNodes()) {
  ReactDOM.hydrateRoot(rootElement, app)
} else {
  ReactDOM.createRoot(rootElement).render(app)
}
