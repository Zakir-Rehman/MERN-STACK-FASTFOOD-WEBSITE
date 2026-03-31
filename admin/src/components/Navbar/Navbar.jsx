import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/admin_assets/assets'
function Navbar() {
  return (
    <div className='navbar'>
      <div className="navbar-left">
        <h1>Food Junction</h1>
        <p>Admin Panel</p>
      </div>
      <div className="navbar-right">
        <img src={assets.profile_image} alt="Profile" />
      </div>
    </div>
  )
}

export default Navbar
