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

  const [category, setCategory] = useState('todo');
  const[search,setSearch]=useState('')

  return (
    <section className='main-wrapper h-screen w-full flex flex-col justify-center items-center'>
      <Router>
        <Routes>
          <Route 
            path='/'
            element={
              <>
                <NavBar />
                <Search category={category} setCategory={setCategory} setSearch={setSearch} search={search} />
                <Shop category={category} search={search} />
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
