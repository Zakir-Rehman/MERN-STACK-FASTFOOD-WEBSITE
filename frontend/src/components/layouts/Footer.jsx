import React from 'react'
import './Footer.css'
import { assets } from '../../assets/frontend_assets/assets'
function Footer() {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    {/* <img src={assets.logo} alt="" /> */}
                    <h1>Food Junction</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima rerum iusto vitae neque, obcaecati nihil ipsum molestias itaque illum assumenda vero at eaque veritatis porro sapiente commodi ea sint sunt!</p>
                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ol>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ol>
                </div>
                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ol>
                        <li>+92 3150239091</li>
                        <li>zakirmala099@gmail.com</li>
                    </ol>
                </div>
            </div>
            <hr />
            <p className="footer-copyright">
                Copyright 2025 Ⓒ FoodJunction.com - Developed by Zakir Rehman Mala - All Right Reserved. 
            </p>
        </div>
    )
}

export default Footer
