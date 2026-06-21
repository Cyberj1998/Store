import React from 'react'
import { useState, useEffect } from 'react';

//-------------------appwrite credentials
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

  const handleCallOrders = async () => {
    try {
      const response = await tablesDB.listRows(DATABASE_ID, "orders");
     setOrders(response.rows)

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    handleCallOrders()
  },[])

  return (
    <div className='h-screen overflow-y-scroll w-full flex justify-start items-center flex-col'>
      {
        orders.map((order) => (
          <div key={order.$id} className="bg-white rounded-xl shadow-md p-6 m-5 w-[90%] mx-auto border border-gray-100">
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
                      <p className="text-xs text-gray-500">${product.price}</p>
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
