import useCartStore from "../store/CartSlice"
import CartCard from "./CartCard"
import Delete from '../assets/images/delete.png'
import { useState, useEffect } from "react"
import CodeModal from "./CodeModal"

//-------------------appwrite credentials
import { Client, TablesDB, Databases } from 'appwrite'
const PROJECT_ID = import.meta.env.VITE_PUBLIC_PROJECT_ID;
const ENDPOINT = import.meta.env.VITE_PUBLIC_ENDPOINT;
const DATABASE_ID = import.meta.env.VITE_PUBLIC_DATABASE_ID;

const Cart = () => {

  const cart = useCartStore(state=>state.cart)
  const clearCart = useCartStore(state=>state.clearCart)   
  const getTotalPrice = useCartStore(state=>state.getTotalPrice)
  const getTotalQuantity = useCartStore(state=>state.getTotalQuantity)
  const[address,setAddress]=useState('')
  const[destinatario,setDestinatario]=useState('')
  const[total,setTotal]=useState(0)
  const[totalQuantity,setTotalQuantity]=useState(0)
  const[modal,setModal]=useState(false)
  const[modalCoede,setModalCode]=useState(false)
  const[codeGeneratedRandom,setCodeGeneratedRandom]=useState(0)


  useEffect(()=>{
    setTotal(getTotalPrice())
    setTotalQuantity(getTotalQuantity())
  },[cart])


  const handleModal = () => {
    setModal(prev => !prev);
  }

  const  handleCodeModal = () => {
    setModalCode(prev => !prev)
  }

  //-----------------------------------handle insert order

  const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID);
  const databases = new Databases(client);
  const tablesDB = new TablesDB(client);


  const handleInsertOrder = async (address, destinatario, total) => {
    try {
      const newCode = Math.floor(100000 + Math.random() * 900000);
      const response = await databases.createDocument(DATABASE_ID, "orders", 'unique()', {
        address: address,
        receiver: destinatario,
        products: JSON.stringify(cart),
        code: newCode, 
        total,
      });

      setCodeGeneratedRandom(newCode);
      console.log('Order created:', response);
      return response;

    } catch (error) {
      console.error('Order creation failed:', error);
      throw error;
    }
  };

  const checkoutFunction = (address, destinatario, total ) => {
    handleInsertOrder( address, destinatario, total )
    handleModal()
    handleCodeModal()
  }

  return (
    <div className="h-screen w-full flex flex-col items-center overflow-y-auto pt-16 space-y-4 px-2">
      
      
      {modal ? (
        <div className="modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-3xl shadow-lg w-[40%] max-md:w-[90%] max-h-[90vh] p-8 flex flex-col gap-6 overflow-auto">
          <button 
            onClick={()=>handleModal()}
            className="self-end cursor-pointer bg-red-500 hover:bg-red-600 text-white rounded-full p-2 w-10 h-10 flex items-center justify-center shadow-md transition"
            aria-label="Close modal"
          >
            <img src={Delete} alt="close" className="w-5 h-5"/>
          </button>

          <div className="flex justify-between items-center text-gray-700 font-semibold text-lg">
            <span>Total de productos</span>
            <span>{totalQuantity}</span>
          </div>

          <div className="flex justify-between items-center text-gray-700 font-semibold text-lg">
            <span>Total a pagar</span>
            <span className="text-green-600 font-bold text-xl">${total}</span>
          </div>

          <label htmlFor="address" className="text-sm font-medium text-gray-600">
            Introduzca su dirección
          </label>

          <textarea 
            id="address" 
            name="address"
            className="resize-none border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            rows={4}
            placeholder="Dirección completa"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>
          <label htmlFor="destinatario" className="text-sm font-medium text-gray-600">Introduzca nombre del destinatario</label>
          <input
            id="destinatario" 
            type="text" 
            placeholder="Destinatario"
            value={destinatario}
            onChange={(e) => setDestinatario(e.target.value)}
            className="resize-none border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          <button 
            onClick={()=>checkoutFunction( address, destinatario, total )}
            className="mt-4 cursor-pointer bg-linear-to-r from-[#5289e7] to-[#65f8d8] hover:from-[#65f8d8] hover:to-[#5289e7] text-white font-semibold rounded-lg py-3 shadow-lg transition duration-500"
          >
            Comprar
          </button>
        </div>
      ): ''}

      {
        modalCoede ? (
          <CodeModal total={total} code={codeGeneratedRandom} setModalCode={setModalCode} />
        ) : ''
      }


      {cart.length > 0 ? (
        cart.map((item) => (
          <CartCard 
            key={item.$id} 
            item={item} 
          />
        ))
      ) : (
        <p className="text-gray-500 text-lg mt-10">Carrito Vacio</p>
      )}

      {
        cart.length > 0 ? (
          <button 
            className="checkout-btn mt-6 mb-2 cursor-pointer w-full max-w-xl p-4 bg-linear-to-r from-[#5289e7] to-[#65f8d8] hover:from-[#65f8d8] hover:to-[#5289e7] text-white rounded-2xl shadow transition duration-500"
            onClick={()=>handleModal()}
          >
            <p className="uppercase text-[20px] font-bold">Comprar</p>
          </button>
        ) : ''
      }
    </div>
  )
}

export default Cart
