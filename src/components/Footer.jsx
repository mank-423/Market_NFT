import React from 'react'
import Timeless from '../assets/timeless.png'

export default function Footer() {
  return (
    <div className='w-full flex flex-col md:justify-center justify-between
        items-center p-4 gradient-bg-footer'>
      <div className='w-full flex sm:flex-row flex-col justify-between items-center my-4'>
        
        <div className='flex flex-[0.25] justify-center items-center'>
            <img className='w-32' src={Timeless} alt="Logo" />
        </div>

        <div className='flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full text-base text-center text-white'>
            <p className='cursor-pointer mx-2'>Market</p>
            <p className='cursor-pointer mx-2'>Artist</p>
            <p className='cursor-pointer mx-2'>Features</p>
            <p className='cursor-pointer mx-2'>Community</p>
        </div>

        <div className='flex flex-[0.25] justify-center items-center'>
            <p className='text-white text-right text-sm'>©:2023 Built by Mank</p>
        </div>

      </div>
    </div>
  )
}
