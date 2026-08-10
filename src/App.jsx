import './App.css'
import { useState, useEffect, useRef } from 'react'
import { clsx } from 'clsx'
import NavBar from './components/NavBar'
import Shop from './components/Shop'
import MainBanner from './components/MainBanner'
import BentoGrid from './components/BentoGrid'
import Scene from './components/Scene'
import Marquee from './components/Marquee'
import MostPopular from './components/MostPopular'
import Cart from './components/Cart'
import Search from './components/Search'
import AdminPage from './components/AdminPage'
import Footer from './components/Footer'
import CartIcon from './assets/images/cart.png'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import useCartStore from './store/CartSlice'

//-------------------appwrite credentials
import { Client, Query, TablesDB } from 'appwrite'
const PROJECT_ID = import.meta.env.VITE_PUBLIC_PROJECT_ID;
const ENDPOINT = import.meta.env.VITE_PUBLIC_ENDPOINT;
const DATABASE_ID = import.meta.env.VITE_PUBLIC_DATABASE_ID;

function App() {

  const addToCache = useCartStore((state)=>state.addToCache)
  const addToPopulars = useCartStore((state)=>state.addToPopulars) 
  const quantity = useCartStore(state => state.cart.reduce((total, product) => total + product.quantity, 0))
  const [category, setCategory] = useState('todo');
  const[search,setSearch]=useState('')

  //------------------------gandle call rows by search name

  const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID);
  const tablesDB = new TablesDB(client);

  //----------------------------call products by search name
  const handleCallBySearchName = async (search) => {
    try {
      const response = await tablesDB.listRows(DATABASE_ID, "products", [
        Query.startsWith("name", search), 
      ]);
  
      const newRows = response.rows;
      newRows.forEach((product) => {
        addToCache(product);
        console.log(product);
      });
    } catch (error) {
      console.log(error);
    }
  };


  //------------------------------call most popular products
  const handleCallPopulars = async () => {
    try {
      const response = await tablesDB.listRows(DATABASE_ID, "products", [
        Query.equal("popular", true),
      ]);

      const newRows = response.rows;
      newRows.forEach((product) => {
        addToPopulars(product);
        console.log(product);
      });
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <section className='main-wrapper h-screen w-full flex flex-col justify-center items-center'>
      <Router>
        <Routes>
          <Route 
            path='/'
            element={
              <>
                <div className='overflow-y-scroll w-full'>
                  <NavBar />
                  <button className={clsx('h-15 w-15 m-5 mr-8 rounded-full border border-white absolute z-100 bg-yellow-300 flex justify-center items-center cursor-pointer bottom-0 right-0 transition-all duration-100 ease-in-out')}>
                    <Link to='/cart'>
                      <img 
                        src={CartIcon}
                        alt="cart icon"
                        className='object-contain h-10 w-10 z-50' 
                      />
                      <div className='bg-yellow-300 h-8 w-8 absolute -top-3 -right-3 rounded-full flex justify-center items-center'>
                        <p className='font-bold text-[15px]'>{quantity}</p>
                      </div>
                    </Link>
                  </button>
                  <Search category={category} setCategory={setCategory} setSearch={setSearch} search={search} handleCallBySearchName={handleCallBySearchName} />
                  <MainBanner />
                  <Scene />
                  <Marquee />
                  <MostPopular handleCallPopulars={handleCallPopulars} />
                  <Shop category={category} search={search} />
                  <Footer />
                </div>
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
          <Route 
            path='/admin'
            element={
              <>
                <NavBar />
                <AdminPage />
              </>
            }
          />
        </Routes>
      </Router>
    </section>
  )
}



export default App
