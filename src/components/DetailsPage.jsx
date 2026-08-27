import React from 'react'
import { useLocation } from 'react-router-dom'
import useCartStore from '../store/CartSlice'
import TestImage from '../assets/images/product.png'
import CartIcon from '../assets/images/cart.png'
import RightArrow from '../assets/images/right.png'
import LeftArrow from '../assets/images/left.png'
import { useState } from 'react'

const DetailsPage = () => {
  
  const location = useLocation();
  const product = location.state?.product;
  const addToCart = useCartStore((state) => state.addToCart);

  // Local quantity state
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => Math.max(1, prev - 1));

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  return (
    <div className='h-screen w-full flex justify-center items-center'>
      <div className='border border-[#dcdcdc] h-[80%] max-md:h-[90%] w-[80%] max-md:w-[90%] rounded-2xl flex flex-row max-md:flex-col justify-center items-center'>
        <div className='w-[50%] max-md:w-full h-full max-md:h-[50%] flex justify-center items-center'>
          <img 
            src={product?.image} 
            alt="product image"
            className='h-[80%] w-[80%]' 
          />
        </div>
        <div className='w-[50%] max-md:w-full h-full max-md:h-[50%] flex flex-col justify-evenly items-center'>
          <h3 className='text-[25px] font-semibold text-[#535353]'>{product?.name}</h3>
          <h3 className='text-green-600 text-2xl font-semibold'>$: {product?.price}</h3>
          <div className='m-2 h-15 w-[80%] flex flex-row justify-around items-center'>
            <button 
              className='cursor-pointer border rounded-full'
              onClick={handleDecrease}
            >
              <img 
                src={LeftArrow} 
                alt="left"
                className='h-15 w-15' 
              />
            </button>
            <p className='text-[30px] font-semibold'>{quantity}</p>
            <button 
              className='cursor-pointer border rounded-full'
              onClick={handleIncrease}
            >
              <img 
                src={RightArrow} 
                alt="right"
                className='h-15 w-15' 
              />
            </button>
          </div>
          <button
            onClick={handleAddToCart}
            className="w-[80%] max-md:text-[12px] max-sm:text-[10px] h-12 flex justify-center items-center bg-linear-to-r from-[#5289e7] to-[#65f8d8] hover:from-[#65f8d8] hover:to-[#5289e7] text-white rounded-xl font-medium max-md:font-sans shadow-md transition duration-500 active:scale-95 cursor-pointer"
          >
            Añadir al carrito
            <img src={CartIcon} className="h-5 w-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
