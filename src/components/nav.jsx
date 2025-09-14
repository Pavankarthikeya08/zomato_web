import React from 'react';
import search from '../assets/assets/frontend_assets/search_icon.png';
import bag from '../assets/assets/frontend_assets/bag_icon.png';
import { useNavigate } from 'react-router-dom';

function Nav() {
  const nav = useNavigate();

  let navi = () => {
    nav('/cart'); 
  };

  return (
    <div className="w-full bg-white shadow-md">
      <div className="flex items-center justify-between px-4 md:px-10 max-w-[1200px] mx-auto py-3 flex-wrap gap-y-4">
        <h2 className="text-3xl text-amber-700">Zomato</h2>

        <nav className="flex flex-wrap items-center gap-6 text-blue-700">
          <a href="#">Home</a>
          <a href="#">Menu</a>
          <a href="#">Mobile App</a>
          <a href="#">Contact</a>
        </nav>

        <div className="flex items-center gap-6">
          <img src={search} className="cursor-pointer w-5 h-5" alt="search" />
          <img src={bag} className="cursor-pointer w-5 h-5" alt="cart" onClick={navi} />
          
        </div>
      </div>
    </div>
  );
}

export default Nav;
