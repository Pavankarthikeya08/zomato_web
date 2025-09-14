import { create } from 'zustand';

const useCartStore = create((set, get) => ({
  cart: [],
 total:0,
  addToCart: (item) => {
    const cart = get().cart;
    const updatedCart = [...cart];
    const index = updatedCart.findIndex((ele) => ele._id === item._id);

    if (index !== -1) {
      updatedCart[index] = {
        ...updatedCart[index],
        quantity: updatedCart[index].quantity + 1,
      };
    } else {
      updatedCart.push({ ...item, quantity: 1 });
    }

    set({ cart: updatedCart });
  },

  removeFromCart: (item) => {
    const cart = get().cart;
    const updatedCart = [...cart];
    const index = updatedCart.findIndex((ele) => ele._id === item._id);

    if (index !== -1) {
      updatedCart[index] = {
        ...updatedCart[index],
        quantity: updatedCart[index].quantity - 1,
      };

      if (updatedCart[index].quantity === 0) {
        updatedCart.splice(index, 1);
      }
    }

    set({ cart: updatedCart });
  },

  getTotal:()=>{
    set({total:0})
    let tot=get().total;
    const cart1=get().cart;
    cart1.map(ele=>{
      tot=tot+(ele.quantity*ele.price)
    })
     set({total:tot});
  }
}));

export default useCartStore;
