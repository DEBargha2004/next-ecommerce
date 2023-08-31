'use client'

import { useContext, useState } from 'react'
import Counter from './Counter'
import { addToCart } from '@/functions/addToCart'
import { GlobalAppState } from '@/context/Appstate'
import { useUser } from '@clerk/nextjs'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'
import { checkout } from '../functions/checkout'

function AddandBuy ({ userId, product }) {
  const [count, setCount] = useState(0)
  const { setCart } = useContext(GlobalAppState)
  const { user } = useUser()
  const router = useRouter()
  const notify = () => toast.error('Select atleast 1 item to continue')
  return (
    <>
      <h1 className='text-4xl font-semibold text-slate-600 mt-5'>
        ₹{product.price * (count || 1)}
      </h1>
      <div>
        <Counter
          count={count}
          increment={val =>
            setCount(prev => {
              if (prev + val < 0) return prev
              return prev + val
            })
          }
        />
        <div className='flex justify-between items-center mt-5 w-fit'>
          <button
            className='px-4 py-2 rounded-full border border-green-950 mx-2 transition-all hover:bg-green-950 text-green-950 font-semibold hover:text-white'
            onClick={() =>
              addToCart({ setCart, count, userId: user?.id, product })
            }
          >
            Add to Cart
          </button>
          <button
            className='px-4 py-2 rounded-full bg-amber-400 transition-all mx-2 font-semibold'
            onClick={() => {
              if (count <= 0) {
                notify()
              } else {
                checkout({ product, quantity: count, router })
              }
            }}
          >
            Buy Now
          </button>
        </div>
        <ToastContainer />
      </div>
    </>
  )
}

export default AddandBuy
