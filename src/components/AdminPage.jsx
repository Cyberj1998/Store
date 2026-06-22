import React from 'react'
import { useState, useEffect } from 'react';
import deleteIcon from '../assets/images/delete.png'

//-------------------appwrite credentials
import { Query } from 'appwrite';
import { Client, TablesDB, Databases } from 'appwrite'
const PROJECT_ID = import.meta.env.VITE_PUBLIC_PROJECT_ID;
const ENDPOINT = import.meta.env.VITE_PUBLIC_ENDPOINT;
const DATABASE_ID = import.meta.env.VITE_PUBLIC_DATABASE_ID;



const AdminPage = () => {

  //---------------------------------appwrite implementation
  const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID);
  const databases = new Databases(client);
  const tablesDB = new TablesDB(client);
  const[orders,setOrders]=useState([])
  const[codeToVerify,setCodeToVerify]=useState('')

  const handleCallOrders = async () => {
    try {
      const response = await tablesDB.listRows(DATABASE_ID, "orders");
     setOrders(response.rows)

    } catch (error) {
      console.log(error);
    }
  };

  //------------------------function to verify payment

  const handleVerifyPayment = async (codeToVerify) => {
    try {
      const codeNumberFormat = parseInt(codeToVerify)
      const response = await databases.listDocuments(
        DATABASE_ID, 
        'orders', 
        [Query.equal('code', codeNumberFormat)] 
      );

      if (response.total > 0) {
        const targetDocumentId = response.documents[0].$id;

        await databases.updateDocument(
          DATABASE_ID,
          'orders',
          targetDocumentId,
          { pay: true }
        );

        console.log('Payment updated successfully');
        alert('Pago confirmado')
        setCodeToVerify('')
        return { success: true };
      } else {
        return { success: false, message: 'Código inválido' };
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      alert('Error Verificando el pago')
      return { success: false, message: error.message };
    }
  };

  //-------------------------handleDeleteOrder---------------

  const handleDeleteOrder = async (idToDelete) => {
    try {
      await databases.deleteDocument(
        DATABASE_ID,
        'orders',
        idToDelete
      );
      console.log('Order deleted successfully');
      alert('Order deleted successfully')
    } catch (error) {
      console.error('Error deleting order:', error);
      alert(`Error: ${error}`)
    }
  };

  useEffect(()=>{
    handleCallOrders()
  },[])

  return (
    <div className='h-screen overflow-y-scroll w-full flex justify-start items-center flex-col'>
      <div className='flex flex-col justify-center items-center'>
        <label htmlFor="code" className="text-sm font-medium text-gray-600">Introduzca codigo de confirmacion</label>
        <input
          id="code" 
          type="text" 
          placeholder="Destinatario"
          value={codeToVerify}
          onChange={(e) => setCodeToVerify(e.target.value)}
          className="resize-none border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
        <button onClick={()=>handleVerifyPayment(codeToVerify)} className='className="mt-4 cursor-pointer bg-linear-to-r from-[#5289e7] to-[#65f8d8] hover:from-[#65f8d8] hover:to-[#5289e7] text-white font-semibold rounded-lg py-3 shadow-lg transition duration-500" w-45 m-3'>
          Verificar
        </button>
      </div>
      {
        orders.map((order) => (
          <div key={order.$id} className="bg-white rounded-xl shadow-md p-6 m-5 w-[90%] mx-auto border border-gray-100">
            <button onClick={()=>handleDeleteOrder(order.$id)} className='bg-black cursor-pointer h-6.5 w-6.5 rounded-2xl'>
              <img src={deleteIcon} alt="borrar" />
            </button>
            {/* Header */}
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Order #{order.code}</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                order.pay ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                {order.pay ? 'Pagado' : 'Pendiente'}
              </span>
            </div>

            {/* Shipping Info */}
            <div className="mb-4 space-y-1">
              <p className="text-sm text-gray-500"><span className="font-medium">Entregar:</span> {order.receiver}</p>
              <p className="text-sm text-gray-500"><span className="font-medium">Direccion:</span> {order.address}</p>
              <p className="text-sm text-gray-500"><span className="font-medium">Total:</span> <span className="font-bold">${order.total}</span></p>
            </div>

            {/* Products */}
            <div className="mt-3 pt-3 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Products ({JSON.parse(order.products).length})</h4>
              <div className="space-y-2">
                {JSON.parse(order.products).map((product, index) => (
                  <div key={index} className="flex items-center gap-3 bg-gray-50 rounded-lg p-2">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-10 h-10 rounded object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{product.name}</p>
                      <p className="text-sm font-medium text-gray-800">${product.price}</p>
                      <p className="text-sm font-medium text-gray-800">cantidad: {product.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default AdminPage
