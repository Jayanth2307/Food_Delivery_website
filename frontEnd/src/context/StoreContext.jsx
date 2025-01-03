import  {createContext, useEffect, useState} from "react";
import axios from "axios";

export const StoreContext = createContext();

const StoreContextProvider = (props) => {
    const [token, setToken] = useState("");
    const url = "http://localhost:4000"

    const [food_list, setFoodList] = useState([]);
    const fetchFoodList = async () => {
        try {
            const response = await axios.get(url+"/api/food/list");
        setFoodList(response.data.data);
        } catch (error) {
            console.log(error);
        }
        
    }

    const [cartItems, setCartItems] = useState({});
    const addToCart = async(itemId) => {
        if(!cartItems[itemId]){
            setCartItems({...cartItems, [itemId]: 1});
        }
        else{
            setCartItems({...cartItems, [itemId]: cartItems[itemId] + 1});
        }
        try{
            if(token){
            await axios.post(url+"/api/cart/add", {itemId},{headers: {token}});
            }
        }catch(error){
            console.log(error);
        }
       
    }

    const removeFromCart = async (itemId) => {
        setCartItems({...cartItems, [itemId]: cartItems[itemId] - 1});
        try {
            if(token){
                await axios.post(url+"/api/cart/remove", {itemId},{headers: {token}});
            }
        } catch (error) {
            console.log(error);
        }
       
    }

    const getTotalCartAmount = () => {
        let total = 0;
        for(let item in cartItems){
            if(cartItems[item]){
                let itemInfo = food_list.find((food)=>food._id===item);
                total += itemInfo.price * cartItems[item];
            }
        }
        return total;
    }

    const loadCartData = async (token)=>{
        try {
            const response = await axios.post(url+"/api/cart/get",{},{headers: {token}});
            setCartItems(response.data.cartData)
        } catch (error) {
            console.log(error);
        }
        
    }
    
    useEffect(()=>{
        async function loadData(){
            await fetchFoodList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    },[])

    const ContextValues={
        url,
        token,
        setToken,
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount
    }
    return (
        <StoreContext.Provider value={ContextValues}>
            {props.children}
        </StoreContext.Provider>
    )
}

export {StoreContextProvider};