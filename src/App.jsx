import './login.css'
import './register.css'
import './welcome.css'
import { Route, Routes } from 'react-router-dom'
import React from 'react'

import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import WelcomePage from './components/WelcomePage'

function App() {
  return (
    <main className="Login">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="register" element={<RegisterForm />} />
          <Route path="welcome" element={<WelcomePage />} />
        </Routes>
    </main>
  )
}

export default App
