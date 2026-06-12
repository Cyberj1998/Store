import ProductCard from "./ProductCard"
import { useEffect, useState } from "react"
import { Client, TablesDB, Query } from "appwrite"
import useCartStore from "../store/CartSlice";
import { useMemo } from "react";
//-----------------appwrite credentials

const PROJECT_ID = import.meta.env.VITE_PUBLIC_PROJECT_ID;
const ENDPOINT = import.meta.env.VITE_PUBLIC_ENDPOINT;
const DATABASE_ID = import.meta.env.VITE_PUBLIC_DATABASE_ID;

const Shop = ({ category, search }) => {

  const databaseCache = useCartStore((state)=>state.databaseCache)
  const addToCache = useCartStore((state)=>state.addToCache)

  //------------------------appwrite database code

  const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID);
  const tablesDB = new TablesDB(client);

  const handleCallRows = async () => {
    try {
      const response = await tablesDB.listRows(DATABASE_ID, "products");

      const newRows = response.rows 

      newRows.forEach(product => {
        addToCache(product)
      });
      console.log(newRows)
    } catch (error) {
      console.log(error);
    } 
  };

  //--------------------use effect 
  useEffect(()=>{
    if(databaseCache.length === 0){
      handleCallRows()
    }else{
      console.log('check')
      return
    }
  },[])

  //--------------------use memo
  const filteredProducts = useMemo(() => {
    const categoryFiltered =
      category === "todo"
        ? databaseCache
        : databaseCache.filter((item) => item.category === category);

    return categoryFiltered.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [category, search, databaseCache]);


  return (
    <div className="w-full h-screen overflow-y-auto py-5 mx-auto flex flex-col">
      {/* The Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4">
        {filteredProducts.map(product => (
          <ProductCard 
            key={product.$id}
            product={product}
            className="w-full transform hover:scale-105 transition-transform duration-300 shadow-lg rounded-lg bg-white"
          />
        ))}
      </div>

      {/* The Button Container */}
      <div className="flex justify-center py-10">
        <button className="bg-linear-to-r from-[#5289e7] to-[#65f8d8] hover:from-[#65f8d8] hover:to-[#5289e7] text-white py-3 rounded-xl font-medium shadow-md transition duration-500 active:scale-95 cursor-pointer h-12.5 w-80">
          Cargar Mas...
        </button>
      </div>
    </div>

  )
}

export default Shop
