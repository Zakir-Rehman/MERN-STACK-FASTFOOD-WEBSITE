import React from 'react'
import '../App.css'
import { Navbar, Slidebar } from './AllComponents';
import { Route, Routes, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { CounterOrder, Add, List, Orders, Dashboard, Customers, Categories, Settings } from '../pages'; 
function AppComponents({ url }) {
    return (
        <>
            <ToastContainer />
            <Navbar />
            <div className="app-content">
                <Slidebar />
                <Routes>
                    <Route path='/' element={<Navigate to="/dashoard" replace />} />
                    <Route path='/dashbaord' element={<Dashboard url={url} adminName="Ahmed" />} />
                    <Route path='/customers' element={<Customers url={url} />} />
                    <Route path='/categories' element={<Categories url={url} />} />
                    <Route path='/add' element={<Add url={url} />} />
                    <Route path='/list' element={<List url={url} />} />
                    <Route path='/orders' element={<Orders url={url} />} />
                    <Route path='/counter-order' element={<CounterOrder url={url} />} />
                    <Route path='/settings' element={<Settings url={url} />} />
                </Routes>
            </div>
        </>
    )
}

export default AppComponents
