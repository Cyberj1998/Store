import './App.css'
import NavBar from './components/NavBar'
import Shop from './components/Shop'
import Cart from './components/Cart'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {

  return (
    <section className='main-wrapper h-screen w-full border-2 border-pink-500 flex flex-col justify-center items-center'>
      <Router>
        <Routes>
          <Route 
            path='/'
            element={
              <>
                <NavBar />
                <Shop />
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
