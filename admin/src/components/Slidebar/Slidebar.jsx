// import React from 'react'
// import './Slidebar.css'
// import { FaRegListAlt } from "react-icons/fa";
// import { CiPizza } from "react-icons/ci";
// import { CiCirclePlus } from "react-icons/ci";
// import { assets } from '../../assets/admin_assets/assets';
// import { NavLink } from 'react-router-dom';
// import { FaBoxArchive } from "react-icons/fa6";
// function Slidebar() {
//     return (
//         <div className='slidebar'>
//             <div className="sliderbar-options">
//                 <NavLink to='/add' className="sliderbar-option">
//                     <CiCirclePlus className="opt-logo" />
//                     <h2>Add Items</h2>
//                 </NavLink>
//                 <NavLink to='/list' className="sliderbar-option">
//                     <FaRegListAlt className="opt-logo" />
//                     <h2>List Items</h2>
//                 </NavLink>
//                 <NavLink to='/orders' className="sliderbar-option">
//                     <CiPizza className="opt-logo" />
//                     <h2>Orders</h2>
//                 </NavLink>
//                 <NavLink to='/counter-order' className="sliderbar-option">
//                     <FaBoxArchive className="opt-logo" />
//                     <h2>Counter</h2>
//                 </NavLink>
//             </div>
//         </div>
//     )
// }

// export default Slidebar

import React, { useState } from 'react'
import './Slidebar.css'
import { NavLink } from 'react-router-dom'
import {
  FiGrid,
  FiUsers,
  FiTag,
  FiBarChart2,
  FiSettings,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi'
import { CiCirclePlus } from "react-icons/ci"
import { PiForkKnife } from "react-icons/pi"
import { LuClipboardList } from "react-icons/lu"
import { FaBoxArchive } from "react-icons/fa6"
import { GiChefToque } from "react-icons/gi"

 

function Slidebar({ branchName = "Gulberg Branch", pendingOrdersCount = 0 } ) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className={`slidebar ${collapsed ? 'collapsed' : ''}`}>
      {/* <div className="slidebar-brand">
        <div className="brand-logo">
          <GiChefToque />
        </div>
        {!collapsed && (
          <div className="brand-text">
            <h1>Food Junction</h1>
            <span>{branchName}</span>
          </div>
        )}
      </div> */}

      <div className="sliderbar-options">
        {!collapsed && <p className="section-label">MANAGEMENT</p>}

        <NavLink to='/dashbaord' className={({ isActive }) => `sliderbar-option ${isActive ? 'active' : ''}`}>
          <FiGrid className="opt-logo" />
          {!collapsed && <h2>Dashboard</h2>}
        </NavLink>

        <NavLink to='/add' className={({ isActive }) => `sliderbar-option ${isActive ? 'active' : ''}`}>
          <CiCirclePlus className="opt-logo" />
          {!collapsed && <h2>Add Item</h2>}
        </NavLink>

        <NavLink to='/list' className={({ isActive }) => `sliderbar-option ${isActive ? 'active' : ''}`}>
          <PiForkKnife className="opt-logo" />
          {!collapsed && <h2>Food List</h2>}
        </NavLink>

        <NavLink to='/orders' className={({ isActive }) => `sliderbar-option ${isActive ? 'active' : ''}`}>
          <LuClipboardList className="opt-logo" />
          {!collapsed && <h2>Orders</h2>}
          {!collapsed && pendingOrdersCount > 0 && (
            <span className="badge">{pendingOrdersCount}</span>
          )}
        </NavLink>

        <NavLink to='/counter-order' className={({ isActive }) => `sliderbar-option ${isActive ? 'active' : ''}`}>
          <FaBoxArchive className="opt-logo" />
          {!collapsed && <h2>Counter POS</h2>}
        </NavLink>

        <NavLink to='/customers' className={({ isActive }) => `sliderbar-option ${isActive ? 'active' : ''}`}>
          <FiUsers className="opt-logo" />
          {!collapsed && <h2>Customers</h2>}
        </NavLink>

        <NavLink to='/categories' className={({ isActive }) => `sliderbar-option ${isActive ? 'active' : ''}`}>
          <FiTag className="opt-logo" />
          {!collapsed && <h2>Categories</h2>}
        </NavLink>

        <NavLink to='/reports' className={({ isActive }) => `sliderbar-option ${isActive ? 'active' : ''}`}>
          <FiBarChart2 className="opt-logo" />
          {!collapsed && <h2>Reports</h2>}
        </NavLink>

        <NavLink to='/settings' className={({ isActive }) => `sliderbar-option ${isActive ? 'active' : ''}`}>
          <FiSettings className="opt-logo" />
          {!collapsed && <h2>Settings</h2>}
        </NavLink>
      </div>

      {/* {!collapsed && (
        <div className="pro-card">
          <h3>Junction Pro</h3>
          <p>Unlock multi-branch reporting and staff payroll.</p>
          <button className="upgrade-btn">Upgrade plan</button>
        </div>
      )} */}

      <div className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
        {!collapsed && <span>Collapse</span>}
      </div>
    </div>
  )
}

export default Slidebar