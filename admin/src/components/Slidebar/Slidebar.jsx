import React from 'react'
import './Slidebar.css'
import { FaRegListAlt } from "react-icons/fa";
import { CiPizza } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import { assets } from '../../assets/admin_assets/assets';
import { NavLink } from 'react-router-dom';
import { FaBoxArchive } from "react-icons/fa6";
function Slidebar() {
    return (
        <div className='slidebar'>
            <div className="sliderbar-options">
                <NavLink to='/add' className="sliderbar-option">
                    <CiCirclePlus className="opt-logo" />
                    <h2>Add Items</h2>
                </NavLink>
                <NavLink to='/list' className="sliderbar-option">
                    <FaRegListAlt className="opt-logo" />
                    <h2>List Items</h2>
                </NavLink>
                <NavLink to='/orders' className="sliderbar-option">
                    <CiPizza className="opt-logo" />
                    <h2>Orders</h2>
                </NavLink>
                <NavLink to='/counter-order' className="sliderbar-option">
                    <FaBoxArchive className="opt-logo" />
                    <h2>Counter</h2>
                </NavLink>
            </div>
        </div>
    )
}

export default Slidebar
