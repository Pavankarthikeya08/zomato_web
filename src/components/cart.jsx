import React, { useEffect } from 'react';
import useCartStore from './cartstore';
function Cart() {
  const cart = useCartStore((state) => state.cart);
  const total = useCartStore((state) => state.total);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const getTotal = useCartStore((state) => state.getTotal);
  useEffect(() => {
    getTotal();
  }, [cart, getTotal]);

  return (
    <div className="p-4 space-y-4">
      {cart.length === 0 ? (
        <h2>Cart is empty</h2>
      ) : (
        cart.map((ele) => (
          <div key={ele._id} className="flex items-center space-x-4 border p-2 rounded">
            <img src={ele.image} alt={ele.name} width={50} height={50} className="object-cover" />
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{ele.name}</h2>
              <p>Quantity: {ele.quantity}</p>
              <p>Price: ${ele.price}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => removeFromCart(ele)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                -
              </button>
              <button
                onClick={() => addToCart(ele)}
                className="bg-green-500 text-white px-2 py-1 rounded"
              >
                +
              </button>
            </div>
          </div>
        ))
      )}

      {/* Display total */}
      <div className="mt-4 text-xl font-bold">
        Total: ${total}
      </div>
      <div>
      </div>
    </div>
  );
}

export default Cart;
