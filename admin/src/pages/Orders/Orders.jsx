// import React from 'react'
// import './Orders.css'
// import { assets } from '../../assets/admin_assets/assets'
// import { useState } from 'react'
// import axios from "axios"
// import { toast } from 'react-toastify'
// import { useEffect } from 'react'
// function Orders({ url }) {
//   const [data, setData] = useState([])
//   const [selectedOrder, setSelectedOrder] = useState(null); // modal state
//   const [showReceipt, setShowReceipt] = useState(false);
//   //filter
//   const [selectedDate, setSelectedDate] = useState("");
//   const [selectedMonth, setSelectedMonth] = useState("");
//   const [selectedYear, setSelectedYear] = useState("");
//   const fetchAllOrders = async () => {
//     const response = await axios.get(url + "/api/order/list")
//     if (response.data.success) {
//       setData(response.data.data)
//       console.log(response.data.data)
//     } else {
//       toast.error("Fetching Error")
//     }
//   }
//   // const statusHandler = async (event, orderId) => {
//   //   // console.log(orderId,event)
//   //   const response = await axios.post(url + "/api/order/status", {
//   //     orderId,
//   //     status: event.target.value
//   //   })
//   //   if (response.data.success) {
//   //     await fetchAllOrders()
//   //   }
//   // }
//   const statusHandler = async (event, orderId) => {
//     try {
//       const response = await axios.post(url + "/api/order/status", {
//         orderId,
//         status: event.target.value // ✅ correct
//       });
//       if (response.data.success) {
//         toast.success("Status updated successfully");
//         await fetchAllOrders(); // refresh orders after update
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to update status");
//     }
//   };
//   const filteredData = data.filter(order => {
//     const orderDate = new Date(order.createdAt);

//     if (selectedDate) {
//       const d = new Date(selectedDate);
//       return orderDate.toDateString() === d.toDateString();
//     }

//     if (selectedMonth && selectedYear) {
//       return (
//         orderDate.getMonth() + 1 === parseInt(selectedMonth) &&
//         orderDate.getFullYear() === parseInt(selectedYear)
//       );
//     }

//     if (selectedYear) {
//       return orderDate.getFullYear() === parseInt(selectedYear);
//     }

//     return true;
//   });
//   useEffect(() => {
//     fetchAllOrders()
//   }, [])

//   return (
//     //  <div className="order add">
//     //  <h3>Order Page</h3>
//     //  <div className="order-k">
//     //   {orders.map((order,index)=>{
//     //     <div className="order-item" key={index}>
//     //       <img src={assets.parcel_icon} alt="icon" />
//     //       <div>
//     //         <p className='order-item-food'>
//     //           {order.items.map((item,index)=>{
//     //             if(index===order.items.length-1){
//     //               return item.name + " x " + item.quantity
//     //             }else{
//     //               item.name+" x "+ item.quantity
//     //             }
//     //           })}
//     //         </p>
//     //       </div>
//     //     </div>
//     //   })}
//     //  </div>
//     // </div>
//     <div className="my-orders">
//       <h2>My Orders</h2>

//       <div className="date-filters">

//         <div className="filter-item">
//           <label>Date</label>
//           <input type="date" value={selectedDate}
//             onChange={e => { setSelectedDate(e.target.value); setSelectedMonth(""); setSelectedYear(""); }}
//           />
//         </div>

//         <div className="filter-item">
//           <label>Month</label>
//           <select value={selectedMonth} onChange={e => { setSelectedMonth(e.target.value); setSelectedDate(""); }}>
//             <option value="">-- Month --</option>
//             {["January", "February", "March", "April", "May", "June",
//               "July", "August", "September", "October", "November", "December"]
//               .map((m, i) => <option key={i} value={i + 1}>{m}</option>)}
//           </select>
//         </div>

//         <div className="filter-item">
//           <label>Year</label>
//           <select value={selectedYear} onChange={e => { setSelectedYear(e.target.value); setSelectedDate(""); }}>
//             <option value="">-- Year --</option>
//             {[2024, 2025, 2026].map(y => <option key={y} value={y}>{y}</option>)}
//           </select>
//         </div>

