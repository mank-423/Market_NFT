import React, { useEffect, useState } from 'react'
import { BiTransfer } from 'react-icons/bi'
import { MdOpenInNew } from 'react-icons/md'
import { truncate, useGlobalState } from '../store'

export default function Transactions() {

    const [transactions] = useGlobalState('transactions')
    const [end, setEnd] = useState(3)
    const [count] = useState(3)
    const [collection, setCollection] = useState([])

    const getCollection = () => {
        return transactions.slice(0, end)
    }

    useEffect(() => {
        setCollection(getCollection())
    }, [transactions, end])



    return (
        <div className='bg-[#151c25]'>
            <div className='w-4/5 py-10 mx-auto'>
                <h4 className='text-white text-3xl font-bold
                uppercase text-gradient'
                >
                    {collection.length > 0 ? 'Latest Transaction' : 'No Transactions Yet'}
                </h4>

                <div className='grid grid-cols-1 
                    md:grid-cols-2 lg:grid-cols-3 gap-6
                    md:gap-4 lg:gap-2 py-2.5'
                >
                    {collection
                        .map((tx, i) => (
                            <Transaction key={i} tx={tx} />
                        ))}
                </div>

                {collection.length > 0 && transactions.length > collection.length
                    ?
                    (
                        <div className='text-center my-5'>
                            <button className='shadow-lg shadow-black text-white
                    bg-[#e32970] hover:bg-[#bd255f] rounded-full 
                    px-1.5 py-1'
                                onClick={() => setEnd(end + count)}>
                                Load More
                            </button>
                        </div>
                    )
                    :
                    null}
            </div>
        </div>
    )
}

const Transaction = ({ tx }) => (
    <div className='flex justify-between items-center border border-pink-50
            text-gray-400 w-full shadow-xl shadow-black rounded-md overflow-hidden
            bg-gray-800 my=2 p-3'>
        <div className='rounded shadow-sm shadow-pink-500 p-2'>
            <BiTransfer />
        </div>

        <div>
            <h4>NFT Transferred</h4>
            <small className='flex justify-start items-center'>
                <span className='mr-1'>Received By</span>
                <a className='text-pink-500 mr-2' href="#" target='_blank'>
                    {truncate(tx.owner, 4, 4, 11)}
                </a>
                <MdOpenInNew />
            </small>
        </div>

        <p className='text-sm font-medium'> {tx.cost}</p>
    </div>
)
