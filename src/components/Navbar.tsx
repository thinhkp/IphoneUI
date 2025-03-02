import Image from 'next/image'
import React from 'react'
import { appleImg , searchImg , bagImg } from '~/utils'
import { navLists } from '~/constant'

const Navbar = () => {
  return (
        <header className='px-5 max-md:py-5 py-10 flex justify-center h-auto w-full '>
            <nav className='w-full max-w-[1120] flex justify-between items-center relative ' >
                <div>
                   <Image src={appleImg} width={14} height={18} alt=''></Image>
                </div>

                <ul className=" max-sm:hidden flex flex-1 justify-center">
                  {navLists.map((item , i)=>{
                    return <li key={i} className='text-gray-500 text-sm px-5 cursor-pointer hover:text-white transition-all' >
                      {item}</li>
                  })}
                </ul>

                <div className='flex  justify-end gap-7'>
                  <Image src={searchImg} height={18} width={14} alt=''></Image>
                  <Image src={bagImg} height={18} width={14} alt=''></Image>
                </div>

            </nav>
        </header>
  )
}

export default Navbar