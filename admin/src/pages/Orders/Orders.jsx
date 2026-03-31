import React from 'react'
import './Orders.css'
import { assets } from '../../assets/admin_assets/assets'
import { useState } from 'react'
import axios from "axios"
import { toast } from 'react-toastify'
import { useEffect } from 'react'
function Orders({ url }) {
  const [data, setData] = useState([])
  const [selectedOrder, setSelectedOrder] = useState(null); // modal state
  const [showReceipt, setShowReceipt] = useState(false);
  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list")
    if (response.data.success) {
      setData(response.data.data)
      console.log(response.data.data)
    } else {
      toast.error("Fetching Error")
    }
  }
  // const statusHandler = async (event, orderId) => {
  //   // console.log(orderId,event)
  //   const response = await axios.post(url + "/api/order/status", {
  //     orderId,
  //     status: event.target.value
  //   })
  //   if (response.data.success) {
  //     await fetchAllOrders()
  //   }
  // }
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(url + "/api/order/status", {
        orderId,
        status: event.target.value // ✅ correct
      });
      if (response.data.success) {
        toast.success("Status updated successfully");
        await fetchAllOrders(); // refresh orders after update
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    fetchAllOrders()
  }, [])

  return (
    //  <div className="order add">
    //  <h3>Order Page</h3>
    //  <div className="order-k">
    //   {orders.map((order,index)=>{
    //     <div className="order-item" key={index}>
    //       <img src={assets.parcel_icon} alt="icon" />
    //       <div>
    //         <p className='order-item-food'>
    //           {order.items.map((item,index)=>{
    //             if(index===order.items.length-1){
    //               return item.name + " x " + item.quantity
    //             }else{
    //               item.name+" x "+ item.quantity
    //             }
    //           })}
    //         </p>
    //       </div>
    //     </div>
    //   })}
    //  </div>
    // </div>
    <div className="my-orders">
      <h2>My Orders</h2>

      <div className="container">
        {data.length === 0 &&
          <div className="loader-container">
            <div class="loader"></div>
          </div>
        }
        <div className="order-man-div">
          <div className="title-div">
            <p>ID</p>
            <p>Items</p>
            <p>Quantity</p>
            <p>Total amount</p>
            <p>Status</p>
            <p>Action</p>
          </div>

          {data.map((order) => (
            <div className="order-data">
              {/* <img src={assets.parcel_icon} alt="" /> */}
              {/* <span className="order-id"></span> */}
              <p>#{order._id.slice(-6)}</p>
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
              <select id="status" name="status" value={order.status} onChange={(event) => statusHandler(event, order._id)} >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="preparing">Preparing / Cooking</option>
                <option value="ready">Ready for Pickup / Ready</option>
                <option value="out-for-delivery">Out for Delivery</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>

              <button
                className="track-btn"
                onClick={() => setSelectedOrder(order)}>
                Details
              </button>
            </div>
          ))}
        </div>
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
                <p>Status:
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
                      <label className='desc-label' htmlFor="desc">Description

                        <textarea name="desc" className='desc-textarea' value={selectedOrder.deliveryDetails.description}></textarea>
                      </label>
                    </div>
                  )}

                </div>
              )}
            </div>

            <div className="modal-footer">
              <button
                className="close-btn"
                onClick={() => setShowReceipt(true)}
              >
                Delivery Receipt
              </button>
              <button className="close-btn" onClick={() => setSelectedOrder(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
      {showReceipt && selectedOrder && (
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
                  <tr>
                    <th>Item Name</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
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
                <p className="grand-total">
                  <b>Total Amount:</b> Rs {selectedOrder.totalAmount}
                </p>
              </div>
            </div>
            <div className="receipt-actions no-print">
              <button onClick={() => window.print()} className="print-btn">
                Print Receipt
              </button>
              <button onClick={() => setShowReceipt(false)} className="close-btn">
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}

export default Orders
