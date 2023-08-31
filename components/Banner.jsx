import headphone from '../assets/headphone_banner.png'
import Image from 'next/image'

function Banner () {
  return (
    <section className='flex justify-between px-[50px] py-[30px] items-center bg-orange-100 rounded-lg my-5'>
      <div className='max-w-[45%]'>
        <h1 className='text-[35px] font-semibold text-green-950 '>
          Grab Upto 50% Off On Selected Headphone
        </h1>
        <button className='px-4 py-2 rounded-full bg-green-950 text-white mt-5'>
          Buy Now
        </button>
      </div>
      <div>
        <img
          src={headphone.src}
        //   height={250}
        //   width={250}
          className='mr-[60px] md:mr-[100px] w-[80%]'
          alt=''
        />
      </div>
    </section>
  )
}

export default Banner
