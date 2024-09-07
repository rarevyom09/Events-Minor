import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className=' flex p-2 justify-between bg-purple-200 items-center'>
      <div className='logo'>
        <span className=' border-[1px] rounded-md border-purple-500 p-1 bg-purple-200'>
          <span className='font-light text-lg'>Atomi</span>
          <span className='font-bold text-lg'>City</span>
        </span>
      </div>

      <div className='menu-item'>
        <nav className="hidden md:flex items-center space-x-4">
          <Link href="#" className="hover:border-b-2 hover:border-purple-500" prefetch={false}>
            Events
          </Link>
          <Link href="#" className="hover:border-b-2 hover:border-purple-500" prefetch={false}>
            Pricing
          </Link>
          <Link href="#" className="hover:border-b-2 hover:border-purple-500" prefetch={false}>
            About
          </Link>
          <Link href="#" className="hover:border-b-2 hover:border-purple-500" prefetch={false}>
            Contact
          </Link>
        </nav>
      </div>

      <div className='auth-btns flex gap-x-3'>
        <Link href={'/sign-in'}>
          <button
            className='block w-full border border-black rounded-lg px-3 py-2 text-sm font-medium transition focus:outline-none hover:border-purple-500 hover:text-purple-800'
            type='button'
          >
            SignIn
          </button>
        </Link>
        <Link href={"/sign-up"}>
          <button
            className='w-full bg-black border rounded-lg px-3 py-2 text-sm text-white font-medium transition focus:outline-none hover:bg-purple-500 hover:text-black hover:border-purple-500'
            type='button'
          >
            SignUp
          </button>
        </Link>
            
      </div>
    </div>
  )
}

export default Navbar
