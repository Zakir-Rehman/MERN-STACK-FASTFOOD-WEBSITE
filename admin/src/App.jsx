import React from 'react'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import AppComponents from './components/AppComponents'
function App() {
  return (
    <div className='app'>
      <AppComponents url="http://localhost:4000" />
    </div>
  )
}

export default App
