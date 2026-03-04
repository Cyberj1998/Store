import './App.css'
import { useState } from 'react'
import NavBar from './components/NavBar'
import Shop from './components/Shop'
import Cart from './components/Cart'
import Search from './components/Search'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {

  const[searchValue,setSearchValue]=useState('')
  const[selectedCategory,setSelectedCategory]=useState(null);

  return (
    <section className='main-wrapper h-screen w-full flex flex-col justify-center items-center'>
      <Router>
        <Routes>
          <Route 
            path='/'
            element={
              <>
                <NavBar />
                <Search 
                  setSearchValue={setSearchValue} 
                  searchValue={searchValue} 
                  selectedCategory={selectedCategory} 
                  setSelectedCategory={setSelectedCategory} 
                />
                <Shop searchValue={searchValue} selectedCategory={selectedCategory} />
              </>
            }
          />
          <Route 
            path='/cart'
            element={
              <>
                <NavBar />
                <Cart />
              </>
            }
          />
        </Routes>
      </Router>
    </section>
  )
}



export default App
