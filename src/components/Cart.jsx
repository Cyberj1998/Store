import useCartStore from "../store/CartSlice"
import CartCard from "./CartCard"

const Cart = () => {

  const cart = useCartStore(state=>state.cart)

  return (
    <div className="h-screen w-full border-2 border-red-400 flex flex-col justify-start items-center overflow-y-scroll">
      {
        cart.map((item)=>(
          <CartCard 
            key={item.id}
            item={item}
          />
        ))
      }
    </div>
  )
}

export default Cart
