import React, { useState } from 'react'
import Navbar from './components/layouts/navbar'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/layouts/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import { ToastContainer } from 'react-toastify';
import MyOrders from './pages/MyOrders/MyOrders'
function App() {
  const [showLogin,setShowLogin]=useState(false)
  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin} />:<></>}
      <div className='app'>
        <ToastContainer/>
        <div className='header-nav'>
          <Navbar setShowLogin={setShowLogin} />
        </div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/myorders' element={<MyOrders />} />
        </Routes>

      </div>
      <footer>
        <Footer />
      </footer>
    </>

  )
}

export default App
