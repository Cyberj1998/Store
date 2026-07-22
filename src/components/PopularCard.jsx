import React from 'react'
import CartIcon from '../assets/images/cart.png'
import useCartStore from '../store/CartSlice'
import TestImage from '../assets/images/promos/bentoPromo-1.jpg'
import Background from '../assets/images/backgroundPopularCard.jpg'

const PopularCard = ({ index }) => {

  const addToCart = useCartStore(state=>state.addToCart) 

  return (
    <div className={`w-70 relative md:w-60 max-md:w-70 max-sm:w-45 h-auto max-md:h-auto bg-white p-4 flex flex-col items-center gap-4 rounded-3xl m-3 border border-gray-300 shadow-md hover:shadow-xl transition-shadow duration-300 ${index === 1 ? '-mt-5' : ''}`}>
      <img 
        src={Background} 
        alt="background"
        className='absolute object-cover h-full w-full rounded-2xl top-0 left-0' 
      />
      <img 
        src={TestImage}
        className="h-50 w-50 max-md:h-40 max-md:w-40 rounded-2xl z-10"
        alt="product image" 
      />
      <div className="flex flex-col gap-3 w-full text-center max-md:text-left z-10">
        <h3 className="text-2xl max-md:text-[25px] font-semibold text-white truncate">Product Name</h3>
        <span className="text-[12px] text-[#c9c9c9]">category</span>
        <span className="text-xl font-bold text-green-400">$500</span>
      </div>
      <button
        onClick={() => addToCart(product)}
        className="w-full z-10 flex justify-center items-center bg-linear-to-r from-[#5289e7] to-[#65f8d8] hover:from-[#65f8d8] hover:to-[#5289e7] text-white py-3 rounded-xl font-medium shadow-md transition duration-500 active:scale-95 cursor-pointer"
      >
        Añadir al carrito
        <img src={CartIcon} className="h-5 w-5" />
        </button>
    </div>
  )
}

export default PopularCard
