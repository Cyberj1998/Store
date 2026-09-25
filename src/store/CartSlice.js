import { create } from "zustand";

// Helper to round a number to 2 decimal places (for money)
const roundToTwo = (num) => Math.round(num * 100) / 100;

const useCartStore = create((set, get) => ({
  cart: [],
  databaseCache: [],
  popularProducts: [],

  //---------------add to cache
  addToCache: (product) => {
    const cache = get().databaseCache;
    const exists = cache.find((item) => item.$id === product.$id);

    if (!exists) {
      set({ databaseCache: [...cache, product] });
    }
  },

  //---------------add to populars
  addToPopulars: (product) => {
    const cache = get().popularProducts;
    const exists = cache.find((item) => item.$id === product.$id);

    if (!exists) {
      set({ popularProducts: [...cache, product] });
    }
  },

  //-----------------------------add to cart
  addToCart: (product, quantity = 1) => {
    const cart = get().cart;
    const existing = cart.find((item) => item.$id === product.$id);
    if (existing) {
      set({
        cart: cart.map((item) =>
          item.$id === product.$id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        ),
      });
    } else {
      set({ cart: [...cart, { ...product, quantity }] });
    }
  },

  //--------------------------remove from cart
  removeFromCart: (productId) => {
    set({ cart: get().cart.filter((item) => item.$id !== productId) });
  },

  //------------------------increase quantity
  increaseQuantity: (productId) => {
    set({
      cart: get().cart.map((item) =>
        item.$id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    });
  },

  //---------------------decrease quantity
  decreaseQuantity: (productId) => {
    set({
      cart: get()
        .cart.map((item) =>
          item.$id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0),
    });
  },

  //---------------------get total quantity
  getTotalQuantity: () => {
    return get().cart.reduce((total, product) => total + product.quantity, 0);
  },

  //--------------get total price (rounded to 2 decimal places)
  getTotalPrice: () => {
    const total = get().cart.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );
    return roundToTwo(total); // Round to avoid floating-point errors
  },

  //-----------------clean cart
  clearCart: () => set({ cart: [] }),
}));

export default useCartStore;