import React from 'react'
import ing1 from '../assets/assets/frontend_assets/play_store.png'
import img2 from '../assets/assets/frontend_assets/app_store.png'
function Footer() {
  return (
    <>
    <div>
      <h1 className='text-2xl text-center font-black mb-[30px]'>For Better Experience Download<br/>
        Tomato App</h1>
        <div className='flex align-middle justify-center'>
        <img src={ing1}/>
        <img src={img2}/>
        </div>
    </div>
    </>
  )
}

export default Footer
