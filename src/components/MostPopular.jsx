import React from 'react'
import PopularCard from './PopularCard'
import { useEffect } from 'react'
import useCartStore from '../store/CartSlice'

const MostPopular = ({handleCallPopulars}) => {

  const popularProducts = useCartStore(state=>state.popularProducts)

  useEffect(()=>{
    handleCallPopulars()
  },[])

  return (
    <div className='h-125 w-[90%] justify-self-center m-2 flex flex-col justify-center items-center'>
      <h3 className='uppercase text-3xl max-md:text-[20px] font-bold text-[#535353]'>Productos mas <span className='text-transparent bg-clip-text bg-linear-to-r from-[#246ae3] to-[#8af7e1]'>Vendidos</span></h3>
      <div className='h-full w-full flex flex-row justify-center items-center max-md:overflow-x-scroll max-md:justify-start'>
        {popularProducts.map((product, index)=>(
          <PopularCard 
            key={index}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}

export default MostPopular
