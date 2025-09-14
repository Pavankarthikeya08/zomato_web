import React from 'react'
import img1 from '../assets/assets/frontend_assets/header_img.png'

function Head() {
  return (
    <div className="relative h-[600px] overflow-hidden px-4 md:px-[100px]">
      <img
        src={img1}
        className="absolute top-0 left-0 right-0 mx-auto h-[600px] w-[1250px] mt-[50px] object-cover rounded-lg z-[-1]"
        alt="Header Background"
      />
      <div className="pt-[200px] max-w-[800px] mx-auto text-white">
        <h2 className="text-amber-100 text-6xl leading-tight">
          Order your favourite <br /> food here
        </h2>
        <p className="pt-[50px] text-amber-50">
          Choose from a diverse menu featuring a delectable array of dishes crafted with the finest
          <br />
          ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your
          <br />
          dining experience, one delicious meal at a time.
        </p>
        <button className="mt-[30px] border border-amber-50 rounded-2xl p-[10px] text-blue-300 bg-amber-50">
          View Menu
        </button>
      </div>
    </div>
  )
}

export default Head
