import './App.css'
import { useState } from 'react'
import NavBar from './components/NavBar'
import Shop from './components/Shop'
import MainBanner from './components/MainBanner'
import BentoGrid from './components/BentoGrid'
import MostPopular from './components/MostPopular'
import Cart from './components/Cart'
import Search from './components/Search'
import AdminPage from './components/AdminPage'
import Footer from './components/footer'
import {
  BrowserRouter as Router,
  Routes,
  Route
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
        Query("popular", true),
      ]);
      const newRows = response.rows;
      const currentIds = get().popularProducts.map(p => p.$id);
      const uniqueNew = newRows.filter(p => !currentIds.includes(p.$id));
      if (uniqueNew.length > 0) {
        set({ popularProducts: [...get().popularProducts, ...uniqueNew] });
      }
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
                  <Search category={category} setCategory={setCategory} setSearch={setSearch} search={search} handleCallBySearchName={handleCallBySearchName} />
                  <MainBanner />
                  <BentoGrid />
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
