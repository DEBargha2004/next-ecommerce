import logo from '../assets/ecommerce_logo.jpg'
import Image from 'next/image'
import Cart from './Cart'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'

function Navbar () {
  return (
    <div className='flex items-center justify-between'>
      <Image src={logo.src || logo} height={50} width={50} alt='app-logo' />
      <div className='flex w-[100px] justify-between'>
        <Link href={`/cart`}>
          <Cart />
        </Link>
        <UserButton />
      </div>
    </div>
  )
}

export default Navbar
