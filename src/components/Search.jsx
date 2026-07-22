import React, { useState } from 'react';
import SearchIcon from '../assets/images/search.png';
import Burger from '../assets/images/burgerMenu.png';

const Search = ({ category, setCategory, setSearch, search, handleCallBySearchName }) => {

  const categories = [
    'todo',
    'electrodomesticos',
    'bebidas',
    'aseo',
    'confituras',
    'micelaneas',
    'carnicos',
  ];

  return (
    <nav className="w-full bg-[#4a4e65] shadow-sm border-b border-gray-200 sticky top-0 z-50 rounded-full mt-3 ml-2 mr-2 font-sans px-2 sm:px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">

          {/* SEARCH & CATEGORY GROUP - takes full width on mobile */}
          <div className="flex-1 flex items-center min-w-0">
            {/* Category Dropdown */}
            <div className="relative shrink-0">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="h-10 appearance-none bg-yellow-300 border border-gray-200 text-gray-700 pl-3 pr-7 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 text-xs">
                ▼
              </div>
            </div>

            {/* Search Input + Button */}
            <div className="relative flex-1 flex items-center min-w-0">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <img 
                  src={SearchIcon} 
                  alt="search" 
                  className="w-4 h-4 object-contain opacity-60" 
                />
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="block w-full h-10 pl-10 pr-3 py-2 border border-l-0 border-gray-200 bg-gray-100 rounded-r-md focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm transition-all"
                placeholder="buscar..."
              />
              <button 
                onClick={() => handleCallBySearchName(search)}
                className="bg-yellow-300 rounded-full p-2 cursor-pointer ml-2 shrink-0 hover:scale-105 transition-transform"
              >
                <img 
                  src={SearchIcon} 
                  alt="buscar" 
                  className="h-5 w-5"
                />
              </button>
            </div>
          </div>

          {/* LOGO - hidden on mobile, visible from sm/medium up */}
          <div className="hidden sm:flex shrink-0 items-center ml-2">
            <p className="text-xl md:text-2xl uppercase font-extrabold tracking-tighter text-[#d9d9d9] cursor-pointer whitespace-nowrap">
              Tienda<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#246ae3] to-[#8af7e1]">Online</span>
            </p>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Search;