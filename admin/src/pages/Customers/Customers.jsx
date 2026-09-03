import React, { useEffect, useState, useMemo } from 'react'
import './Customers.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FiSearch } from 'react-icons/fi'

function Customers({ url }) {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`${url}/api/order/list`)
        if (res.data.success) setOrders(res.data.data)
      } catch (err) {
        toast.error("Failed to load customers")
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [url])

  // ===== Aggregate real customers from order deliveryDetails =====
  const customers = useMemo(() => {
    const map = {}
    orders.forEach(order => {
      const dd = order.deliveryDetails
      if (!dd || !dd.phone) return
      const key = dd.phone
      if (!map[key]) {
        map[key] = {
          id: key,
          name: `${dd.firstName || ''} ${dd.lastName || ''}`.trim() || "Guest",
          phone: dd.phone,
          email: dd.email || "",
          orders: 0,
          totalSpending: 0,
        }
      }
      map[key].orders += 1
      map[key].totalSpending += order.totalAmount || 0
    })
    return Object.values(map).sort((a, b) => b.totalSpending - a.totalSpending)
  }, [orders])

  const filteredCustomers = useMemo(() => {
    return customers.filter(c =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.email.toLowerCase().includes(search.toLowerCase())
    )
  }, [customers, search])

  const getInitials = (name) =>
    name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

  const getCode = (index) => `CU-${(100 + index).toString()}`

  return (
    <div className="customers-cont">
      {/* ===== HEADER ===== */}
      <div className="customers-header">
        <h2>Customers</h2>
        <p className="customers-subtitle">{customers.length} registered guests</p>
      </div>

      {/* ===== SEARCH ===== */}
      <div className="customers-search-wrap">
        <FiSearch className="customers-search-icon" />
        <input
          type="text"
          placeholder="Search name, phone or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* ===== TABLE ===== */}
      <div className="customers-table">
        <div className="customers-row customers-row-title">
          <p>Customer</p>
          <p>Contact</p>
          <p>Orders</p>
          <p>Total spending</p>
          <p>Loyalty</p>
          <p>Tier</p>
          <p></p>
        </div>

        {loading ? (
          <p className="customers-empty">Loading customers...</p>
        ) : filteredCustomers.length ? (
          filteredCustomers.map((c, i) => (
            <div className="customers-row" key={c.id}>
              <div className="customer-cell">
                <div className="customer-avatar">{getInitials(c.name)}</div>
                <div>
                  <p className="customer-name">{c.name}</p>
                  <span className="customer-code">{getCode(i)}</span>
                </div>
              </div>

              <div className="contact-cell">
                <span>{c.phone}</span>
                {c.email && <span className="contact-email">{c.email}</span>}
              </div>

              <p>{c.orders}</p>
              <p className="spending-cell">Rs {c.totalSpending.toLocaleString()}</p>

              {/* No loyalty system in backend yet — not fabricated */}
              <p className="dim-cell">—</p>
              <p className="dim-cell">—</p>

              <button className="view-btn" onClick={() => toast.info(`Customer details view for ${c.name} — build a detail page/route when needed`)}>
                View
              </button>
            </div>
          ))
        ) : (
          <p className="customers-empty">No customers found</p>
        )}
      </div>
    </div>
  )
}

export default Customers