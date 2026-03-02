import products from "../constants/products"
import ProductCard from "./ProductCard"

const Shop = () => {
  return (
    <div className="h-screen w-full">
      <div className="h-full w-full overflow-y-scroll mt-12.5 flex flex-wrap justify-center items-start">
        {
            products.map((product)=>(
            <ProductCard 
                key={product.id}
                product={product}
            />
            ))
        }
      </div>
    </div>
  )
}

export default Shop
