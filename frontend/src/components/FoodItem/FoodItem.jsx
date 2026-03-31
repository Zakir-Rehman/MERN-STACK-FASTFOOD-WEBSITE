import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/frontend_assets/assets'
import { StoreContext } from '../../Context/StoreContext'
import { BsCart } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function FoodItem({ id, name, description, price, image, setShowLogin }) {
    // const [itemCount, setItemCount] = useState(0)
    const { cartItems, addToCart, removeFromCart, url, totalItems, token, setToken } = useContext(StoreContext)
    const navigate = useNavigate();

    const handleCartClick = () => {
        if (token) {
            navigate("/cart")
        } else {
            setShowLogin(true)
        }
    }
    
    return (
        <>
            <div className='food-item' >
                <div className='food-item-img-container'>
                    <img src={url + "/images/"+image} className='food-item-image' alt="" />
                    {!cartItems[id]
                        ? <img className='add' src={assets.add_icon_white} onClick={() => addToCart(id)} alt='logo' />
                        : <div className='food-item-counter' >
                            <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                            <p>{cartItems[id]}</p>
                            <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="" />
                        </div>
                    }
                </div>
                <div className="food-item-info">
                    <div className="food-item-name-rating">
                        <p>{name}</p>
                        <img src={assets.rating_starts} alt="" />
                    </div>
                    <p className="food-item-desc">
                        {description}
                    </p>
                    <p className="food-item-price">
                        ${price}
                    </p>
                </div>
            </div>
            {totalItems >= 1 && (
                <div className="cart-show-div">
                    <p className='para1'>{totalItems}</p>
                    <Link to="/cart" className="cart-show-inner" >
                        <BsCart />
                        <h2>Cart</h2>
                    </Link>
                </div>
            )}
        </>
    )
}

export default FoodItem