//         <button className="clear-btn" onClick={() => { setSelectedDate(""); setSelectedMonth(""); setSelectedYear(""); }}>
//           Clear
//         </button>

//       </div>

//       <div className="container">
//         {/* {data.length === 0 &&
//           <div className="loader-container">
//             <div class="loader"></div>
//           </div>
//         } */}
//         {filteredData.length === 0 &&
//           <p className="no-order">No orders found</p>
//         }
//         {filteredData.length > 0 &&
//           (<div className="order-man-div">
//             <div className="title-div">
//               <p>ID</p>
//               <p>Items</p>
//               <p>Quantity</p>
//               <p>Total amount</p>
//               <p>Status</p>
//               <p>Action</p>
//             </div>

//             {filteredData.map((order) => (
//               <div className="order-data">
//                 {/* <img src={assets.parcel_icon} alt="" /> */}
//                 {/* <span className="order-id"></span> */}
//                 <p>#{order._id.slice(-6)}</p>
//                 <div className="items-div">

//                   {order.items.map((item, index) => (
//                     <p key={index}>
//                       {item.name} x {item.quantity}
//                       {index !== order.items.length - 1 && ", "}
//                     </p>
//                   ))}
//                 </div>
//                 <p>{order.items.length}</p>
//                 <p>$ {order.totalAmount}</p>
//                 {/* <p > {order.status || "Processing"}</p> */}
//                 <select id="status" name="status" value={order.status} onChange={(event) => statusHandler(event, order._id)} >
//                   <option value="pending">Pending</option>
//                   <option value="confirmed">Confirmed</option>
//                   <option value="preparing">Preparing / Cooking</option>
//                   <option value="ready">Ready for Pickup / Ready</option>
//                   <option value="out-for-delivery">Out for Delivery</option>
//                   <option value="delivered">Delivered</option>
//                   <option value="cancelled">Cancelled</option>
//                 </select>

//                 <button
//                   className="track-btn"
//                   onClick={() => setSelectedOrder(order)}>
//                   Details
//                 </button>
//               </div>
//             ))}
//           </div>)
//         }
//       </div>

//       {/* Modal */}
//       {selectedOrder && (
//         <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <div className="modal-header">
//               <img src={assets.parcel_icon} alt="order" className="modal-icon" />
//               <h3>Order Details</h3>
//             </div>

//             <div className="modal-body">
//               <h4>Items:</h4>
//               <ul>
//                 {selectedOrder.items.map((item, i) => (
//                   <li key={i}>
//                     <span className="item-name">{item.name}</span>
//                     <span className="item-qty">x {item.quantity}</span>
//                     <span className="item-price">Rs {item.price * item.quantity}</span>
//                   </li>
//                 ))}
//               </ul>

//               <div className="order-info">
//                 <p><b>Total Items:</b> {selectedOrder.items.length}</p>
//                 <p><b>Total Amount:</b> Rs {selectedOrder.totalAmount}</p>
//                 <p>Status:
//                   {selectedOrder.status || "Processing"}
//                 </p>
//               </div>

//               {selectedOrder.deliveryDetails && (
//                 <div className="delivery-info">
//                   {selectedOrder.deliveryDetails && (
//                     <div className="delivery-table-container">
//                       <h4>Delivery Info:</h4>
//                       <table className="delivery-table">
//                         <thead>
//                           <tr>
//                             <th>Full Name</th>
//                             <th>Email</th>
//                             <th>Phone</th>
//                             <th>Location</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           <tr>
//                             <td>{selectedOrder.deliveryDetails.firstName} {selectedOrder.deliveryDetails.lastName}</td>
//                             <td>{selectedOrder.deliveryDetails.email}</td>
//                             <td>{selectedOrder.deliveryDetails.phone}</td>
//                             <td>{selectedOrder.deliveryDetails.city}, {selectedOrder.deliveryDetails.street}</td>
//                           </tr>
//                         </tbody>
//                       </table>
//                       <label className='desc-label' htmlFor="desc">Description

//                         <textarea name="desc" className='desc-textarea' value={selectedOrder.deliveryDetails.description}></textarea>
//                       </label>
//                     </div>
//                   )}

//                 </div>
//               )}
//             </div>

