import Banner from '@/components/Banner'
import Navbar from '@/components/Navbar'
import Product from '@/components/Product'

export default async function Home () {
  let products = await fetch('https://fakestoreapi.com/products', {
    next: { revalidate: 3600 }
  })

  products = await products.json()

  return (
    <div>
      <Navbar />
      <Banner />
      <div className='flex flex-wrap gap-10 justify-evenly px-5'>
        {products?.map(product => (
          <Product key={product.id} item={product} />
        ))}
      </div>
    </div>
  )
}
