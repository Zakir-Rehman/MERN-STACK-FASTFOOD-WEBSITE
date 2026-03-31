import React from 'react'
import './Add.css'
import { assets } from '../../assets/admin_assets/assets'
import { useState } from 'react'
import axios from 'axios'
 import { toast } from 'react-toastify';
function Add ({url}) {
    const [image, setImage] = useState(false)
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad"
    })
    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData(data => ({ ...data, [name]: value }))

    }
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name)
        formData.append("description", data.description)
        formData.append("price", Number(data.price))
        formData.append("category", data.category)
        formData.append("image", image)
        const responce = await axios.post(`${url}/api/food/add`, formData)
        if (responce.data.success) {
            setData({
                name: "",
                description: "",
                price: "",
                category: "Salad"
            })
            setImage(false)
            toast.success(responce.data.message)
        } else {
            
            toast.error(responce.data.message)
        }
    }
    return (
        <div className='add'>
            <form onSubmit={onSubmitHandler} className='flex-col' >
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="upload-area" />
                    </label>
                    <input onChange={(event) => setImage(event.target.files[0])} type="file" id='image' hidden required />
                </div>
                <div className="add-product-name flex-col">
                    <p>Product name</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />
                </div>
                <div className="add-product-description flex-col">
                    <p>Product description</p>
                    <textarea onChange={onChangeHandler} value={data.description} name="description" rows="2"  placeholder='Write content here' required></textarea>

                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product category</p>
                        <select onChange={onChangeHandler} name="category" >
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
                    <div className="add-price flex-col">
                        <p>procust price</p>
                        <input onChange={onChangeHandler} value={data.price} type="number" name="price" placeholder='$20' />
                    </div>
                </div>
                <button type='submit' className='add-btn'>ADD ITEM</button>

            </form>
        </div>
    )
}

export default Add
