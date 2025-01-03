import React, { useContext } from 'react'
import './FoodItemCard.css'
import { assets } from '../../assets/frontend_assets/assets';
import { StoreContext } from '../../context/StoreContext.jsx';

const FoodItemCard = ({id, name, image, price, description}) => {
  const {cartItems,addToCart,removeFromCart,url} = useContext(StoreContext);
  return (
    <div className='food-item'>
        <div className="food-item-image-container">
            <img className="food-item-image" src={url+"/images/"+image} alt="" />
            {
            !cartItems[id]
                ? <img src= {assets.add_icon_white} className='add' onClick={()=> addToCart(id)} />
                : <div className="food-item-counter">
                    <img src={assets.remove_icon_red} onClick={()=> removeFromCart(id)} />
                    <p>{cartItems[id] }</p>
                    <img src={assets.add_icon_green} onClick={()=> addToCart(id)} />
                  </div>
            }
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className="food-item-desc">{description}</p>
            <p className="food-item-price">${price}</p>
        </div>
    </div>
  )
}

export default FoodItemCard