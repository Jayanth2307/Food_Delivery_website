import React, { useState, useContext,useEffect } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { getTotalCartAmount,food_list,cartItems,url,token } = useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    zipCode: "",
    country: "",
    city:"",
    state:"",
    phone: "",
  });
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleProceedToPayment = async (e) => {
    e.preventDefault(); // Prevent form submission
    let orderItems = []
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo = item;
        itemInfo.quantity = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    let orderData={
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2
    }
    try {
      let response = await axios.post(url+'/api/order/place',orderData,{headers:{token}});
      console.log(response.data)
      const {session_url} = response.data;
      window.location.replace(session_url);
    } catch (error) {
      console.log(error);
    }
    
  }

  useEffect(() => {
    if(!token){
      navigate('/cart')
    }
    else if(getTotalCartAmount() === 0){
      navigate('/cart')
    }
  },[token])

  return (
    <div className="place-order">
      <div className="delivery-info">
        <h2>Delivery Information</h2>
        <form className='delivery-form' onSubmit={handleProceedToPayment}>
          <div className="row">
            <input type="text" name="firstName" placeholder="First Name" value={data.firstName} onChange={(e)=>onChangeHandler(e)} required />
            <input type="text" name="lastName" placeholder="Last Name" value={data.lastName} onChange={(e)=>onChangeHandler(e)} required/>
          </div>
          <input type="email" name="email" placeholder="Email address" value={data.email} onChange={(e)=>onChangeHandler(e)} required/>
          <input type="text" name="street" placeholder="Street" value={data.street} onChange={(e)=>onChangeHandler(e)} required/>
          <div className="row">
            <input type="text" name="zipCode" placeholder="Zip Code" value={data.zipCode} onChange={(e)=>onChangeHandler(e)} required/>
            <input type="text" name="country" placeholder="Country" value={data.country} onChange={(e)=>onChangeHandler(e)} required />
          </div>
          <div className="row">
            <input type="text" name="city" placeholder="City" value={data.city} onChange={(e)=>onChangeHandler(e)} required/>
            <input type="text" name="state" placeholder="State" value={data.state} onChange={(e)=>onChangeHandler(e)} required />
          </div>
          <input type="text" name="phone" placeholder="Phone" value={data.phone} onChange={(e)=>onChangeHandler(e)} required/>
          <button onClick={handleProceedToPayment}>Proceed to Payment</button>
        </form>
      </div>
      <div className="cart-totals">
        <h2>Cart Totals</h2>
        <div className="cart-total-details">
          <p>Subtotal</p>
          <p>${getTotalCartAmount()}</p>
        </div>
        <hr />
        <div className="cart-total-details">
          <p>Delivery Fee</p>
          <p>${getTotalCartAmount()==0?0:2}</p>
        </div>
        <hr />
        <div className="cart-total-details">
          <p>Total</p>
          <p>${getTotalCartAmount()==0?0:getTotalCartAmount()+2}</p>
        </div>
        <hr />
        <br />
      </div>
    </div>
  );
};

export default PlaceOrder