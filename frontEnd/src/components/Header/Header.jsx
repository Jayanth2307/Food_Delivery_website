import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <div className="header">
        <div className="header-contents">
            <h2>Order your Delicious food here</h2>
            <p>We provide the best food at the best price. Choose from our wide range of dishes and enjoy your meal. Have a look at our menu and order your favorite dish, we guarantee that it will be Tasty and delicious!</p>
            <a href='#explore-menu'><button>View Menu</button></a>
        </div>
    </div>
  )
}

export default Header