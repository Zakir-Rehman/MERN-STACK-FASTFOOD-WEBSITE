// import React, { useEffect, useState, useContext } from 'react';
// import { StoreContext } from '../../Context/StoreContext';
// import { toast } from 'react-toastify';
// import axios from 'axios';
// import './MyOrders.css';
// import { assets } from '../../assets/frontend_assets/assets';

// function MyOrders() {
//     const { url, token, userId } = useContext(StoreContext);
//     const [data, setData] = useState([]);

//     const fetchOrders = async () => {
//         try {
//             const response = await axios.post(
//                 url + "/api/order/userorders",
//                 { userId },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     }
//                 }
//             );
//             console.log(response)
//             if (response.data.success) {
//                 setData(response.data.data);
//             } else {
//                 toast.error("Failed to fetch orders");
//             }
//         } catch (err) {
//             console.log(err);
//             toast.error("Error fetching orders");
//         }
//     };

//     useEffect(() => {
//         if (token) {
//             fetchOrders();
//         } else {
//             toast.error("Please login to view orders");
//         }
//     }, [token]);

//     return (
//         <div className="my-orders">
//             <h2>My Orders</h2>

//             <div className="container">
//                 {data.length === 0 && <p>No orders found</p>}

//                 {data.map((order) => (
//                     <div className="my-orders-order" key={order._id}>

//                         <img src={assets.parcel_icon} alt="order" />

//                         {/* ITEMS */}
//                         <p className="items">
//                             {order.items.map((item, index) => (
//                                 <span key={index}>
//                                     {item.name} x {item.quantity}
//                                     {index !== order.items.length - 1 && ", "}
//                                 </span>
//                             ))}
//                         </p>

//                         {/* TOTAL */}
//                         <p><b>$ {order.totalAmount}</b></p>

//                         {/* STATUS */}
//                         <p className="status">
//                             <span>&#x25cf;</span> {order.status || "Processing"}
//                         </p>

//                         <button>Track Order</button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default MyOrders;

import React, { useEffect, useState, useContext } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import './MyOrders.css';
import { assets } from '../../assets/frontend_assets/assets';

function MyOrders() {
    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null); // modal state

    // Fetch orders
    const fetchOrders = async () => {
        try {
            const response = await axios.post(
                url +"/api/order/userorders",
                {},
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            console.log(response)
            if (response.data.success) {
                setData(response.data.data);
            } else {
                toast.error(response.data.message || "Failed to fetch orders");
            }
        } catch (err) {
            console.log(err);
            toast.error("Error fetching orders");
        }
    };

    useEffect(() => {
        if (token) fetchOrders();
        else toast.error("Please login to view orders");
    }, [token]);

    // Status color helper
    const statusColor = (status) => {
        switch (status?.toLowerCase()) {
            case "pending": return "orange";
            case "confirmed": return "blue";
            case "delivered": return "green";
            case "cancelled": return "red";
            default: return "gray";
        }
    };

    return (
        <div className="my-orders">
            <h2>My Orders</h2>

            <div className="container">
                {data.length === 0 && <p>No orders found</p>}

                {data.map((order) => (
                    <div className="order-man-div">
                        <div className="title-div">
                            <p>ID</p>
                            <p>Items</p>
                            <p>Quantity</p>
                            <p>Total amount</p>
                            <p>Status</p>
                            <p>Action</p>
                        </div>
                        <div className="order-data">
                            {/* <img src={assets.parcel_icon} alt="" /> */}
                            {/* <span className="order-id"></span> */}
                            <p>Order #{order._id.slice(-6)}</p>
                            <div className="items-div">

                                {order.items.map((item, index) => (
                                    <p key={index}>
                                        {item.name} x {item.quantity}
                                        {index !== order.items.length - 1 && ", "}
                                    </p>
                                ))}
                            </div>
                            <p>{order.items.length}</p>
                            <p>$ {order.totalAmount}</p>
                            {/* <p > {order.status || "Processing"}</p> */}
                            <p>
                                <span
                                    className="status-dot"
                                    style={{ backgroundColor: statusColor(order.status) }}
                                ></span>
                                {order.status || "Processing"}
                            </p>
                            <button
                                className="track-btn"
                                onClick={() => setSelectedOrder(order)}>
                                Track Order
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {selectedOrder && (
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
                                <p><b>Status:</b>
                                      <span
                                        className="status-dot"
                                        style={{ backgroundColor: statusColor(selectedOrder.status) }}
                                    ></span>
                                    {selectedOrder.status || "Processing"}
                                </p>
                            </div>

                            {selectedOrder.deliveryDetails && (
                                <div className="delivery-info">
                                    {selectedOrder.deliveryDetails && (
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
                                        </div>
                                    )}

                                </div>
                            )}
                        </div>

                        <div className="modal-footer">
                            <button className="close-btn" onClick={() => setSelectedOrder(null)}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MyOrders;
