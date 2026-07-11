import ProductCard from "./ProductCard"
import { useEffect, useState } from "react"
import { Client, TablesDB, Query } from "appwrite"
import useCartStore from "../store/CartSlice";
import { useMemo } from "react";
//import products from '../constants/products'
//-----------------appwrite credentials

const PROJECT_ID = import.meta.env.VITE_PUBLIC_PROJECT_ID;
const ENDPOINT = import.meta.env.VITE_PUBLIC_ENDPOINT;
const DATABASE_ID = import.meta.env.VITE_PUBLIC_DATABASE_ID;

const Shop = ({ category, search }) => {

  //------------------------states
  const databaseCache = useCartStore((state)=>state.databaseCache)
  const addToCache = useCartStore((state)=>state.addToCache)
  const [offset, setOffset] = useState(0);
  const LIMIT = 10;

  //------------------------appwrite database code

  const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID);
  const tablesDB = new TablesDB(client);
  
  const handleCallRows = async (currentOffset = offset) => {
    try {
      const response = await tablesDB.listRows(
        DATABASE_ID, 
        "products", 
        [
          Query.limit(LIMIT),
          Query.offset(currentOffset) 
        ]
      );

      const newRows = response.rows;
      if (newRows.length > 0) {
        newRows.forEach(product => addToCache(product));
      }
    } catch (error) {
      console.error(error);
    } 
  };



  //----------------------psgination function
  const handlePagination = () => {
    const nextOffset = offset + LIMIT;
    setOffset(nextOffset);       
    handleCallRows(nextOffset);   
  };

  //-------------------handle call rows by category

  const handleCallByCategory = async (selectedCategory) => {
    try {
      const response = await tablesDB.listRows(DATABASE_ID, "products", [
        Query.equal("category", selectedCategory), 
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

  const handleCategory = async (category) => {
    await handleCallByCategory(category);
  };

  //--------------------use effect 

  useEffect(()=>{
    handleCategory(category)
  },[category])
  
  useEffect(() => {
    if(databaseCache.length === 0){
      handleCallRows(0); 
    }
  }, []);


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
     
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4">
        {filteredProducts.length != 0 ? filteredProducts.map(product => (
          <ProductCard 
            key={product.$id}
            product={product}
            className="w-full transform hover:scale-105 transition-transform duration-300 shadow-lg rounded-lg bg-white"
          />
        )) : <p className="text-blue-400 text-[20px] relative">Cargando...</p>}
      </div>

      <div className="flex justify-center py-10">
        <button onClick={()=>handlePagination()} className="bg-linear-to-r from-[#5289e7] to-[#65f8d8] hover:from-[#65f8d8] hover:to-[#5289e7] text-white py-3 rounded-xl font-medium shadow-md transition duration-500 active:scale-95 cursor-pointer h-12.5 w-80">
          Cargar Mas...
        </button>
      </div>
    </div>

  )
}

export default Shop
