import { Link } from "react-router-dom"
import CartIcon from '../assets/images/cart.png'
import useCartStore from "../store/CartSlice"
import Shop from '../assets/images/shop.png'
import ShopIcon from '../assets/images/shopLogo.png'

const NavBar = () => {

  const quantity = useCartStore(state => state.cart.reduce((total, product) => total + product.quantity, 0))

  return ( 
    <nav className="top-0 left-0 w-full bg-gray-200 h-20 flex items-center justify-between px-6 z-50">
      <Link to="/" className="text-lg font-bold text-gray-800 hover:text-blue-600 transition-colors flex justify-center items-center">
        <img 
          src={Shop}
          alt="shop icon" 
          className="h-10 w-10 bg-gray-400 rounded-full overflow-visible"
        />
        <p className="font-bold text-[20px] text-[#656565] max-md:opacity-0">Tienda</p>
      </Link>

      <div className="flex justify-center items-center flex-col">
        <img 
          src={ShopIcon} 
          alt="Logo" 
          className="h-12 w-12 object-contain bg-gray-400 rounded-full"
        />
        <p className="font-bold text-[15px]">
          Super <span className="text-transparent bg-clip-text bg-linear-to-r from-[#246ae3] to-[#8af7e1]">MM</span>
        </p>
      </div>

      <Link 
        to="/cart" 
        className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors flex flex-row justify-center items-center relative"
      >
        <p className="font-bold text-[20px] text-[#656565] max-md:opacity-0">Carrito</p>
        <img 
          src={CartIcon} 
          alt="cart icon"
          className="h-10 w-10 bg-gray-400 rounded-full overflow-visible" 
        />
        <p className="text-[20px] absolute -top-2 -right-3">{quantity}</p>
      </Link>
    </nav>
  )
}

export default NavBar
