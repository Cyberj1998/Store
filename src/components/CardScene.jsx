import React from 'react'

const CardScene = ({ card }) => {
  return (
    <div 
      className='border border-indigo-500 bg-linear-to-r from-[#246ae3] to-[#8af7e1] w-full max-w-md min-h-25 rounded-3xl flex flex-row items-center p-4 shadow-lg transition-transform hover:scale-[1.02]'
    >
        {/* Icon Container */}
        <div className='shrink-0 mr-4 bg-[#c4def9] rounded-full'>
          <img 
            src={card.icon} 
            alt="icon"
            className='h-16 w-16 sm:h-20 sm:w-20 object-contain' 
          />
        </div>

        {/* Text Container */}
        <div className='flex flex-col justify-center items-start overflow-hidden'>
          <h3 className='text-lg sm:text-[20px] font-bold uppercase text-gray-700 leading-tight'>
            {card.title}
          </h3>
          <p className='text-sm sm:text-base text-gray-800 line-clamp-2'>
            {card.subtitle}
          </p>
        </div>
    </div>
  )
}

export default CardScene
