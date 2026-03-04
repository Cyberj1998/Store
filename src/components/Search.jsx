import SearhcIcon from '../assets/images/search.png'
import Burger from '../assets/images/burgerMenu.png'
import { useState, useEffect } from 'react'

const Search = ({ setSearchValue, searchValue, selectedCategory, setSelectedCategory }) => {

  const[filterMenu,setFilterMenu]=useState(false)
  const[windowWidth,setWindowWidth]=useState()

  const handleFilterMenu = () => {
    setFilterMenu(prev => !prev)
  }

  useEffect(()=>{
    setWindowWidth(window.innerWidth)
  },[window.innerWidth])

  return (
    
    <div className={`${!filterMenu ? 'h-12.5' : 'h-fit' } transition-all duration-300 w-full fixed top-0 mt-14 flex flex-col justify-between items-center bg-white shadow-md`}>

      <div className='flex flex-row justify-between items-center w-full'>
        <div className='flex flex-row justify-center items-center relative'>
          <p className='hidden sm:block text-[15px] uppercase m-2'>filtrar</p>
          <button 
            className='cursor-pointer'
            onClick={handleFilterMenu}
          >
            <img 
              src={Burger}
              alt="burger menu icon"
              className='h-9 w-9' 
            />
          </button>
        </div>

    
        <div className='search-container flex flex-row justify-center items-center'>
          <input 
            type="text"
            className='border h-9 w-100 max-md:w-50 rounded-[5px]'
            placeholder='search' 
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button className='cursor-pointer m-2'>
            <img 
              src={SearhcIcon} 
              alt="magnifying glass" 
              className='rounded-full h-9 w-9'
            />
          </button>
        </div>

      </div>
      {filterMenu && (
            <div className='w-full'>
             <div className='w-fit'>
               {[
                'aceites y grasas',
                'cereales y derivados',
                'carnes',
                'bebidas',
                'productos de panadería y repostería',
                'postres y gelatinas',
                'huevos y lácteos',
                'harinas y almidones',
                'condimentos y salsas'
                ].map(category => (
                <div
                  className='text-[17px] font-semibold cursor-pointer hover:bg-[#e3e3e3] m-1'
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    
                    handleFilterMenu()
                  }}
                >
                  {category}
                </div>
              ))}
              <div 
              className='text-[15px] font-semibold cursor-pointer bg-[#5289e7] hover:bg-[#52d8e7]'
              onClick={() => {
                setSelectedCategory(null);
                
                handleFilterMenu()
              }}>
                Limpiar filtro
              </div>
             </div>
            </div>
          )}
    </div>
  )
}

export default Search
