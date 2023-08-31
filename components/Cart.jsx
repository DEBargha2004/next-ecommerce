'use client'

import { GlobalAppState } from '@/context/Appstate'
import Image from 'next/image'
import { useContext } from 'react'

function Cart () {
  const { cart } = useContext(GlobalAppState)
  return (
    <div className='relative cursor-pointer'>
      <Image
        src='https://cdn-icons-png.flaticon.com/512/833/833314.png'
        height={40}
        width={40}
        alt='cart'
      />
      {cart.length ? (
        <div className='w-5 h-5 bg-green-600 text-white rounded-full flex justify-center items-center text-xs absolute top-[-2px] right-0'>
          {cart.length ? cart.length : null}
        </div>
      ) : null}
    </div>
  )
}

export default Cart
