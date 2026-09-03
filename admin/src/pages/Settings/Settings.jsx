    import React, { useState } from 'react'
import './Settings.css'
import {
  FiHome, FiClock, FiPercent, FiPrinter, FiBell, FiCreditCard,
  FiUsers, FiDatabase, FiDroplet, FiChevronLeft
} from 'react-icons/fi'
import { toast } from 'react-toastify'
// import axios from 'axios' // jab backend route ban jaye tab uncomment karke use karo

const TABS = [
  { key: 'restaurant', label: 'Restaurant', icon: <FiHome /> },
  { key: 'hours', label: 'Business Hours', icon: <FiClock /> },
  { key: 'taxes', label: 'Taxes', icon: <FiPercent /> },
  { key: 'printer', label: 'Printer', icon: <FiPrinter /> },
  { key: 'notifications', label: 'Notifications', icon: <FiBell /> },
  { key: 'payments', label: 'Payments', icon: <FiCreditCard /> },
  { key: 'users', label: 'Users & Roles', icon: <FiUsers /> },
  { key: 'backup', label: 'Backup', icon: <FiDatabase /> },
  { key: 'theme', label: 'Theme', icon: <FiDroplet /> },
]

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

function Settings({ url }) {
  const [activeTab, setActiveTab] = useState('restaurant')
  const [saving, setSaving] = useState(false)

  // ===== RESTAURANT =====
  const [restaurant, setRestaurant] = useState({
    name: "", branch: "", phone: "", email: "", address: ""
  })

  // ===== BUSINESS HOURS =====
  const [hours, setHours] = useState(
    DAYS.map((day) => ({ day, open: "11:00", close: "23:30", enabled: true }))
  )

  // ===== TAXES =====
  const [taxes, setTaxes] = useState({
    salesTax: "", serviceCharge: "", pricesIncludeTax: false
  })

  // ===== PRINTER =====
  const [printer, setPrinter] = useState({
    printerName: "", paperSize: "80mm", autoPrint: true
  })

  // ===== NOTIFICATIONS =====
  const [notifications, setNotifications] = useState({
    newOrder: true, lowStock: true, dailySummary: true, refundRequests: false
  })

  // ===== PAYMENTS =====
  const [payments, setPayments] = useState({
    cash: true, card: true, jazzcash: true, easypaisa: true,
    bankTransfer: false, splitPayment: false
  })

  // ===== USERS & ROLES (real data placeholder — backend route nahi hai abhi) =====
  const [users, setUsers] = useState([]) // fetchUsers() se real data yahan aayega

  // ===== THEME =====
  const theme = [
    { name: "Primary", color: "#FF4C24" },
    { name: "Secondary", color: "#0f1729" },
    { name: "Success", color: "#1a9e5c" },
    { name: "Warning", color: "#e0a721" },
    { name: "Danger", color: "#e02c1f" },
  ]

  const handleHourChange = (index, field, value) => {
    setHours(prev => prev.map((h, i) => i === index ? { ...h, [field]: value } : h))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      // Jab backend route ready ho, yahan real call lagana:
      // await axios.post(`${url}/api/settings/update`, {
      //   restaurant, hours, taxes, printer, notifications, payments
      // })
      await new Promise((res) => setTimeout(res, 500)) // placeholder delay
      toast.success("Changes saved locally (backend route not connected yet)")
    } catch (err) {
      toast.error("Failed to save settings")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="settings-cont">
      {/* ===== HEADER ===== */}
      <div className="settings-header">
        <div>
          <h2>Settings</h2>
          <p className="settings-subtitle">Configure how Food Junction runs day to day.</p>
        </div>
        <button className="save-changes-btn" onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save changes"}
        </button>
      </div>

      <div className="settings-body">
        {/* ===== LEFT NAV ===== */}
        <div className="settings-nav">
          {TABS.map(tab => (
            <button
              key={tab.key}
              className={`settings-nav-item ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              <span className="nav-icon">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* ===== RIGHT CONTENT ===== */}
        <div className="settings-content">

          {/* ---- RESTAURANT ---- */}
          {activeTab === 'restaurant' && (
            <div className="settings-card">
              <div className="settings-card-head">
                <h3>Restaurant Information</h3>
                <p>Shown on receipts and invoices</p>
              </div>

              <div className="settings-row-2">
                <div className="settings-field">
                  <label>Restaurant name</label>
                  <input
                    value={restaurant.name}
                    onChange={(e) => setRestaurant({ ...restaurant, name: e.target.value })}
                    placeholder="e.g. Food Junction"
                  />
                </div>
                <div className="settings-field">
                  <label>Branch</label>
                  <input
                    value={restaurant.branch}
                    onChange={(e) => setRestaurant({ ...restaurant, branch: e.target.value })}
                    placeholder="e.g. Gulberg"
                  />
                </div>
              </div>

              <div className="settings-row-2">
                <div className="settings-field">
                  <label>Phone</label>
                  <input
                    value={restaurant.phone}
                    onChange={(e) => setRestaurant({ ...restaurant, phone: e.target.value })}
                    placeholder="+92 300 1234567"
                  />
                </div>
                <div className="settings-field">
                  <label>Email</label>
                  <input
                    value={restaurant.email}
                    onChange={(e) => setRestaurant({ ...restaurant, email: e.target.value })}
                    placeholder="hello@yourrestaurant.pk"
                  />
                </div>
              </div>

              <div className="settings-field">
                <label>Address</label>
                <textarea
                  rows={2}
                  value={restaurant.address}
                  onChange={(e) => setRestaurant({ ...restaurant, address: e.target.value })}
                  placeholder="Street, area, city"
                />
              </div>
            </div>
          )}

          {/* ---- BUSINESS HOURS ---- */}
          {activeTab === 'hours' && (
            <div className="settings-card">
              <div className="settings-card-head">
                <h3>Business hours</h3>
                <p>Opening times per day</p>
              </div>

              <div className="hours-table">
                {hours.map((h, i) => (
                  <div className="hours-row" key={h.day}>
                    <p className="hours-day">{h.day}</p>
                    <div className="hours-time-inputs">
                      <input
                        type="time"
                        value={h.open}
                        onChange={(e) => handleHourChange(i, 'open', e.target.value)}
                      />
                      <span>—</span>
                      <input
                        type="time"
                        value={h.close}
                        onChange={(e) => handleHourChange(i, 'close', e.target.value)}
                      />
                    </div>
                    <label className="toggle">
                      <input
                        type="checkbox"
                        checked={h.enabled}
                        onChange={(e) => handleHourChange(i, 'enabled', e.target.checked)}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ---- TAXES ---- */}
          {activeTab === 'taxes' && (
            <div className="settings-card">
              <div className="settings-card-head">
                <h3>Taxes</h3>
                <p>Applied at checkout</p>
              </div>

              <div className="settings-row-2">
                <div className="settings-field">
                  <label>Sales tax (%)</label>
                  <input
                    type="number"
                    value={taxes.salesTax}
                    onChange={(e) => setTaxes({ ...taxes, salesTax: e.target.value })}
                    placeholder="0"
                  />
                </div>
                <div className="settings-field">
                  <label>Service charge (%)</label>
                  <input
                    type="number"
                    value={taxes.serviceCharge}
                    onChange={(e) => setTaxes({ ...taxes, serviceCharge: e.target.value })}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="toggle-row-box">
                <div>
                  <p className="toggle-title">Prices include tax</p>
                  <span className="toggle-desc">Show tax-inclusive menu prices.</span>
                </div>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={taxes.pricesIncludeTax}
                    onChange={(e) => setTaxes({ ...taxes, pricesIncludeTax: e.target.checked })}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          )}

          {/* ---- PRINTER ---- */}
          {activeTab === 'printer' && (
            <div className="settings-card">
              <div className="settings-card-head">
                <h3>Printer</h3>
                <p>Receipt and kitchen ticket printing</p>
              </div>

              <div className="settings-field">
                <label>Printer name</label>
                <input
                  value={printer.printerName}
                  onChange={(e) => setPrinter({ ...printer, printerName: e.target.value })}
                  placeholder="e.g. Epson TM-T82"
                />
              </div>

              <div className="settings-field">
                <label>Paper size</label>
                <select
                  value={printer.paperSize}
                  onChange={(e) => setPrinter({ ...printer, paperSize: e.target.value })}
                >
                  <option value="58mm">58mm</option>
                  <option value="80mm">80mm</option>
                  <option value="A4">A4</option>
                </select>
              </div>

              <div className="toggle-row-box">
                <div>
                  <p className="toggle-title">Auto-print on new order</p>
                  <span className="toggle-desc">Print kitchen ticket automatically.</span>
                </div>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={printer.autoPrint}
                    onChange={(e) => setPrinter({ ...printer, autoPrint: e.target.checked })}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          )}

          {/* ---- NOTIFICATIONS ---- */}
          {activeTab === 'notifications' && (
            <div className="settings-card">
              <div className="settings-card-head">
                <h3>Notifications</h3>
                <p>What we alert you about</p>
              </div>

              {[
                { key: 'newOrder', title: 'New online order', desc: 'Push + sound alert at the counter' },
                { key: 'lowStock', title: 'Low stock', desc: 'When an item drops below 5 units' },
                { key: 'dailySummary', title: 'Daily summary', desc: 'Emailed at closing time' },
                { key: 'refundRequests', title: 'Refund requests', desc: 'Notify owner immediately' },
              ].map(item => (
                <div className="toggle-row-box" key={item.key}>
                  <div>
                    <p className="toggle-title">{item.title}</p>
                    <span className="toggle-desc">{item.desc}</span>
                  </div>
                  <label className="toggle">
                    <input
                      type="checkbox"
                      checked={notifications[item.key]}
                      onChange={(e) => setNotifications({ ...notifications, [item.key]: e.target.checked })}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              ))}
            </div>
          )}

          {/* ---- PAYMENTS ---- */}
          {activeTab === 'payments' && (
            <div className="settings-card">
              <div className="settings-card-head">
                <h3>Payment methods</h3>
                <p>Enabled at the counter and online</p>
              </div>

              <div className="payments-grid">
                {[
                  { key: 'cash', label: 'Cash' },
                  { key: 'card', label: 'Card' },
                  { key: 'jazzcash', label: 'JazzCash' },
                  { key: 'easypaisa', label: 'EasyPaisa' },
                  { key: 'bankTransfer', label: 'Bank transfer' },
                  { key: 'splitPayment', label: 'Split payment' },
                ].map(pm => (
                  <div className="payment-item" key={pm.key}>
                    <p>{pm.label}</p>
                    <label className="toggle">
                      <input
                        type="checkbox"
                        checked={payments[pm.key]}
                        onChange={(e) => setPayments({ ...payments, [pm.key]: e.target.checked })}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ---- USERS & ROLES ---- */}
          {activeTab === 'users' && (
            <div className="settings-card">
              <div className="settings-card-head">
                <h3>Users & roles</h3>
                <p>Who can access what</p>
              </div>

              <div className="users-table">
                <div className="users-row users-row-title">
                  <p>Name</p>
                  <p>Role</p>
                  <p>Permissions</p>
                  <p></p>
                </div>

                {users.length ? users.map((u) => (
                  <div className="users-row" key={u._id}>
                    <p className="user-name">{u.name}</p>
                    <p>{u.role}</p>
                    <p>{u.permissions}</p>
                    <button className="manage-btn">Manage</button>
                  </div>
                )) : (
                  <p className="users-empty">
                    No staff accounts yet — connect a users API to manage roles here.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* ---- BACKUP ---- */}
          {activeTab === 'backup' && (
            <div className="settings-card">
              <div className="settings-card-head">
                <h3>Backup</h3>
                <p>Protect your menu and order data</p>
              </div>
              <p className="backup-text">
                Automatic backups aren't connected yet. Once a backup endpoint is added on the
                server, this section can show last backup time and a manual "Backup now" action.
              </p>
              <button className="backup-btn" disabled>Backup now (not connected)</button>
            </div>
          )}

          {/* ---- THEME ---- */}
          {activeTab === 'theme' && (
            <div className="settings-card">
              <div className="settings-card-head">
                <h3>Theme</h3>
                <p>Brand colours used across the panel</p>
              </div>
              <div className="theme-swatches">
                {theme.map(t => (
                  <div className="swatch" key={t.name}>
                    <div className="swatch-box" style={{ background: t.color }}></div>
                    <p>{t.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default Settings