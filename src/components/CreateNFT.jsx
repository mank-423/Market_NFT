import React, { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { setAlert, setGlobalState, setLoadingMsg, useGlobalState } from '../store';
const imgHero = "https://images.cointelegraph.com/images/1434_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS91cGxvYWRzLzIwMjEtMDYvNGE4NmNmOWQtODM2Mi00YmVhLThiMzctZDEyODAxNjUxZTE1LmpwZWc=.jpg"
import { create } from 'ipfs-http-client'
import { mintNFT } from '../Blockchain.services';

const auth =
  'Basic ' +
  Buffer.from(
    '2PDx6QYfgXirezOxZpmQvK6QFSu' + ':' + '9cbc0e054a36975da04839649726bdcc',
  ).toString('base64')

const client = create({
    host: 'ipfs.infura.io',
    port: '5001',
    protocol: 'https',
    headers: {
        authorization: auth,
    },
})


export default function CreateNFT() {

    const [modal] = useGlobalState('modal')
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [fileUrl, setfileUrl] = useState("");
    const [imgBase64, setImgBase64] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !description || !price) return

        setGlobalState('modal', 'scale-0')
        setLoadingMsg('Uploading to IPFS...')

        try {
            const created = await client.add(fileUrl);
            setLoadingMsg('Uploaded, approved transaction')
            const metadataURI = `https://ipfs.io/ipfs/${created.path}`
            const nft = { title, description, price, metadataURI }

            await mintNFT(nft)

            closeModal()
            setAlert('Minting Completed')

            window.location.reload()
            
        } catch (error) {
            console.log("Error uploading files:", error);
            setAlert('Minting failed', 'red');
        }

        closeModal()
    }

    const changeImage = async (e) => {
        const reader = new FileReader()
        if (e.target.files[0]) reader.readAsDataURL(e.target.files[0])

        reader.onload = (readerEvent) => {
            const file = readerEvent.target.result
            setImgBase64(file)
            setfileUrl(e.target.files[0])
        }
    }

    const closeModal = () => {
        setGlobalState('modal', 'scale-0')
        resetForm()
    }


    const resetForm = () => {
        setfileUrl("")
        setImgBase64(null)
        setTitle("")
        setPrice("")
        setDescription("")
    }



    return (
        <div className={`fixed top-0 left-0 w-screen h-screen flex 
        items-center justify-center bg-black bg-opacity-50 
        transform transition-transform duration-300 ${modal}`}>
            <div className='bg-[#151c25] shadow-xl 
            shadow-[#e32970] rounded-xl 
            w-11/12 md:w-2/5 h-7/12 p-6'
            >
                <form onSubmit={handleSubmit} className='flex flex-col'>
                    <div className='flex justify-between items-center text-gray-400'>
                        <p className='font-semibold'>Add NFT</p>
                        <button
                            type='button'
                            onClick={closeModal}
                            className='border-0 background-transparent first-letter:focus:outline-none'
                        >
                            <FaTimes className="text-gray-400" />
                        </button>
                    </div>

                    <div className='flex justify-center items-center rounded-xl mt-5'>
                        <div className='shrink-0 h-20 w-20 rounded-xl overflow-hidden'>
                            <img className='h-full w-full object-cover cursor-pointer' src={imgBase64 || imgHero} alt="NFT" />
                        </div>
                    </div>

                    <div className='flex justify-between items-center bg-gray-800 rounded-xl mt-5'>
                        <label className='block'>
                            <span className='sr-only'>Choose Profile Photo</span>
                            <input type="file"
                                accept='image/png, image/gif, image/jpeg, image/jpg, image/webp'
                                className='block w-full text-sm text-slate-500 file:mr-4 file:py-2
                                file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold
                                hover:file:bg-[#1d2631] focus:outline-none cursor-pointer focus:ring-0'
                                required
                                onChange={changeImage}
                            />
                        </label>
                    </div>

                    <div className='flex justify-between items-center bg-gray-800 rounded-xl mt-5'>
                        <input type="text"
                            accept='image/png, image/gif, image/jpeg, image/jpg, image/webp'
                            className='block w-full text-sm text-slate-500 focus:outline-none cursor-pointer focus:ring-0 bg-transparent border-0'
                            placeholder='Title'
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            name='Title'
                            required

                        />
                    </div>

                    <div className='flex justify-between items-center bg-gray-800 rounded-xl mt-5'>
                        <input type="number"
                            accept='image/png, image/gif, image/jpeg, image/jpg, image/webp'
                            className='block w-full text-sm text-slate-500 focus:outline-none cursor-pointer focus:ring-0 bg-transparent border-0'
                            placeholder='Price (ETH)'
                            name='Price'
                            min={0.01}
                            step={0.01}
                            onChange={(e) => setPrice(e.target.value)}
                            value={price}
                            required
                        />
                    </div>

                    <div className='flex justify-between items-center bg-gray-800 rounded-xl mt-5'>
                        <textarea type="text"
                            accept='image/png, image/gif, image/jpeg, image/jpg, image/webp'
                            className='block w-full text-sm text-slate-500 focus:outline-none cursor-pointer focus:ring-0 
                            bg-transparent border-0 h-20 resize-none'
                            placeholder='Description'
                            name='Description'
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            required
                        />
                    </div>

                    <button className='flex justify-center items-center shadow-lg shadow-black text-white
                    bg-[#e32970] hover:bg-[#bd255f] rounded-full w-full text-md p-2 mt-5
                    px-1.5 py-1'>
                        Mint now
                    </button>

                </form>
            </div>
        </div>
    )
}
