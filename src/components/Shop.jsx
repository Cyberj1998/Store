import ProductCard from "./ProductCard"
import { useEffect, useState } from "react"
import { Client, TablesDB, Query } from "appwrite"
//-----------------appwrite credentials

const PROJECT_ID = import.meta.env.VITE_PUBLIC_PROJECT_ID;
const ENDPOINT = import.meta.env.VITE_PUBLIC_ENDPOINT;
const DATABASE_ID = import.meta.env.VITE_PUBLIC_DATABASE_ID;

const Shop = () => {

  const[products,setProducts]=useState([])

  //------------------------appwrite database code

  const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID);
  const tablesDB = new TablesDB(client);

  const handleCallRows = async () => {
    try {
      const response = await tablesDB.listRows(DATABASE_ID, "products");

      const newRows = response.rows 

      setProducts(newRows)
      console.log(newRows)
    } catch (error) {
      console.log(error);
    } 
  };

  useEffect(()=>{
    handleCallRows()
  },[])

  return (
      <div className="w-full py-27 mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 overflow-y-auto">
        {products.map(product => (
          <ProductCard 
            key={product.$id}
            product={product}
            className="w-full transform hover:scale-105 transition-transform duration-300 shadow-lg rounded-lg bg-white"
          />
        ))}
      </div>
  )
}

export default Shop
