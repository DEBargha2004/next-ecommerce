'use client'

import { GlobalAppState } from '@/context/Appstate'
import { checkout } from '@/functions/checkout'
import { useRouter } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'

export default function Page () {
  const { orders, itemsInfo } = useContext(GlobalAppState)
  const router = useRouter()
  const [subTotal, setSubTotal] = useState(0)
  const handleCheckout = () => {
    checkout({ products: cart, router })
  }
  useEffect(() => {
    let sum = 0
    orders.map(product => {
      sum += product.prod_price * product.prod_quantity
    })
    setSubTotal(Number(sum.toFixed(2)))
  }, [orders])
  return (
    <main className='flex items-start justify-between'>
      <section className='w-[65%]'>
        {itemsInfo.map((product, productIndex) => {
          return (
            <div
              className='flex border-2 rounded-lg border-slate-200 my-5 p-5'
              key={productIndex}
            >
              <div className='flex justify-start items-center'>
                <img
                  src={product?.image}
                  className='w-[200px] h-[200px] object-contain'
                  alt=''
                />
                <div className='max-w-[60%] ml-4'>
                  <h1 className='text-2xl font-semibold my-3'>
                    {product?.title}
                  </h1>
                  <p className='text-sm text-slate-500 line-clamp-3'>
                    {product.description}
                  </p>
                </div>
              </div>
              <div className='flex flex-col justify-center items-end'>
                <h1 className='font-semibold'>
                  ₹{product.price * product?.quantity}
                </h1>
                <p className='whitespace-nowrap text-sm text-slate-500'>
                  Quantity - {product?.quantity}
                </p>
              </div>
            </div>
          )
        })}
      </section>
      <section className='my-5 ml-5 border-2 border-slate-200 rounded-lg w-[35%] p-3 sticky top-[35px]'>
        <h1>Order Summary</h1>
        <table className='text-left'>
          <thead>
            <tr className=''>
              <th>name</th>
              <th>price</th>
              <th>quantity</th>
              <th>total</th>
            </tr>
          </thead>
          <tbody className=''>
            {itemsInfo.map(product => (
              <tr className='my-1' key={product.id}>
                <td className='line-clamp-1 w-[180px]'>{product.title}</td>
                <td>₹{product.price}</td>
                <td>x{product.quantity}</td>
                <td>₹{product.price * product.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <hr />
        <div className='flex justify-between px-3'>
          <p>Subtotal</p>
          <p>₹{subTotal}</p>
        </div>
        <div className='flex justify-between px-3'>
          <p>Shipping</p>
          <p>₹{subTotal ? 10 : 0}</p>
        </div>
        <hr />
        <div className='flex justify-end px-3'>
          <p>₹{subTotal + (subTotal ? 10 : 0)}</p>
        </div>
      </section>
    </main>
  )
}
