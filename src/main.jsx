import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode> 
    <BrowserRouter basenamed="/reactForm">
      <App />
    </BrowserRouter>
  </StrictMode>,
)
