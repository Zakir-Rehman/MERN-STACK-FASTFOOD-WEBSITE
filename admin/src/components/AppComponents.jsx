import React from 'react'
import '../App.css'
import { Navbar, Slidebar } from './AllComponents';
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { CounterOrder, Add, List, Orders } from '../pages';
function AppComponents({ url }) {
    return (
        <>
            <ToastContainer />
            <Navbar />
            <div className="app-content">
                <Slidebar />
                <Routes>
                    <Route path='/add' element={<Add url={url} />} />
                    <Route path='/list' element={<List url={url} />} />
                    <Route path='/orders' element={<Orders url={url} />} />
                    <Route path='/counter-order' element={<CounterOrder url={url} />} />
                </Routes>
            </div>
        </>
    )
}

export default AppComponents
