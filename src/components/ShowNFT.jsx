import React from 'react'
import { FaTimes } from 'react-icons/fa'
import Identicon from 'react-identicons'
import { setAlert, setGlobalState, setLoadingMsg, truncate, useGlobalState } from '../store';
import { buyNFT } from '../Blockchain.services';
//const imgHero = "https://images.cointelegraph.com/images/1434_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS91cGxvYWRzLzIwMjEtMDYvNGE4NmNmOWQtODM2Mi00YmVhLThiMzctZDEyODAxNjUxZTE1LmpwZWc=.jpg"


export default function ShowNFT() {

    const [modal] = useGlobalState('showModal')
    const [nft] = useGlobalState('nft')
    const [connectedAccount] = useGlobalState('connectedAccount')

    const onChangePrice = () => {
        setGlobalState('nft', nft)
        setGlobalState('showModal', 'scale-0')
        setGlobalState('updateModal', 'scale-100')
    }

    const handlePurchase = async(e) => {
        
        // setGlobalState('showModal', 'scale-0')
        // setLoadingMsg('Initializing purchase...')

        try {
            setLoadingMsg('Purchasing, awaiting Metamask approval...')

            await buyNFT(nft)
            setAlert('NFT purchased...')
            window.location.reload()

        } catch (error) {
            console.log("Error purchasing:", error);
            setAlert('Purchase failed', 'red')
        }
    }

    const closeModal = () => {
        setGlobalState('showModal', 'scale-0')
    }




    return (
        <div className={`fixed top-0 left-0 w-screen h-screen flex 
        items-center justify-center bg-black bg-opacity-50 
        transform transition-transform duration-300 ${modal}`}>
            <div className='bg-[#151c25] shadow-xl 
            shadow-[#e32970] rounded-xl 
            w-11/12 md:w-2/5 h-7/12 p-6'
            >
                <div className='flex flex-col'>
                    <div className='flex justify-between items-center text-gray-400'>
                        <p className='font-semibold'>Buy NFT</p>
                        <button
                            type='button'
                            onClick={closeModal}
                            className='border-0 background-transparent first-letter:focus:outline-none'
                        >
                            <FaTimes className="text-gray-400" />
                        </button>
                    </div>

                    <div className='flex justify-center items-center rounded-xl mt-5'>
                        <div className='shrink-0 h-20 w-40 rounded-xl overflow-hidden'>
                            <img className='h-full w-full object-cover cursor-pointer'
                                src={nft?.metadataURI}
                                alt={nft?.title} />
                        </div>
                    </div>

                    <div className='flex flex-col justify-start rounded-xl mt-5'>
                        <h4 className='text-white font-semibold'>{nft?.title}</h4>
                        <p className='text-gray-400 text-sm my-1'>
                            {nft?.description}
                        </p>

                        <div className='flex justify-between items-center mt-3 text-white'>
                            <div className='flex justify-start items-center'>
                                <Identicon 
                                    className='h-10 w-10 object-contain rounded-full mr-3' 
                                    string={nft?.owner} 
                                    size={50}
                                />

                                <div className='flex flex-col justify-center items-start'>
                                    <small className='text-white font-bold'>@Owner</small>
                                    <small className='text-pink-800 font-semibold'>{nft?.owner ? truncate(nft?.owner, 4,4,11) : ''}</small>
                                </div>
                            </div>


                            <div className='flex flex-col text-white'>
                                <small className='text-xs'>Current Price</small>
                                <p className='text-sm font-semibold'>{nft?.cost} ETH</p>
                            </div>

                        </div>
                    </div>


                    {connectedAccount == nft?.owner ? (
                        <button className='flex justify-center items-center shadow-lg shadow-black text-white
                    bg-[#e32970] hover:bg-[#bd255f] rounded-full w-full text-md p-2 mt-5
                    px-1.5 py-1' onClick={onChangePrice}>
                            Change Price
                        </button>
                    ) : (
                        <button className='flex justify-center items-center shadow-lg shadow-black text-white
                    bg-[#e32970] hover:bg-[#bd255f] rounded-full w-full text-md p-2 mt-5
                    px-1.5 py-1'
                    onClick={handlePurchase}>
                            Purchase
                        </button>

                    )}
                    {/* <div className='flex justify-between item-center space-x-2'>
                        
                        
                    </div> */}

                </div>
            </div>
        </div>
    )
}
