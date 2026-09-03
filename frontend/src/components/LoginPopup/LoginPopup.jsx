import React, { useContext, useEffect, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/frontend_assets/assets'
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { RiErrorWarningLine } from "react-icons/ri";
function LoginPopup({ setShowLogin }) {
    const {  setToken, token, currState, setCurrState } = useContext(StoreContext)
    const url = "https://fastfood-backend-v1.vercel.app";
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })
    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData(data => ({ ...data, [name]: value }))

    }
    // const onLogin = async (e) => {
    //     e.preventDefault()
    //     let newUrl = url
    //     if (currState === "Login") {
    //         newUrl += "/api/user/login"
    //     } else {
    //         newUrl += "/api/user/register"
    //     }
    //     const responce = await axios.post(newUrl, data)
    //     if (responce.data.success) {
    //         setToken(responce.data.token)
    //         localStorage.setItem("token", responce.data.token)
    //         toast.success(responce.data.message)
    //         setShowLogin(false)
    //     } else {
    //         toast.success(responce.data.message)
    //     }
    // }
    // useEffect(()=>{
    //     console.log(data)
    // },[data])

    const onLogin = async (e) => {
        e.preventDefault()
        let newUrl = url

        if (currState === "Login") {
            newUrl += "/api/user/login"
        } else {
            newUrl += "/api/user/register"
        }

        try {
            const responce = await axios.post(newUrl, data)

            if (responce.data.success) {
                setToken(responce.data.token)
                localStorage.setItem("token", responce.data.token)
                toast.success(currState === "Login" ? "Welcome back! 👋" : "Account created! Welcome 🎉", {
                    style: { background: "#fff", color: "#000" }
                })
                // Fields empty karo
                setData({ name: "", email: "", password: "" })
                setShowLogin(false)

                // Signup ke baad direct login
                if (currState === "Sign Up") {
                    setCurrState("Login")
                }

            } else {

                toast.error(responce.data.message || "Invalid credentials", {
                    icon: <RiErrorWarningLine  color="red" size={20} />,
                    style: { background: "#fff", color: "#000" }
                })
            }

        } catch (err) {
            toast.error("Something went wrong. Try again.", {
                style: { background: "#ef4444", color: "#fff" }
            })
        }
    }
    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className='login-popup-container' >
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Login" ? <></> : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' />}

                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' />
                    <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' />
                </div>
                <button className='bg-[#FF548e]' type='submit' >{currState === "Sign Up" ? "Create account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privect policy </p>
                </div>
                {currState === "Login"
                    ? <p>Create a new account ? <span onClick={() => setCurrState("Sign Up")} >Click here</span> </p>
                    : <p>Alredy have an account ? <span onClick={() => setCurrState("Login")} >Login here</span> </p>
                }

            </form>
        </div>
    )
}

export default LoginPopup
