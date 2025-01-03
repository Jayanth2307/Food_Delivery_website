import {Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './screens/Home/Home'  
import Cart from './screens/Cart/Cart'
import Verify from './screens/Verify/verify'
import MyOrders from './screens/MyOrders/MyOrders'
import PlaceOrder from './screens/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopUp from './components/LoginPopUp/LoginPopUp'
import { useState } from'react'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const [showLogin,setShowLogin] = useState(false);
  return (
    <>
      {
        showLogin ? <LoginPopUp setShowLogin={setShowLogin} />:<></>
      }
      <div className='app'>
        <ToastContainer />
          <Navbar setShowLogin={setShowLogin} />
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/cart' element={<Cart/>} />
            <Route path='/order' element={<PlaceOrder/>} />
            <Route path='/verify' element={<Verify/>} />
            <Route path='/myorders' element={<MyOrders/>} />
          </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
