import './App.css'
import { useState } from 'react'
import NavBar from './components/NavBar'
import Shop from './components/Shop'
import Cart from './components/Cart'
import Search from './components/Search'
import AdminPage from './components/AdminPage'
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
  const [category, setCategory] = useState('todo');
  const[search,setSearch]=useState('')

  //------------------------gandle call rows by search name

  const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID);
  const tablesDB = new TablesDB(client);

  const handleCallBySearchName = async (search) => {
    try {
      const response = await tablesDB.listRows(DATABASE_ID, "techProducts", [
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

  return (
    <section className='main-wrapper h-screen w-full flex flex-col justify-center items-center'>
      <Router>
        <Routes>
          <Route 
            path='/'
            element={
              <>
                <NavBar />
                <Search category={category} setCategory={setCategory} setSearch={setSearch} search={search} handleCallBySearchName={handleCallBySearchName} />
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
