import React from 'react'
import { Link } from 'react-router-dom'
import CartIcon from '../assets/images/cart.png'
import BottomWave from '../assets/images/whiteWaves.svg'
import Blob from '../assets/images/blob.svg'
import useCartStore from '../store/CartSlice'
import Background from '../assets/images/backgroundPopularCard.jpg'

const PopularCard = ({ index, product }) => {

  const addToCart = useCartStore(state=>state.addToCart) 

  return (
    <div className={`w-70 max-md:w-55 relative h-auto bg-linear-to-tr from-[#5289e7] to-[#65f8d8] p-4 flex flex-col shrink-0 items-center gap-4 rounded-3xl m-3 border border-gray-300 shadow-md hover:shadow-xl transition-shadow duration-300 ${index === 1 ? '-mt-5' : ''}`}>
      <img 
        src={BottomWave}
        className='absolute bottom-0 h-30 object-cover z-10' 
        alt="bottom waves" 
      />
      <img 
        src={Background} 
        alt="background"
        className='absolute object-cover h-full w-full rounded-2xl top-0 left-0 opacity-35' 
      />
      <Link
        to={'/details'}
        state={{product}}
        className='z-10 relative flex justify-center items-center'
      >
        <img 
          src={Blob}
          alt="blob"
          className='absolute -z-10' 
        />
        <img 
          src={product.image}
          className="h-50 w-50 max-md:h-40 max-md:w-40 rounded-2xl z-50"
          alt="product image" 
        />
      </Link>
      <div className="flex flex-col gap-3 w-full text-center max-md:text-left z-10">
        <h3 className="text-2xl max-md:text-[25px] font-semibold text-white truncate">{product.name}</h3>
        <span className="text-[12px] text-[#c9c9c9]">{product.category}</span>
        <span className="text-[25px] font-bold text-green-400">${product.price}</span>
      </div>
      <button
        onClick={() => addToCart(product)}
        className="w-full border-white z-55 flex justify-center items-center bg-linear-to-r from-[#5289e7] to-[#65f8d8] hover:from-[#65f8d8] hover:to-[#5289e7] text-white py-3 rounded-xl font-medium shadow-md transition duration-500 active:scale-95 cursor-pointer"
      >
        Añadir al carrito
        <img src={CartIcon} className="h-5 w-5" />
        </button>
    </div>
  )
}



export default PopularCard
