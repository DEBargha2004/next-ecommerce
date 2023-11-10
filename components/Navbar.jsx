import logo from '../assets/ecommerce_logo.jpg'
import Image from 'next/image'
import Cart from './Cart'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'

function Navbar () {
  return (
    <div className='flex items-center justify-between'>
      <Image src={logo.src || logo} height={50} width={50} alt='app-logo' />
      <div className='flex gap-3 items-center justify-between'>
        <Link href={'/orders'}>
          <Image
            src='https://cdn-icons-png.flaticon.com/512/5161/5161308.png'
            height={40}
            width={40}
          />
        </Link>
        <Link href={`/cart`}>
          <Cart />
        </Link>
        <UserButton />
      </div>
    </div>
  )
}

export default Navbar
