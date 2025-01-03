import React, { useContext, useEffect } from 'react'
import './Verify.css'
import {useSearchParams,useNavigate} from "react-router-dom";
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
/* const Verify = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get('success');
    const orderId = searchParams.get('order_Id');
    const {url,token} = useContext(StoreContext)
    const navigate = useNavigate()
  const VerifyPayment = async() => {
        try {
            const response = await axios.post(url+"/api/order/verify",{success,orderId})
            if(response.data.success)
                navigate('/myorders')
            else
                navigate('/')
        } catch (error) {
            console.log(error)
        }
       
    }  
     useEffect(()=>{
        VerifyPayment()
    },[token]) 
  return (
    <div className='verify'>
        <div className="spinner">

        </div>
    </div>
  )
}  */

  const Verify = () => {
    const [searchParams,setSearchParams]=useSearchParams();
    const success=searchParams.get('success');
    const orderId=searchParams.get('order_Id');

    const{url}=useContext(StoreContext)

    const navigate=useNavigate()

    const VerifyPayment=async()=>{
        console.log(success,orderId)
        const response=await axios.post("http://localhost:4000/api/order/verify",{success,orderId})
        console.log(response.data)
        if(response.data.success)
            navigate("/myorders")
        else
            navigate("/")
    }
    useEffect(()=>{
        VerifyPayment()
    },[])
  return (
    <div className='verify'>
        <div className='spinner'>
            
        </div>
    </div>
  )
}
export default Verify



