import { Link } from "react-router-dom"
import Logo from '../assets/images/logo.png'

const NavBar = () => {
  return (
    
<nav className="fixed top-0 left-0 w-full bg-gray-200 h-14 flex items-center justify-between px-6 shadow-md z-50">
  <Link to="/" className="text-lg font-bold text-gray-800 hover:text-blue-600 transition-colors">
    Shop
  </Link>

  <img 
    src={Logo} 
    alt="Logo" 
    className="h-12 w-12 object-contain"
  />

  <Link to="/cart" className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">
    Cart
  </Link>
</nav>

  )
}

export default NavBar
