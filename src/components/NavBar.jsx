import { Link } from "react-router-dom"
import Logo from '../assets/images/logo.png'
import CartIcon from '../assets/images/cart.png'
import useCartStore from "../store/CartSlice"
import { useEffect, useState } from "react"

const NavBar = () => {

  const quantity = useCartStore(state => state.cart.reduce((total, product) => total + product.quantity, 0))

  return ( 
    <nav className="fixed top-0 left-0 w-full bg-gray-200 h-14 flex items-center justify-between px-6 z-50">
      <Link to="/" className="text-lg font-bold text-gray-800 hover:text-blue-600 transition-colors">
        Shop
      </Link>

      <img 
        src={Logo} 
        alt="Logo" 
        className="h-12 w-12 object-contain"
      />

      <Link 
        to="/cart" 
        className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors flex flex-row justify-center items-center relative"
      >
        <img 
          src={CartIcon} 
          alt="cart icon"
          className="h-10 w-10" 
        />
        <p className="text-[20px] absolute -top-2 -right-3">{quantity}</p>
      </Link>
    </nav>
  )
}

export default NavBar
