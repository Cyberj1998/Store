
import React, { useState } from 'react';
import { ShoppingCart, Menu, ChevronDown } from 'lucide-react';

const Search = () => {
  const [category, setCategory] = useState('All');

  const categories = [
    'All',
    'Electronics',
    'Fashion',
    'Home & Garden',
    'Sports',
    'Beauty'
  ];

  return (
    <nav className="w-full bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* LOGO */}
          <div className="shrink-0 flex items-center">
            <div className="text-2xl font-extrabold tracking-tighter text-blue-600 cursor-pointer">
              STORE<span className="text-gray-900">FLOW</span>
            </div>
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
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <ChevronDown size={14} />
              </div>
            </div>

            {/* Search Input */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full h-10 pl-10 pr-3 py-2 border border-l-0 border-gray-200 bg-gray-100 rounded-r-md focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 sm:text-sm transition-all"
                placeholder={`Search in ${category}...`}
              />
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
              Sign In
            </button>
            <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-all">
              <ShoppingCart size={22} />
              <span className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                3
              </span>
            </button>
          </div>

          {/* MOBILE TOGGLE */}
          <div className="md:hidden flex items-center">
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-md">
              <Menu size={24} />
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Search;