
import React, { useState } from 'react';
import SearchIcon from '../assets/images/search.png';
import Burger from '../assets/images/burgerMenu.png';

const Search = ({ category, setCategory, setSearch, search }) => {

  const categories = [
    'todo',
    'aseo',
    'bebidas',
    'carnicos',
    'confituras',
    'micelaneas'
  ];

  return (
    <nav className="w-full bg-gray-200 shadow-sm border-b border-gray-200 sticky top-0 z-50 rounded-full mt-3 ml-2 mr-2 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* LOGO */}
          <div className="shrink-0 flex items-center">
            <p className="text-2xl font-extrabold tracking-tighter text-gray-900 cursor-pointer">
              STORE<span className="text-transparent bg-clip-text bg-linear-to-r from-[#246ae3] to-[#8af7e1]">FLOW</span>
            </p>
          </div>

          {/* SEARCH & CATEGORY GROUP */}
          <div className="flex-1 flex items-center max-w-3xl">
            {/* Category Dropdown */}
            <div className="relative shrink-0">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="h-10 appearance-none bg-gray-100 border border-gray-200 text-gray-700 pl-4 pr-8 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white cursor-pointer text-sm transition-all"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 text-xs">
                ▼
              </div>
            </div>

            {/* Search Input */}
            <div className="relative flex-1 flex items-center">
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
                className="block w-full h-10 pl-10 pr-3 py-2 border border-l-0 border-gray-200 bg-gray-100 rounded-r-md focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 sm:text-sm transition-all"
                placeholder={`buscar...`}
              />
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Search;