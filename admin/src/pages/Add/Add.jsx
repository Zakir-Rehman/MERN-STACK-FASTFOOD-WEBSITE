// import React from 'react'
// import './Add.css'
// import { assets } from '../../assets/admin_assets/assets'
// import { useState } from 'react'
// import axios from 'axios'
// import { toast } from 'react-toastify';
// import api from '../../services/axios'
// import { ActivityIndicator } from '../../components/Loaders/ActivityIndicator'
// function Add({ url }) {
//     const [image, setImage] = useState(false)
//     const [addLoading, setAddLoading] = useState(false)
//     const [data, setData] = useState({
//         name: "",
//         description: "",
//         price: "",
//         category: "Salad"
//     })
//     const onChangeHandler = (e) => {
//         const name = e.target.name;
//         const value = e.target.value;
//         setData(data => ({ ...data, [name]: value }))

//     }
//     const onSubmitHandler = async (event) => {
//         event.preventDefault();
//         const formData = new FormData();
//         formData.append("name", data.name)
//         formData.append("description", data.description)
//         formData.append("price", Number(data.price))
//         formData.append("category", data.category)
//         formData.append("image", image)
//         setAddLoading(true)
//         const responce = await axios.post(`${url}/api/food/add`, formData)
//         console.log("Add Item Response", responce);
//         setAddLoading(false)
//         if (responce.data.success) {
//             setData({
//                 name: "",
//                 description: "",
//                 price: "",
//                 category: "Salad"
//             })
//             setImage(false)
//             toast.success(responce.data.message)
//         } else {
//             console.log("Error adding item", responce.data.message);
//             toast.error(responce.data.message)
//         }
//     }
//     return (
//         <div className='add'>
//                 <form onSubmit={onSubmitHandler} className='flex-col' >
//                     <div className="add-img-upload flex-col">
//                         <p>Upload Image</p>
//                         <label htmlFor="image">
//                             <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="upload-area" />
//                         </label>
//                         <input onChange={(event) => setImage(event.target.files[0])} type="file" id='image' hidden required />
//                     </div>
//                     <div className="add-product-name flex-col">
//                         <p>Product name</p>
//                         <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />
//                     </div>
//                     <div className="add-product-description flex-col">
//                         <p>Product description</p>
//                         <textarea onChange={onChangeHandler} value={data.description} name="description" rows="2" placeholder='Write content here' required></textarea>

//                     </div>
//                     <div className="add-category-price">
//                         <div className="add-category flex-col">
//                             <p>Product category</p>
//                             <select onChange={onChangeHandler} name="category" >
//                                 <option value="Salad">Salad</option>
//                                 <option value="Rolls">Rolls</option>
//                                 <option value="Deserts">Deserts</option>
//                                 <option value="Cake">Cake</option>
//                                 <option value="Pure Veg">Pure Veg</option>
//                                 <option value="Pasta">Pasta</option>
//                                 <option value="Noodles">Noodles</option>
//                                 <option value="Sandwich">Sandwich</option>

//                             </select>
//                         </div>
//                         <div className="add-price flex-col">
//                             <p>procust price</p>
//                             <input onChange={onChangeHandler} value={data.price} type="number" name="price" placeholder='$20' />
//                         </div>
//                     </div>
//                     {/* <button type='submit' className='add-btn'>
                       
//                         {addLoading ?
//                             <div className="loaderDiv">
//                                 <ActivityIndicator w={20} h={20} color="#fff" borderColor="#eee" />

//                             </div>
//                             :
//                             "ADD ITEM"}

//                     </button> */}
//                     <button type='submit' className='add-btn' disabled={addLoading}>
//                         {addLoading ? (
//                             <span style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
//                                 <ActivityIndicator w={18} h={18} color="#fff" borderColor="rgba(255,255,255,0.3)" />
//                                 Adding item...
//                             </span>
//                         ) : (
//                             "ADD ITEM"
//                         )}
//                     </button>

//                 </form>
//         </div>
//     )
// }

// export default Add


