import useCartStore from "../store/CartSlice"

const ProductCard = ({ product }) => {

  const addToCart = useCartStore(state=>state.addToCart) 

  return (
    <div className="w-60 max-md:w-40 h-85 max-md:h-70 bg-gray-50 p-3 flex flex-col items-center gap-1 rounded-2xl m-2 border border-grey-500">
      <img
        src={product.image}
        alt="product" 
        className="h-48 w-48 rounded-xl" 
      />
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-col w-full">
            <span className="text-xl font-bold">{product.name}</span>
            <span className="font-bold text-green-600">$: {product.price}</span>
          </div>
        </div>
        <button 
          onClick={()=>addToCart(product)}
          className="text-gray-50 bg-linear-to-r from-[#5289e7] to-[#65f8d8] hover:from-[#65f8d8] hover:to-[#5289e7] py-2 rounded-md cursor-pointer"
        >
          Add to cart
        </button>

      </div>
    </div>
  )
}

export default ProductCard
