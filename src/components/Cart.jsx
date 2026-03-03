import useCartStore from "../store/CartSlice"
import CartCard from "./CartCard"
import Delete from '../assets/images/delete.png'
import { useState, useEffect } from "react"

const Cart = () => {

  const cart = useCartStore(state=>state.cart)
  const clearCart = useCartStore(state=>state.clearCart)
  const getTotalPrice = useCartStore(state=>state.getTotalPrice)
  const getTotalQuantity = useCartStore(state=>state.getTotalQuantity)
  const[address,setAddress]=useState('')
  const[total,setTotal]=useState(0)
  const[totalQuantity,setTotalQuantity]=useState(0)


  useEffect(()=>{
    setTotal(getTotalPrice())
    setTotalQuantity(getTotalQuantity())
  },[])

  const[modal,setModal]=useState(false)

  const handleModal = () => {
    setModal(prev => !prev);
  }

  const handleShareToWhatsApp = () => {
    
    const phoneNumber = '50219524'; 
    
    const messageItems = cart.map(item => {
        return `${item.name}, Precio: ${item.price}, Cantidad: ${item.quantity}`;
    }).join('\n');

    const message = `${messageItems}\nTotal a pagar: ${total},  Direccion: ${address}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  };

  const checkoutFunction = () => {
    handleShareToWhatsApp()
    clearCart()
  }

  return (
    <div className="h-screen w-full flex flex-col items-center overflow-y-auto pt-16 space-y-4 px-2">
      
      
      {modal ? (
        <div className="modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-3xl shadow-lg w-[40%] max-md:w-[80%] max-h-[80vh] p-8 flex flex-col gap-6 overflow-auto">
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

          <button 
            onClick={()=>checkoutFunction()}
            className="mt-4 cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg py-3 shadow-lg transition"
          >
            Checkout
          </button>
        </div>
      ): ''}


      {cart.length > 0 ? (
        cart.map((item) => (
          <CartCard 
            key={item.id} 
            item={item} 
          />
        ))
      ) : (
        <p className="text-gray-500 text-lg mt-10">Carrito Vacio</p>
      )}

      <button 
        className="checkout-btn mt-6 mb-2 cursor-pointer w-full max-w-xl p-4 bg-blue-600 text-white rounded-2xl shadow hover:bg-blue-700 transition"
        onClick={()=>handleModal()}
      >
        Proceed to Checkout
      </button>
    </div>
  )
}

export default Cart