import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/admin_assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { ActivityIndicator } from '../../components/Loaders/ActivityIndicator'

function Add({ url }) {
  const [image, setImage] = useState(false)
  const [addLoading, setAddLoading] = useState(false)
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad"
  })

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const resetForm = () => {
    setData({ name: "", description: "", price: "", category: "Salad" })
    setImage(false)
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    if (!image) {
      toast.error("Please upload an image")
      return
    }
    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("price", Number(data.price))
    formData.append("category", data.category)
    formData.append("image", image)

    setAddLoading(true)
    try {
      const response = await axios.post(`${url}/api/food/add`, formData)
      if (response.data.success) {
        resetForm()
        toast.success(response.data.message)
      } else {
        toast.error(response.data.message)
      }
    } catch (err) {
      toast.error("Something went wrong while adding item")
    } finally {
      setAddLoading(false)
    }
  }

  return (
    <div className='add'>
      <form onSubmit={onSubmitHandler}>
        {/* ===== Header ===== */}
        <div className="add-header">
          <div>
            <h2>Add Menu Item</h2>
            <p className="add-subtitle">Create a new dish for your menu and POS counter.</p>
          </div>
          <div className="add-header-actions">
            <Link to="/list" className="cancel-btn">Cancel</Link>
            <button type='submit' className='save-btn' disabled={addLoading}>
              {addLoading ? (
                <ActivityIndicator w={16} h={16} color="#fff" borderColor="rgba(255,255,255,0.3)" />
              ) : (
                "Save Item"
              )}
            </button>
          </div>
        </div>

        {/* ===== Body: two columns ===== */}
        <div className="add-body">
          {/* LEFT: basic details + pricing */}
          <div className="add-col-left">
            <div className="add-card">
              <div className="add-card-head">
                <h3>Basic details</h3>
                <p>Name, description and category</p>
              </div>

              <div className="add-field">
                <label>Food name</label>
                <input
                  onChange={onChangeHandler}
                  value={data.name}
                  type="text"
                  name='name'
                  placeholder='e.g. Zinger Stacker Burger'
                  required
                />
                <span className="hint">Shown on the menu, POS and receipts.</span>
              </div>

              <div className="add-field">
                <label>Description</label>
                <textarea
                  onChange={onChangeHandler}
                  value={data.description}
                  name="description"
                  rows="4"
                  placeholder='Crispy chicken fillet, smoked cheddar, jalapeño mayo...'
                  required
                />
                <span className="hint">Keep it under 160 characters for delivery apps.</span>
              </div>

              <div className="add-row-2">
                <div className="add-field">
                  <label>Category</label>
                  <select onChange={onChangeHandler} value={data.category} name="category">
                    <option value="Salad">Salad</option>
                    <option value="Rolls">Rolls</option>
                    <option value="Deserts">Deserts</option>
                    <option value="Cake">Cake</option>
                    <option value="Pure Veg">Pure Veg</option>
                    <option value="Pasta">Pasta</option>
                    <option value="Noodles">Noodles</option>
                    <option value="Sandwich">Sandwich</option>
                  </select>
                </div>

                <div className="add-field">
                  <label>Price</label>
                  <div className="price-input">
                    <span>Rs</span>
                    <input
                      onChange={onChangeHandler}
                      value={data.price}
                      type="number"
                      name="price"
                      placeholder='0'
                      min="0"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: image upload */}
          <div className="add-col-right">
            <div className="add-card">
              <div className="add-card-head">
                <h3>Food Image</h3>
                <p>PNG or JPG up to 5 MB</p>
              </div>

              <label htmlFor="image" className="img-upload-box">
                {image ? (
                  <img src={URL.createObjectURL(image)} alt="preview" className="img-preview" />
                ) : (
                  <div className="img-upload-placeholder">
                    <img src={assets.upload_area} alt="upload" className="upload-icon" />
                    <p className="upload-title">Upload image</p>
                    <span className="upload-sub">Drag & drop or click to browse</span>
                  </div>
                )}
              </label>
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id='image'
                accept="image/*"
                hidden
                required
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Add