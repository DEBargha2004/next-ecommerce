import logo from '../assets/ecommerce_logo.jpg'
import Image from 'next/image'
import Cart from './Cart'

function Navbar () {
  return (
    <div className='flex items-center justify-between'>
      <Image src={logo.src || logo} height={50} width={50} alt='' />
      <Cart />
    </div>
  )
}

export default Navbar
