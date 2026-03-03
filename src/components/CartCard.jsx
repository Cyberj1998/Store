import Minus from '../assets/images/minus.png'
import Plus from '../assets/images/plus.png'
import Delete from '../assets/images/delete.png'
import useCartStore from '../store/CartSlice'

const CartCard = ({ item }) => {

  const increaseQuantity = useCartStore(state=>state.increaseQuantity)
  const decreaseQuantity = useCartStore(state=>state.decreaseQuantity)
  const removeFromCart = useCartStore(state=>state.removeFromCart)

  return (
    <div className="border border-black h-30 w-[90%] m-2 shrink-0 rounded-2xl flex flex-row justify-between items-center p-2 relative">
      <div className="flex flex-col justify-center items-center">
        <img 
          src={item.image}
          alt="product image" 
          className="h-25 max-md:h-20 w-25 max-md:w-20"
        />
        <p className="text-[15px] max-md:text-[12px] font-semibold">
          {item.name}
        </p>
      </div>

      <div className="h-30 w-[20%] max-md:w-[40%] flex flex-row justify-evenly items-center">
        <button onClick={()=>decreaseQuantity(item.id)}>
          <img 
            src={Minus}
            alt="left" 
            className='bg-black rounded-full h-12.5 max-md:h-8 cursor-pointer'
          />
        </button>
        <p className="text-[20px] max-md:text-[25px] font-semibold">
          {item.quantity}
        </p>
        <button onClick={()=>increaseQuantity(item.id)}>
          <img 
            src={Plus}
            alt="right" 
            className='bg-black rounded-full h-12.5 max-md:h-8 cursor-pointer'
          />
        </button>
      </div>

      <p className='text-[20px] max-md:text-[15px] font-semibold mr-12'>
        $: {item.price}
      </p>

      <button 
        onClick={()=>removeFromCart(item.id)}
        className='absolute top-0 right-0 m-2 cursor-pointer'
      >
        <img 
          src={Delete}
          alt="delete" 
          className='h-8 bg-black rounded-full'
        />
      </button>
    </div>
  )
}

export default CartCard