//             <div className="modal-footer">
//               <button
//                 className="close-btn"
//                 onClick={() => setShowReceipt(true)}
//               >
//                 Delivery Receipt
//               </button>
//               <button className="close-btn" onClick={() => setSelectedOrder(null)}>Close</button>
//             </div>
//           </div>
//         </div>
//       )}
//       {showReceipt && selectedOrder && (
//         <div className="modal-overlay" onClick={() => setShowReceipt(false)}>
//           <div className="receipt-modal" onClick={(e) => e.stopPropagation()}>

//             <h2 className="receipt-title">Food Delivery Receipt</h2>

//             <div className="receipt-meta">
//               <p><b>Receipt No:</b> #{selectedOrder._id.slice(-8)}</p>
//               <p><b>Order Date:</b> {new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
//               <p><b>Delivery Time:</b> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
//             </div>


//             <h3>Customer Details</h3>
//             <p><b>Name:</b> {selectedOrder.deliveryDetails.firstName} {selectedOrder.deliveryDetails.lastName}</p>
//             <p><b>Phone:</b> {selectedOrder.deliveryDetails.phone}</p>
//             <p><b>Address:</b> {selectedOrder.deliveryDetails.city}, {selectedOrder.deliveryDetails.street}</p>

//             <div className="order-detail">
//               <h3>Order Details</h3>

//               <table className="receipt-table">
//                 <thead>
//                   <tr>
//                     <th>Item Name</th>
//                     <th>Qty</th>
//                     <th>Price</th>
//                     <th>Total</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {selectedOrder.items.map((item, i) => (
//                     <tr key={i}>
//                       <td>{item.name}</td>
//                       <td>{item.quantity}</td>
//                       <td>Rs {item.price}</td>
//                       <td>Rs {item.price * item.quantity}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>

//               <div className="receipt-summary">
//                 <p><b>Subtotal:</b> Rs {selectedOrder.totalAmount - 100}</p>
//                 <p><b>Delivery Fee:</b> Rs 100</p>
//                 <p className="grand-total">
//                   <b>Total Amount:</b> Rs {selectedOrder.totalAmount}
//                 </p>
//               </div>
//             </div>
//             <div className="receipt-actions no-print">
//               <button onClick={() => window.print()} className="print-btn">
//                 Print Receipt
//               </button>
//               <button onClick={() => setShowReceipt(false)} className="close-btn">
//                 Close
//               </button>
//             </div>

//           </div>
//         </div>
//       )}

//     </div>
//   )
// }

// export default Orders


