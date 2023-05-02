import React from 'react'
import Identicon from 'react-identicons'
import { setGlobalState, truncate, useGlobalState } from '../store'

const imgHero = "https://images.cointelegraph.com/images/1434_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS91cGxvYWRzLzIwMjEtMDYvNGE4NmNmOWQtODM2Mi00YmVhLThiMzctZDEyODAxNjUxZTE1LmpwZWc=.jpg"

export default function Hero() {

   const [connectedAccount] = useGlobalState('connectedAccount')


  return (
    <div className='flex flex-col md:flex-row w-4/5 justify-between
        items-center mx-auto py-10'>
      <div className='md:w-3/6 w-full'>
        <div>
            <h1 className='text-white text-5xl font-bold'>
                Buy and Sell <br></br> Digital Arts,                     
                <br/> <span className='text-gradient'>NFTs</span> Collections
            </h1>
            <p className='text-gray-500 font-semibold text-sm'>Mint and collect NFTs around.</p>
        </div>

        <div className='flex mt-5'>
            <button 
                className='shadow-xl shadow-black text-white
                bg-[#e32970] hover:bg-[#bd255f] rounded-full p-2'
                onClick={()=>setGlobalState('modal','scale-100')}>
                Create NFT
             </button>
        </div>

        <div className='w-3/4 flex justify-between items-center mt-5'>
            <div className='text-white'>
                <p className='font-bold'>123k</p>
                <small className='text-gray-300'>User</small>
            </div>

            <div className='text-white'>
                <p className='font-bold'>152k</p>
                <small className='text-gray-300'>Artworks</small>
            </div>

            <div className='text-white'>
                <p className='font-bold'>200k</p>
                <small className='text-gray-300'>Artists</small>
            </div>
        </div>

      </div>

      <div className='shadow-xl shadow-black md:w-2/5 w-full
        mt-10 md:mt-0 rounded-md overflow-hidden bg-gray-800'>
        <img 
            className='h-60 w-full object-cover' 
            src={imgHero} alt='Hero'/>

        <div className='flex justify-start items-center p-3'>
            <Identicon
             className="h-10 w-10 object-contain rounded-full mr-3"
             string = {connectedAccount} size={50} />
            <div>
                <p className='text-white font-semibold'>
                    {truncate(connectedAccount, 4, 4, 11)}
                </p>
                <small className='text-pink-800 font-bold'>@you</small>
            </div>
        </div>

      </div>

    </div>
  )
}
