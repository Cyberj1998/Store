import products from "../constants/products"
import ProductCard from "./ProductCard"
import { useEffect, useState } from "react"

const Shop = ({ searchValue, selectedCategory }) => {

  const[filteredProducts,setFilteredProducts]=useState(products)

  useEffect(() => {
    let filtered = products;

    if (searchValue) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    if (selectedCategory && selectedCategory !== '') {
      filtered = filtered.filter(product =>
        product.category === selectedCategory
      );
    }

    setFilteredProducts(filtered);
  }, [searchValue, selectedCategory]);

  return (
      <div className="w-full py-27 mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 overflow-y-auto">
        {filteredProducts.map(product => (
          <ProductCard 
            key={product.id}
            product={product}
            className="w-full transform hover:scale-105 transition-transform duration-300 shadow-lg rounded-lg bg-white"
          />
        ))}
      </div>
  )
}

export default Shop
