import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home'
import Calculator from './components/Calcultor'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Home/>
      <Calculator/>
      </>
  )
}

export default App
