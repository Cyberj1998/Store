import products from "../constants/products"
import ProductCard from "./ProductCard"

const Shop = () => {
  return (
    <div className="w-full py-16 mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 overflow-y-auto">
      {products.map(product => (
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
