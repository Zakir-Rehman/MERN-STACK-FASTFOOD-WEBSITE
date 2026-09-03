import React, { useEffect, useState, useMemo } from 'react'
import './Dashboard.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { FiShoppingBag, FiDollarSign, FiClock, FiPackage } from 'react-icons/fi'
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar
} from 'recharts'

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const PIE_COLORS = ['#FF4C24', '#22c55e', '#3b82f6', '#f5a623', '#8b5cf6']

function Dashboard({ url, adminName = "Admin" }) {
  const [orders, setOrders] = useState([])
  const [foods, setFoods] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true)
        const [ordersRes, foodsRes] = await Promise.all([
          axios.get(`${url}/api/order/list`),
          axios.get(`${url}/api/food/list`),
        ])
        if (ordersRes.data.success) setOrders(ordersRes.data.data)
        if (foodsRes.data.success) setFoods(foodsRes.data.data)
      } catch (err) {
        toast.error("Failed to load dashboard data")
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [url])

  const isSameDay = (a, b) => new Date(a).toDateString() === new Date(b).toDateString()

  const stats = useMemo(() => {
    const now = new Date()
    const todayOrders = orders.filter(o => isSameDay(o.createdAt, now))
    const todayRevenue = todayOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0)
    const pending = orders.filter(o => o.status === 'pending').length

    // week-over-week comparisons (real, computed)
    const weekAgo = new Date(); weekAgo.setDate(now.getDate() - 7)
    const twoWeeksAgo = new Date(); twoWeeksAgo.setDate(now.getDate() - 14)

    const thisWeekOrders = orders.filter(o => new Date(o.createdAt) >= weekAgo)
    const lastWeekOrders = orders.filter(o => new Date(o.createdAt) >= twoWeeksAgo && new Date(o.createdAt) < weekAgo)

    const pctChange = (curr, prev) => {
      if (prev === 0) return curr > 0 ? 100 : 0
      return (((curr - prev) / prev) * 100).toFixed(1)
    }

    return {
      totalOrders: orders.length,
      todayRevenue,
      pending,
      totalFoods: foods.length,
      ordersChange: pctChange(thisWeekOrders.length, lastWeekOrders.length),
      revenueChange: pctChange(
        thisWeekOrders.reduce((s, o) => s + o.totalAmount, 0),
        lastWeekOrders.reduce((s, o) => s + o.totalAmount, 0)
      ),
    }
  }, [orders, foods])

  // ===== Sales trend: last 7 days revenue =====
  const salesTrend = useMemo(() => {
    const days = []
    for (let i = 6; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      const dayOrders = orders.filter(o => isSameDay(o.createdAt, d))
      days.push({
        name: DAY_LABELS[d.getDay()],
        revenue: dayOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0),
      })
    }
    return days
  }, [orders])

  // ===== Weekly order count per day =====
  const weeklyOrders = useMemo(() => {
    const days = []
    for (let i = 6; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      const count = orders.filter(o => isSameDay(o.createdAt, d)).length
      days.push({ name: DAY_LABELS[d.getDay()], orders: count })
    }
    return days
  }, [orders])

  // ===== Popular items (this week) =====
  const popularItems = useMemo(() => {
    const weekAgo = new Date(); weekAgo.setDate(new Date().getDate() - 7)
    const thisWeek = orders.filter(o => new Date(o.createdAt) >= weekAgo)
    const counts = {}
    thisWeek.forEach(o => {
      o.items.forEach(item => {
        counts[item.name] = (counts[item.name] || 0) + item.quantity
      })
    })
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1])
    const total = sorted.reduce((s, [, v]) => s + v, 0)
    const top = sorted.slice(0, 4).map(([name, val]) => ({
      name, value: val, pct: total ? ((val / total) * 100).toFixed(0) : 0
    }))
    const othersVal = sorted.slice(4).reduce((s, [, v]) => s + v, 0)
    if (othersVal > 0) {
      top.push({ name: "Others", value: othersVal, pct: total ? ((othersVal / total) * 100).toFixed(0) : 0 })
    }
    return top
  }, [orders])

  const recentOrders = useMemo(() => {
    return [...orders]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 4)
  }, [orders])

  const statusBadgeClass = {
    pending: 'badge-pending', confirmed: 'badge-preparing', preparing: 'badge-preparing',
    ready: 'badge-ready', 'out-for-delivery': 'badge-ready',
    delivered: 'badge-delivered', cancelled: 'badge-cancelled',
  }

  if (loading) {
    return <div className="dash-loading">Loading dashboard...</div>
  }

  return (
    <div className="dashboard-cont">
      {/* ===== HEADER ===== */}
      <div className="dash-header">
        <div>
          <h2>Good morning, {adminName} 👋</h2>
          <p className="dash-subtitle">Here's what's happening today.</p>
        </div>
        <Link to="/counter-order" className="open-counter-btn">
          <FiShoppingBag /> Open Counter
        </Link>
      </div>

      {/* ===== STAT CARDS ===== */}
      <div className="dash-stats-row">
        <div className="dash-stat-card">
          <div className="dash-stat-top">
            <div className="dash-stat-icon orders"><FiShoppingBag /></div>
            <span className={`stat-change ${stats.ordersChange >= 0 ? 'up' : 'down'}`}>
              {stats.ordersChange >= 0 ? '↗' : '↘'} {Math.abs(stats.ordersChange)}%
            </span>
          </div>
          <h3>{stats.totalOrders}</h3>
          <p>Total Orders</p>
        </div>

        <div className="dash-stat-card">
          <div className="dash-stat-top">
            <div className="dash-stat-icon revenue"><FiDollarSign /></div>
            <span className={`stat-change ${stats.revenueChange >= 0 ? 'up' : 'down'}`}>
              {stats.revenueChange >= 0 ? '↗' : '↘'} {Math.abs(stats.revenueChange)}%
            </span>
          </div>
          <h3>Rs {stats.todayRevenue.toLocaleString()}</h3>
          <p>Today's Revenue</p>
        </div>

        <div className="dash-stat-card">
          <div className="dash-stat-top">
            <div className="dash-stat-icon pending"><FiClock /></div>
          </div>
          <h3>{stats.pending}</h3>
          <p>Pending Orders</p>
        </div>

        <div className="dash-stat-card">
          <div className="dash-stat-top">
            <div className="dash-stat-icon foods"><FiPackage /></div>
          </div>
          <h3>{stats.totalFoods}</h3>
          <p>Total Foods</p>
        </div>
      </div>

      {/* ===== CHARTS ROW 1 ===== */}
      <div className="dash-charts-row">
        <div className="dash-card chart-card">
          <div className="dash-card-head">
            <h3>Sales Overview</h3>
            <p>Revenue trend for the last 7 days</p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={salesTrend}>
              <defs>
                <linearGradient id="revGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF4C24" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#FF4C24" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} />
              <YAxis axisLine={false} tickLine={false} fontSize={12} />
              <Tooltip formatter={(v) => [`Rs ${v}`, 'Revenue']} />
              <Area type="monotone" dataKey="revenue" stroke="#FF4C24" strokeWidth={2} fill="url(#revGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="dash-card chart-card">
          <div className="dash-card-head">
            <h3>Popular Items</h3>
            <p>Share of orders this week</p>
          </div>
          {popularItems.length ? (
            <div className="pie-wrap">
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={popularItems} dataKey="value" innerRadius={45} outerRadius={70} paddingAngle={2}>
                    {popularItems.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="pie-legend">
                {popularItems.map((item, i) => (
                  <div className="pie-legend-item" key={item.name}>
                    <span className="dot" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }}></span>
                    <span className="legend-name">{item.name}</span>
                    <span className="legend-pct">{item.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="dash-empty">No orders this week yet</p>
          )}
        </div>
      </div>

      {/* ===== CHARTS ROW 2 ===== */}
      <div className="dash-charts-row">
        <div className="dash-card chart-card">
          <div className="dash-card-head">
            <h3>Weekly Orders</h3>
            <p>Orders per day</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyOrders}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} />
              <YAxis axisLine={false} tickLine={false} fontSize={12} />
              <Tooltip />
              <Bar dataKey="orders" fill="#FF4C24" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="dash-card">
          <div className="dash-card-head-row">
            <div>
              <h3>Recent Orders</h3>
              <p>Latest activity from all channels</p>
            </div>
            <Link to="/orders" className="view-all-link">View all →</Link>
          </div>

          <div className="recent-orders-list">
            {recentOrders.length ? recentOrders.map(order => (
              <div className="recent-order-row" key={order._id}>
                <div>
                  <p className="ro-id">#{order._id.slice(-6).toUpperCase()} - {order.deliveryDetails?.firstName || "Guest"}</p>
                  <span className="ro-meta">
                    {order.items.length} items · {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className="ro-right">
                  <span className="ro-amount">Rs {order.totalAmount}</span>
                  <span className={`ro-badge ${statusBadgeClass[order.status] || ''}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            )) : (
              <p className="dash-empty">No orders yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard