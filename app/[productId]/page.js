import AddandBuy from '@/components/AddandBuy'
import Counter from '@/components/Counter'
import Navbar from '@/components/Navbar'
import { auth } from '@clerk/nextjs'
import Image from 'next/image'

export default async function page ({ params }) {
  const { userId } = auth()
  let searchProduct = await fetch(
    `https://fakestoreapi.com/products/${params.productId}`,
    {
      next: { revalidate: 3600 }
    }
  )
  searchProduct = await searchProduct.json()
  return (
    <main>
      <Navbar />
      <div className='flex px-[80px] justify-between items-start mt-10'>
        <div>
          <Image
            height={500}
            width={393}
            src={searchProduct.image}
            className='p-4'
            alt={searchProduct.title}
          />
        </div>
        <div className='w-[60%]'>
          <h1 className='text-5xl leading-[50px] font-bold'>
            {searchProduct.title}
          </h1>
          <article className='text-sm text-slate-400 my-4 leading-5'>
            {searchProduct.description}
          </article>
          <p className='mb-5'>
            {searchProduct.rating.rate}/5 {searchProduct.rating.count}
          </p>
          <hr />

          <AddandBuy userId={userId} product={searchProduct} />
        </div>
      </div>
    </main>
  )
}
