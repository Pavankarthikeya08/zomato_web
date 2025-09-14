import React, { useState } from 'react';
import { menu_list, top_list, food_list } from '../assets/assets/frontend_assets/assets';
import useCartStore from './cartstore'; // ✅ Import the store

function Menu() {
  const [arr1, setArr1] = useState(top_list);
  const addToCart = useCartStore((state) => state.addToCart); // ✅ Add to cart function

  const filterByCategory = (name) => {
    const filtered = food_list.filter(ele => ele.category === name);
    setArr1(filtered);
  };

  const handleAddToCart = (ele) => {
    addToCart(ele);
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 pt-8 mb-[50px]">
      <h1 className="text-4xl font-bold">Explore Our Menu</h1>
      <p className="my-6 text-gray-600">
        Choose from a diverse menu featuring a delectable array of dishes.
      </p>

      {/* Category menu */}
      <div className="flex gap-6 flex-wrap justify-start mb-10">
        {menu_list.map((ele, idx) => (
          <div
            key={idx}
            className="text-center cursor-pointer"
            onClick={() => filterByCategory(ele.menu_name)}
          >
            <img
              src={ele.menu_image}
              className="w-24 h-24 object-cover rounded-full hover:scale-105 transition"
            />
            <p className="mt-2 text-sm font-medium">{ele.menu_name}</p>
          </div>
        ))}
      </div>

      {/* Top dishes */}
      <h2 className="text-2xl font-bold mb-6">Top Dishes for You</h2>
      <div className="flex flex-wrap gap-6 justify-start">
        {arr1.map((ele, idx) => (
          <div key={idx} className="w-[280px] bg-white rounded-xl shadow p-4 text-center">
            <img
              src={ele.image}
              alt={ele.name}
              className="w-full h-48 object-cover rounded cursor-pointer"
            />
            <div className="mt-4">
              <p className="text-lg font-semibold">{ele.name}</p>
              <p className="text-sm text-gray-600">{ele.description}</p>
              <p className="text-blue-600 font-bold mt-2">${ele.price}</p>
              <button
                className="bg-blue-300 border-2 border-b-amber-950 rounded-[10px] text-center px-4 py-2 mt-3 cursor-pointer hover:scale-105 active:scale-95 transition"
                onClick={() => handleAddToCart(ele)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
