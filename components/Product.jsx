'use client'

import { useContext } from 'react'
import product from '../assets/headphone_banner.png'
import { GlobalAppState } from '@/context/Appstate'
import { cloneDeep } from 'lodash'

function Product () {
  const { setCart } = useContext(GlobalAppState)
  const addToCart = () => {
    setCart(prev => {
      prev = cloneDeep(prev)
      const item = prev.find(item => item.id === 'abc')
      if (item) {
        item.quantity += 1
      } else {
        prev.push({
          id: 'abc',
          name: 'Boat Ultra',
          description: 'Build for rokerz',
          quantity: 1
        })
      }

      return prev
    })
  }
  return (
    <div className='w-fit'>
      <div className='h-[250px] w-[250px] bg-slate-100 relative rounded p-5 transition-all hover:bg-slate-200 overflow-hidden'>
        <img
          src={product.src}
          alt=''
          className='hover:scale-105 transition-all w-full'
        />
      </div>
      <div className='w-full flex justify-between items-center pt-2 font-bold'>
        <h1 className='w-[150px] truncate'>Boat Ultra</h1>
        <p>₹699</p>
      </div>
      <div>
        <p className='text-xs w-[250px] truncate'>Build for rokerz</p>
      </div>
      <div className='my-2'>
        <button
          className='text-sm px-3 py-1 rounded-full border border-green-950 hover:bg-green-950 hover:text-white transition-all'
          onClick={addToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default Product
