import { Link } from "react-router-dom"
import CartIcon from '../assets/images/cart.png'
import useCartStore from "../store/CartSlice"
import Shop from '../assets/images/shop.png'
import ShopIcon from '../assets/images/Logo-3d.png'

const NavBar = () => {

  const quantity = useCartStore(state => state.cart.reduce((total, product) => total + product.quantity, 0))

  return ( 
    <nav className="top-0 left-0 w-full bg-[#4a4e65] h-16 sm:h-20 flex items-center justify-between px-4 sm:px-6 z-50">
      <Link to="/" className="flex items-center gap-1 sm:gap-2">
        <div className="bg-yellow-300 h-10 sm:h-12 w-10 sm:w-12 rounded-full flex justify-center items-center shrink-0">
          <img 
            src={Shop}
            alt="shop icon" 
            className="h-6 sm:h-8 w-6 sm:w-8 object-cover rounded-full"
          />
        </div>
        <p className="font-bold text-sm sm:text-[20px] text-[#d9d9d9] hidden sm:block">
          Tienda
        </p>
      </Link>

      {/* CENTER: Logo + "SuperMM" */}
        <div className="flex flex-col relative">
          <img 
            src={ShopIcon} 
            alt="Logo" 
            className="h-10 max-md:h-8 w-15 max-md:w-15"
          />
          <p className="uppercase text-[10px] text-white font-semibold">CyberTienda</p>
          <div className="h-10 w-10 absolute backdrop-blur-xs -left-5 -top-1 rounded-full shadow-lg border border-white/20">

          </div>
        </div>
      {/* RIGHT: Cart icon + "Carrito" text + badge */}
      <Link 
        to="/cart" 
        className="flex items-center gap-1 sm:gap-2 relative"
      >
        <p className="font-bold text-sm sm:text-[20px] text-[#d9d9d9] hidden sm:block">
          Carrito
        </p>
        <div className="bg-yellow-300 h-10 sm:h-12 w-10 sm:w-12 rounded-full flex justify-center items-center shrink-0">
          <img 
            src={CartIcon} 
            alt="cart icon"
            className="h-6 sm:h-8 w-6 sm:w-8 object-cover rounded-full" 
          />
        </div>
        <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 bg-yellow-300 rounded-full h-5 sm:h-6 w-5 sm:w-6 flex justify-center items-center">
          <p className="text-xs sm:text-[20px] font-bold">{quantity}</p>
        </div>
      </Link>
    </nav>
  )
}

export default NavBar
