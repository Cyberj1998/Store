import Minus from '../assets/images/minus.png'
import Plus from '../assets/images/plus.png'
import Delete from '../assets/images/delete.png'
import useCartStore from '../store/CartSlice'

const CartCard = ({ item }) => {

  const increaseQuantity = useCartStore(state=>state.increaseQuantity)
  const decreaseQuantity = useCartStore(state=>state.decreaseQuantity)
  const removeFromCart = useCartStore(state=>state.removeFromCart)

  return (  
    <div className="rounded-2xl flex items-center justify-between p-4 m-2 w-[90%] max-w-xl relative shrink-0 border border-gray-300 shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col items-center justify-center gap-2">
        <img 
          src={item.image} 
          alt="product image" 
          className="h-24 w-24 max-md:h-16 max-md:w-16 object-contain"
        />
        <p className="text-sm max-md:text-xs font-semibold text-center">
          {item.name}
        </p>
      </div>

      <div className="flex items-center justify-evenly w-[20%] max-md:w-[40%] gap-2">
        <button onClick={() => decreaseQuantity(item.id)} aria-label="decrease quantity">
          <img 
            src={Minus} 
            alt="minus" 
            className="bg-black rounded-full h-12 max-md:h-8 w-12 max-md:w-8 cursor-pointer p-1"
          />
        </button>
        <p className="text-lg max-md:text-xl font-semibold">{item.quantity}</p>
        <button onClick={() => increaseQuantity(item.id)} aria-label="increase quantity">
          <img 
            src={Plus} 
            alt="plus" 
            className="bg-black rounded-full h-12 max-md:h-8 w-12 max-md:w-8 cursor-pointer p-1"
          />
        </button>
      </div>

      <p className="text-lg max-md:text-sm font-semibold mr-12">
        ${item.price}
      </p>

      <button 
        onClick={() => removeFromCart(item.id)} 
        className="absolute top-2 right-2 cursor-pointer"
        aria-label="remove item"
      >
        <img 
          src={Delete} 
          alt="delete" 
          className="h-8 w-8 bg-black rounded-full p-1"
        />
      </button>
    </div>
  )
}

export default CartCard
