import { Link } from "react-router-dom"
import Logo from '../assets/images/logo.png'

const NavBar = () => {
  return (
    <div className="absolute top-0 bg-[#d1d1d1] h-12.5 w-full flex flex-row justify-between items-center">
      <Link 
        to='/'
        className="ml-5"
      >
        Shop
      </Link>
      <img 
        src={Logo}
        className="h-12 w-12"
      />
      <Link 
        to='/cart' 
        className="mr-5"
      >
        Cart
      </Link>
    </div>
  )
}

export default NavBar
