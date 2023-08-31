'use client'

import { useContext } from 'react'
import { GlobalAppState } from '@/context/Appstate'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { addToCart } from '@/functions/addToCart'

function Product ({ item: product }) {
  const { setCart } = useContext(GlobalAppState)
  const { user } = useUser()

  return (
    <Link href={`/${product?.id}`}>
      <div className='w-fit cursor-pointer'>
        <div className='h-[250px] w-[250px] relative rounded transition-all overflow-hidden'>
          <img src={product?.image} alt='' className=' w-full' />
        </div>
        <div className='w-full flex justify-between items-center pt-2 font-bold'>
          <h1 className='w-[150px] truncate'>{product?.title}</h1>
          <p>₹{product?.price}</p>
        </div>
        <div>
          <p className='text-xs w-[250px] truncate'>{product?.description}</p>
        </div>
        <div className='my-2'>
          <button
            className='text-sm px-3 py-1 rounded-full border border-green-950 hover:bg-green-950 hover:text-white transition-all'
            onClick={() =>
              addToCart({ setCart, count: 1, userId: user?.id, product })
            }
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  )
}

export default Product
