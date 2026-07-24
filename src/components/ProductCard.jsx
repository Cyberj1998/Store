import useCartStore from "../store/CartSlice"
import CartIcon from '../assets/images/cart.png'

const ProductCard = ({ product }) => {

  const addToCart = useCartStore(state=>state.addToCart) 

  return ( 
    <div className="w-full h-auto bg-white p-4 flex flex-col items-center gap-4 rounded-3xl border border-gray-300 shadow-md hover:shadow-xl transition-shadow duration-300">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 md:h-50 object-fill rounded-2xl"
      />
      <div className="flex flex-col gap-3 w-full text-center">
        <h3 className="text-2xl font-semibold text-gray-900 truncate">{product.name}</h3>
        <span className="text-[12px] text-[#808080]">{product.category}</span>
        <span className="text-lg font-bold text-green-600">${product.price}</span>
      </div>
      <button
        onClick={() => addToCart(product)}
        className="w-full max-md:text-[12px] h-12 flex justify-center items-center bg-linear-to-r from-[#5289e7] to-[#65f8d8] hover:from-[#65f8d8] hover:to-[#5289e7] text-white rounded-xl font-medium max-md:font-sans shadow-md transition duration-500 active:scale-95 cursor-pointer"
      >
        Añadir al carrito
        <img src={CartIcon} className="h-5 w-5 ml-2" />
      </button>
    </div>
  )
}

export default ProductCard
