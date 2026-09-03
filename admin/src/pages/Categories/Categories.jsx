import React, { useEffect, useState, useMemo } from 'react'
import './Categories.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FiPlus, FiEdit2 } from 'react-icons/fi'

function Categories({ url }) {
  const [foods, setFoods] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [renamingCat, setRenamingCat] = useState(null)
  const [renameValue, setRenameValue] = useState("")

  const fetchAll = async () => {
    try {
      setLoading(true)
      const [foodsRes, ordersRes] = await Promise.all([
        axios.get(`${url}/api/food/list`),
        axios.get(`${url}/api/order/list`),
      ])
      if (foodsRes.data.success) setFoods(foodsRes.data.data)
      if (ordersRes.data.success) setOrders(ordersRes.data.data)
    } catch (err) {
      toast.error("Failed to load categories")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchAll() }, [url])

  // ===== Build categories from real food items + real order counts =====
  const categories = useMemo(() => {
    const nameToCategory = {}
    foods.forEach(f => { nameToCategory[f.name] = f.category })

    const map = {}
    foods.forEach(f => {
      if (!map[f.category]) {
        map[f.category] = { name: f.category, items: 0, orders: 0, thumb: f.image }
      }
      map[f.category].items += 1
    })

    orders.forEach(order => {
      order.items.forEach(item => {
        const cat = nameToCategory[item.name]
        if (cat && map[cat]) {
          map[cat].orders += item.quantity
        }
      })
    })

    return Object.values(map).sort((a, b) => b.orders - a.orders)
  }, [foods, orders])

  const maxOrders = Math.max(...categories.map(c => c.orders), 1)

  const handleNewCategory = () => {
    toast.info("Categories come from food items right now — add a new item with a new category name from Add Item page, or connect a categories collection to create empty categories.")
  }

  const startRename = (cat) => {
    setRenamingCat(cat.name)
    setRenameValue(cat.name)
  }

  const confirmRename = async (oldName) => {
    if (!renameValue.trim() || renameValue === oldName) {
      setRenamingCat(null)
      return
    }
    try {
      const itemsToUpdate = foods.filter(f => f.category === oldName)
      await Promise.all(
        itemsToUpdate.map(item =>
          axios.put(`${url}/api/food/edit`, {
            id: item._id,
            name: item.name,
            description: item.description,
            price: item.price,
            category: renameValue.trim(),
          })
        )
      )
      toast.success(`Renamed "${oldName}" to "${renameValue.trim()}"`)
      setRenamingCat(null)
      fetchAll()
    } catch (err) {
      toast.error("Failed to rename category")
    }
  }

  return (
    <div className="categories-cont">
      {/* ===== HEADER ===== */}
      <div className="categories-header">
        <div>
          <h2>Categories</h2>
          <p className="categories-subtitle">Group dishes so guests find them faster.</p>
        </div>
        <button className="new-category-btn" onClick={handleNewCategory}>
          <FiPlus /> New Category
        </button>
      </div>

      {/* ===== CATEGORY CARDS ===== */}
      {loading ? (
        <p className="categories-empty">Loading categories...</p>
      ) : categories.length ? (
        <div className="categories-grid">
          {categories.map(cat => (
            <div className="category-card" key={cat.name}>
              <div className="category-card-top">
                <img src={`${url}/images/${cat.thumb}`} alt="" className="category-thumb" />
                <button className="cat-edit-btn" onClick={() => startRename(cat)} title="Rename">
                  <FiEdit2 />
                </button>
              </div>

              {renamingCat === cat.name ? (
                <div className="rename-box">
                  <input
                    value={renameValue}
                    onChange={(e) => setRenameValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && confirmRename(cat.name)}
                    autoFocus
                  />
                  <div className="rename-actions">
                    <button onClick={() => confirmRename(cat.name)}>Save</button>
                    <button onClick={() => setRenamingCat(null)}>Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <h4>{cat.name}</h4>
                  <p className="cat-meta">{cat.items} items · {cat.orders} orders</p>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="categories-empty">No categories yet — add a food item to create one</p>
      )}

      {/* ===== PERFORMANCE ===== */}
      {categories.length > 0 && (
        <div className="cat-performance-card">
          <div className="cat-performance-head">
            <h3>Category performance</h3>
            <p>Orders per category</p>
          </div>

          {categories.map(cat => (
            <div className="perf-row" key={cat.name}>
              <div className="perf-top">
                <span>{cat.name}</span>
                <span>{cat.orders} orders</span>
              </div>
              <div className="perf-bar-track">
                <div
                  className="perf-bar-fill"
                  style={{ width: `${(cat.orders / maxOrders) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Categories