import useCartStore from "../store/CartSlice"
import CartCard from "./CartCard"
import Delete from '../assets/images/delete.png'
import Arrow from '../assets/images/right.png'
import WhiteWaves from '../assets/images/whiteWaves.svg'
import blob from '../assets/images/blob.svg'
import Hand from '../assets/images/hand.png'
import productGiveAway from '../assets/images/productGiveAwway.png'
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
  const[giveAwayModal,setGiveAwayModal]=useState(false)
  const[email,setEmail]=useState('')
  const[address,setAddress]=useState('')
  const[destinatario,setDestinatario]=useState('')
  const[movil,setMovil]=useState('')
  const[total,setTotal]=useState(0)
  const[totalQuantity,setTotalQuantity]=useState(0)
  const[modal,setModal]=useState(false)
  const[modalCode,setModalCode]=useState(false)
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


  const handleInsertOrder = async (address, destinatario, total, movil, email) => {
    if (!address || !destinatario) {
      alert('Defina una dirección y un destinatario');
      return null;
    }
    try {
      const newCode = Math.floor(100000 + Math.random() * 900000);
      const response = await databases.createDocument(DATABASE_ID, "orders", 'unique()', {
        address: address,
        receiver: destinatario,
        products: JSON.stringify(cart),
        code: newCode,
        movil: movil,
        email: email ,
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

  const checkoutFunction = async (address, destinatario, total, movil, email) => {
    try {
      const result = await handleInsertOrder(address, destinatario, total, movil, email);
      if (result) {
        handleModal();
        handleCodeModal();
      }
    } catch (error) {
      console.error('Checkout failed:', error);
    }
  };

  //-----------------------give away modal 

  const handleGiveAwayModal = () => {
    setGiveAwayModal(prev=>!prev)
  }

  return (
    <div className="h-screen w-full flex flex-col items-center overflow-y-auto mt-5 space-y-4 px-2">
         
      {modal ? (
        <div className={`modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 overflow-hidden bg-white rounded-3xl shadow-lg w-[40%] max-md:w-[90%] ${giveAwayModal ? '' : 'overflow-y-scroll'} max-h-[90vh] p-8 flex flex-col gap-6`}>
          {
            !giveAwayModal ? (
              <img 
                src={Hand} 
                alt="hand"
                className="h-8 w-8 absolute top-0 left-1/2 ml-10 mt-2 z-100" 
                style={{ 
                  animation: 'peekAndWave 4s ease-in-out infinite'
                }}
              />
            ) : ''
          }
          <button
            onClick={()=>handleGiveAwayModal()} 
            className="absolute top-0 left-1/2 rounded-full cursor-pointer z-70"
          >
            <img 
              src={Arrow} 
              alt="arrow"
              className={`h-12 w-10 ${giveAwayModal ? 'rotate-270' : 'rotate-90'} transition-all duration-500`} 
            />
          </button>
          <div className={`giveAwayModal-modal flex flex-col justify-start items-start border border-gray-500 bg-linear-to-tr from-[#5289e7] to-[#65f8d8] z-60 absolute w-full ${giveAwayModal ? 'h-full' : 'h-0'} top-0 left-0 transition-all duration-500 ${giveAwayModal ? '' : 'rounded-b-full transition-all duration-500'}`}>
            {
              giveAwayModal ? (
                <>
                  <img
                    className={`absolute top-0 w-full rotate-180 ${giveAwayModal ? 'opacity-100' : 'opacity-0'} transition-all duration-500`}
                    src={WhiteWaves} 
                    alt="waves" 
                  />
                  <label htmlFor="email" className="text-[25px] font-semibold text-[#ffffff] mt-30 ml-10">Correo</label>
                  <p className="font-sans text-[15px] ml-10 text-white">
                    introduce tu correo para participar en el sorteo
                  </p>
                  <input
                    id="email" 
                    type="text" 
                    placeholder="Correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="resize-none border-2 border-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition w-[80%] ml-10 mr-10"
                  />
                  <div className="w-full flex flex-col justify-center items-center">
                    <img 
                      src={blob} 
                      alt="blob"
                      className="absolute h-75 w-75 rotate-12 pointer-events-none" 
                    />
                    <img 
                      src={productGiveAway} 
                      alt="product image"
                      className="h-55 w-55 -rotate-15" 
                    />
                    <img 
                      src={productGiveAway} 
                      alt="product image"
                      className="absolute h-55 w-55 -rotate-55" 
                    />
                  </div>
                  <div className="w-full flex justify-center items-center">
                    <button 
                      className="checkout-btn mb-2 cursor-pointer w-[80] max-w-xl p-4 bg-linear-to-r from-[#5289e7] to-[#65f8d8] border border-white hover:from-[#65f8d8] hover:to-[#5289e7] text-white rounded-2xl shadow transition duration-500"
                      onClick={()=>checkoutFunction(address, destinatario, total, movil, email)}
                    >
                      <p className="uppercase text-[20px] font-bold">Terminar compra</p>
                    </button>
                  </div>
                </>
              ) : ''
            }
          </div>
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
            Introduzca dirección de entrega
          </label>

          <textarea 
            id="address" 
            name="address"
            className="resize-none shrink-0 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
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

          <label htmlFor="movil" className="text-sm font-medium text-gray-600">tu numero de movil</label>
          <input
            id="movil" 
            type="text" 
            placeholder="000-000-0000"
            value={movil}
            onChange={(e) => setMovil(e.target.value)}
            className="resize-none border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          <button 
            onClick={()=>checkoutFunction( address, destinatario, total, movil, email )}
            className="mt-4 cursor-pointer bg-linear-to-r from-[#5289e7] to-[#65f8d8] hover:from-[#65f8d8] hover:to-[#5289e7] text-white font-semibold rounded-lg py-3 shadow-lg transition duration-500"
          >
            Comprar
          </button>
        </div>
      ): ''}

      {
        modalCode ? (
          <CodeModal total={total} code={codeGeneratedRandom} setModalCode={setModalCode} />
        ) : ''
      }

      <div className='border border-[#545454] rounded-2xl bg-[#f1f1f1] mb-5 h-full w-full flex flex-col justify-start items-center overflow-y-scroll'>
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
      </div>

      {
        cart.length > 0 ? (
          <button 
            className="checkout-btn mb-2 cursor-pointer w-full max-w-xl p-4 bg-linear-to-r from-[#5289e7] to-[#65f8d8] hover:from-[#65f8d8] hover:to-[#5289e7] text-white rounded-2xl shadow transition duration-500"
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
