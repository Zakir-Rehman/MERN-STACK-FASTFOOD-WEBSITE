// import React from 'react'
// import './Navbar.css'
// import { assets } from '../../assets/admin_assets/assets'
// import { Strings } from '../../../res/strings/Strings'
// import { globalStrings } from '../../../../globalRes/strings'
// function Navbar() {
//   return (
//     <div className='navbar'>
//       <div className="navbar-left">
//         <h1>{globalStrings.appName ? globalStrings.appName : Strings.appName}</h1>
//         <p>{Strings.userType}</p>
//       </div>
//       <div className="navbar-right">
//         <img src={assets.profile_image} alt="Profile" />
//       </div>
//     </div>
//   )
// }

// export default Navbar
import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/admin_assets/assets'
import { FiSearch, FiBell, FiSettings } from 'react-icons/fi'
import { GiChefToque } from 'react-icons/gi'

function Navbar({
  branchName = "Gulberg Branch",
  adminName = "Admin",
  adminRole = "Owner",
  hasNotification = false,
  onSearch,
}) {
  const [query, setQuery] = useState('')

  const handleChange = (e) => {
    setQuery(e.target.value)
    onSearch?.(e.target.value)
  }

  const initials = adminName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className='navbar'>
      <div className="navbar-left">
        <div className="brand-mini-logo">
          <GiChefToque />
        </div>
        <div className="brand-mini-text">
          <h1>Food Junction</h1>
          <p>{branchName}</p>
        </div>
      </div>

      <div className="navbar-search">
        <FiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search orders, foods, customers..."
          value={query}
          onChange={handleChange}
        />
        <span className="search-kbd">⌘K</span>
      </div>

      <div className="navbar-right">
        <div className="icon-btn">
          <FiBell />
          {hasNotification && <span className="dot" />}
        </div>
        <div className="icon-btn">
          <FiSettings />
        </div>
        <div className="profile">
          <div className="avatar">{initials}</div>
          <div className="profile-text">
            <p className="name">{adminName}</p>
            <span className="role">{adminRole}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar