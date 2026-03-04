import useCartStore from "../store/CartSlice"

const ProductCard = ({ product }) => {

  const addToCart = useCartStore(state=>state.addToCart) 

  return ( 
    <div className="w-70 md:w-60 max-md:w-50 max-sm:w-40 h-auto max-md:h-auto bg-white p-4 flex flex-col items-center gap-4 rounded-3xl m-3 border border-gray-300 shadow-md hover:shadow-xl transition-shadow duration-300">
      <img
        src={product.image}
        alt={product.name}
        className="h-50 w-50 max-md:h-40 max-md:w-40 rounded-2xl"
      />
      <div className="flex flex-col gap-3 w-full text-center max-md:text-left">
        <h3 className="text-2xl font-semibold text-gray-900 truncate">{product.name}</h3>
        <span className="text-[12px] text-[#808080]">{product.category}</span>
        <span className="text-lg font-bold text-green-600">${product.price}</span>
      </div>
      <button
        onClick={() => addToCart(product)}
        className="w-full bg-linear-to-r from-[#5289e7] to-[#65f8d8] hover:from-[#65f8d8] hover:to-[#5289e7] text-white py-3 rounded-xl font-medium shadow-md transition duration-500 active:scale-95 cursor-pointer"
      >
        Add to cart
      </button>
    </div>
  )
}

export default ProductCard