import React, { useEffect, useState, useMemo } from 'react'
import './Orders.css'
import { assets } from '../../assets/admin_assets/assets'
import axios from "axios"
import { toast } from 'react-toastify'
import { FiClock, FiPackage, FiCheckCircle, FiTruck, FiXCircle, FiSearch } from 'react-icons/fi'
import { createPortal } from 'react-dom'
function Orders({ url }) {
  const [data, setData] = useState([])
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [showReceipt, setShowReceipt] = useState(false)

  // filters
  const [search, setSearch] = useState("")
  const [rangeTab, setRangeTab] = useState("all"); // today | week | month | all
  const [selectedDate, setSelectedDate] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")

  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list")
    if (response.data.success) {
      setData(response.data.data)
    } else {
      toast.error("Fetching Error")
    }
  }

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(url + "/api/order/status", {
        orderId,
        status: event.target.value
      })
      if (response.data.success) {
        toast.success("Status updated successfully")
        await fetchAllOrders()
      }
    } catch (error) {
      toast.error("Failed to update status")
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [])

  // ===== STATS (real counts from fetched data) =====
  const stats = useMemo(() => {
    const count = (s) => data.filter(o => o.status === s).length
    return {
      pending: count("pending"),
      preparing: count("preparing"),
      ready: count("ready"),
      delivered: count("delivered"),
      cancelled: count("cancelled"),
    }
  }, [data])

  // ===== DATE RANGE + FILTERS =====
  const isInRange = (dateStr) => {
    const orderDate = new Date(dateStr)
    const now = new Date()

    if (selectedDate) {
      const d = new Date(selectedDate)
      return orderDate.toDateString() === d.toDateString()
    }

    if (rangeTab === "today") {
      return orderDate.toDateString() === now.toDateString()
    }
    if (rangeTab === "week") {
      const weekAgo = new Date()
      weekAgo.setDate(now.getDate() - 7)
      return orderDate >= weekAgo && orderDate <= now
    }
    if (rangeTab === "month") {
      return orderDate.getMonth() === now.getMonth() &&
        orderDate.getFullYear() === now.getFullYear()
    }
    return true // all
  }

  const filteredData = useMemo(() => {
    return data.filter(order => {
      const matchesRange = isInRange(order.createdAt)
      const matchesStatus = statusFilter === "All" || order.status === statusFilter
      const name = order.deliveryDetails
        ? `${order.deliveryDetails.firstName} ${order.deliveryDetails.lastName}`
        : ""
      const matchesSearch =
        !search ||
        order._id.toLowerCase().includes(search.toLowerCase()) ||
        name.toLowerCase().includes(search.toLowerCase()) ||
        (order.deliveryDetails?.phone || "").includes(search)

      return matchesRange && matchesStatus && matchesSearch
    })
  }, [data, search, rangeTab, selectedDate, statusFilter])

  const statusLabel = {
    pending: "Pending",
    confirmed: "Confirmed",
    preparing: "Preparing",
    ready: "Ready",
    "out-for-delivery": "Out for delivery",
    delivered: "Delivered",
    cancelled: "Cancelled",
  }

  return (
    <div className="my-orders">
      {/* ===== HEADER ===== */}
      <div className="orders-header">
        <div>
          <h2>Orders</h2>
          <p className="orders-subtitle">Manage and fulfil every incoming order.</p>
        </div>
      </div>

      {/* ===== STAT CARDS ===== */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-icon pending"><FiClock /></div>
          <div><h3>{stats.pending}</h3><p>Pending</p></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon preparing"><FiPackage /></div>
          <div><h3>{stats.preparing}</h3><p>Preparing</p></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon ready"><FiCheckCircle /></div>
          <div><h3>{stats.ready}</h3><p>Ready</p></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon delivered"><FiTruck /></div>
          <div><h3>{stats.delivered}</h3><p>Delivered</p></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon cancelled"><FiXCircle /></div>
          <div><h3>{stats.cancelled}</h3><p>Cancelled</p></div>
        </div>
      </div>

      {/* ===== TOOLBAR ===== */}
      <div className="orders-toolbar">
        <div className="orders-search-wrap">
          <FiSearch className="orders-search-icon" />
          <input
            type="text"
            placeholder="Search order ID or customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="range-tabs">
          {["today", "week", "month", "all"].map(r => (
            <button
              key={r}
              className={`range-tab ${rangeTab === r ? "active" : ""}`}
              onClick={() => { setRangeTab(r); setSelectedDate(""); }}
            >
              {r === "all" ? "All" : r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="orders-date"
        />

        <select
          className="orders-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="preparing">Preparing</option>
          <option value="ready">Ready</option>
          <option value="out-for-delivery">Out for delivery</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* ===== TABLE ===== */}
      <div className="container">
        {filteredData.length === 0 && <p className="no-order">No orders found</p>}

        {filteredData.length > 0 && (
          <div className="order-man-div">
            <div className="title-div">
              <p>Order</p>
              <p>Customer</p>
              <p>Items</p>
              <p>Amount</p>
              <p>Status</p>
              <p>Action</p>
            </div>

            {filteredData.map((order) => (
              <div className="order-data" key={order._id}>
                <div className="order-id-cell">
                  <p className="order-id">#{order._id.slice(-6).toUpperCase()}</p>
                  <span className="order-time">
                    {new Date(order.createdAt).toLocaleString(undefined, {
                      day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
                    })}
                  </span>
                </div>

                <div className="customer-cell">
                  {order.deliveryDetails ? (
                    <>
                      <p className="customer-name">
                        {order.deliveryDetails.firstName} {order.deliveryDetails.lastName}
                      </p>
                      <span className="customer-phone">{order.deliveryDetails.phone}</span>
                    </>
                  ) : "POS"}
                </div>

                <div className="items-div">
                  {order.items.map((item, index) => (
                    <p key={index}>
                      {item.name} x{item.quantity}
                      {index !== order.items.length - 1 && ","}
                    </p>
                  ))}
                </div>

                <p className="amount-cell">Rs {order.totalAmount}</p>

                <select
                  id="status"
                  className={`status-select status-${order.status}`}
                  value={order.status}
                  onChange={(event) => statusHandler(event, order._id)}
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="preparing">Preparing / Cooking</option>
                  <option value="ready">Ready for Pickup / Ready</option>
                  <option value="out-for-delivery">Out for Delivery</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                <button className="track-btn" onClick={() => setSelectedOrder(order)}>
                  Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ===== Details Modal ===== */}
      {/* {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <img src={assets.parcel_icon} alt="order" className="modal-icon" />
              <h3>Order Details</h3>
            </div>

            <div className="modal-body">
              <h4>Items:</h4>
              <ul>
                {selectedOrder.items.map((item, i) => (
                  <li key={i}>
                    <span className="item-name">{item.name}</span>
                    <span className="item-qty">x {item.quantity}</span>
                    <span className="item-price">Rs {item.price * item.quantity}</span>
                  </li>
                ))}
              </ul>

              <div className="order-info">
                <p><b>Total Items:</b> {selectedOrder.items.length}</p>
                <p><b>Total Amount:</b> Rs {selectedOrder.totalAmount}</p>
                <p><b>Status:</b> {statusLabel[selectedOrder.status] || selectedOrder.status}</p>
              </div>

              {selectedOrder.deliveryDetails && (
                <div className="delivery-info">
                  <div className="delivery-table-container">
                    <h4>Delivery Info:</h4>
                    <table className="delivery-table">
                      <thead>
                        <tr>
                          <th>Full Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Location</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{selectedOrder.deliveryDetails.firstName} {selectedOrder.deliveryDetails.lastName}</td>
                          <td>{selectedOrder.deliveryDetails.email}</td>
                          <td>{selectedOrder.deliveryDetails.phone}</td>
                          <td>{selectedOrder.deliveryDetails.city}, {selectedOrder.deliveryDetails.street}</td>
                        </tr>
                      </tbody>
                    </table>
                    <label className='desc-label' htmlFor="desc">Description
                      <textarea name="desc" className='desc-textarea' value={selectedOrder.deliveryDetails.description} readOnly />
                    </label>
                  </div>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button className="close-btn" onClick={() => setShowReceipt(true)}>Delivery Receipt</button>
              <button className="close-btn" onClick={() => setSelectedOrder(null)}>Close</button>
            </div>
          </div>
        </div>
      )} */}
      {/* ===== Details Modal ===== */}
      {selectedOrder && createPortal(
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <img src={assets.parcel_icon} alt="order" className="modal-icon" />
              <h3>Order Details</h3>
            </div>

            <div className="modal-body">
              <h4>Items:</h4>
              <ul>
                {selectedOrder.items.map((item, i) => (
                  <li key={i}>
                    <span className="item-name">{item.name}</span>
                    <span className="item-qty">x {item.quantity}</span>
                    <span className="item-price">Rs {item.price * item.quantity}</span>
                  </li>
                ))}
              </ul>

              <div className="order-info">
                <p><b>Total Items:</b> {selectedOrder.items.length}</p>
                <p><b>Total Amount:</b> Rs {selectedOrder.totalAmount}</p>
                <p><b>Status:</b> {statusLabel[selectedOrder.status] || selectedOrder.status}</p>
              </div>

              {selectedOrder.deliveryDetails && (
                <div className="delivery-info">
                  <div className="delivery-table-container">
                    <h4>Delivery Info:</h4>
                    <table className="delivery-table">
                      <thead>
                        <tr>
                          <th>Full Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Location</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{selectedOrder.deliveryDetails.firstName} {selectedOrder.deliveryDetails.lastName}</td>
                          <td>{selectedOrder.deliveryDetails.email}</td>
                          <td>{selectedOrder.deliveryDetails.phone}</td>
                          <td>{selectedOrder.deliveryDetails.city}, {selectedOrder.deliveryDetails.street}</td>
                        </tr>
                      </tbody>
                    </table>
                    <label className='desc-label' htmlFor="desc">Description
                      <textarea name="desc" className='desc-textarea' value={selectedOrder.deliveryDetails.description} readOnly />
                    </label>
                  </div>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button className="close-btn" onClick={() => setShowReceipt(true)}>Delivery Receipt</button>
              <button className="close-btn" onClick={() => setSelectedOrder(null)}>Close</button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* ===== Receipt Modal ===== */}
      {showReceipt && selectedOrder && createPortal(
        <div className="modal-overlay" onClick={() => setShowReceipt(false)}>
          <div className="receipt-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="receipt-title">Food Delivery Receipt</h2>
            <div className="receipt-meta">
              <p><b>Receipt No:</b> #{selectedOrder._id.slice(-8)}</p>
              <p><b>Order Date:</b> {new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
              <p><b>Delivery Time:</b> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
            </div>

            <h3>Customer Details</h3>
            <p><b>Name:</b> {selectedOrder.deliveryDetails.firstName} {selectedOrder.deliveryDetails.lastName}</p>
            <p><b>Phone:</b> {selectedOrder.deliveryDetails.phone}</p>
            <p><b>Address:</b> {selectedOrder.deliveryDetails.city}, {selectedOrder.deliveryDetails.street}</p>

            <div className="order-detail">
              <h3>Order Details</h3>
              <table className="receipt-table">
                <thead>
                  <tr><th>Item Name</th><th>Qty</th><th>Price</th><th>Total</th></tr>
                </thead>
                <tbody>
                  {selectedOrder.items.map((item, i) => (
                    <tr key={i}>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>Rs {item.price}</td>
                      <td>Rs {item.price * item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="receipt-summary">
                <p><b>Subtotal:</b> Rs {selectedOrder.totalAmount - 100}</p>
                <p><b>Delivery Fee:</b> Rs 100</p>
                <p className="grand-total"><b>Total Amount:</b> Rs {selectedOrder.totalAmount}</p>
              </div>
            </div>

            <div className="receipt-actions no-print">
              <button onClick={() => window.print()} className="print-btn">Print Receipt</button>
              <button onClick={() => setShowReceipt(false)} className="close-btn">Close</button>
            </div>
          </div>
        </div>,
        document.body
      )}
      {/* ===== Receipt Modal ===== */}
      {/* {showReceipt && selectedOrder && (
        <div className="modal-overlay" onClick={() => setShowReceipt(false)}>
          <div className="receipt-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="receipt-title">Food Delivery Receipt</h2>
            <div className="receipt-meta">
              <p><b>Receipt No:</b> #{selectedOrder._id.slice(-8)}</p>
              <p><b>Order Date:</b> {new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
              <p><b>Delivery Time:</b> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
            </div>

            <h3>Customer Details</h3>
            <p><b>Name:</b> {selectedOrder.deliveryDetails.firstName} {selectedOrder.deliveryDetails.lastName}</p>
            <p><b>Phone:</b> {selectedOrder.deliveryDetails.phone}</p>
            <p><b>Address:</b> {selectedOrder.deliveryDetails.city}, {selectedOrder.deliveryDetails.street}</p>

            <div className="order-detail">
              <h3>Order Details</h3>
              <table className="receipt-table">
                <thead>
                  <tr><th>Item Name</th><th>Qty</th><th>Price</th><th>Total</th></tr>
                </thead>
                <tbody>
                  {selectedOrder.items.map((item, i) => (
                    <tr key={i}>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>Rs {item.price}</td>
                      <td>Rs {item.price * item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="receipt-summary">
                <p><b>Subtotal:</b> Rs {selectedOrder.totalAmount - 100}</p>
                <p><b>Delivery Fee:</b> Rs 100</p>
                <p className="grand-total"><b>Total Amount:</b> Rs {selectedOrder.totalAmount}</p>
              </div>
            </div>

            <div className="receipt-actions no-print">
              <button onClick={() => window.print()} className="print-btn">Print Receipt</button>
              <button onClick={() => setShowReceipt(false)} className="close-btn">Close</button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  )
}

export default Orders