import Image from 'next/image'
import React from 'react'
import { appleImg , searchImg , bagImg } from '~/utils'
import { navLists } from '~/constant'

const Navbar = () => {
  return (
        <header className='common-padding  flex justify-center h-auto w-full '>
            <nav className='w-full max-w-[1120] flex justify-between items-center relative ' >
                <div>
                   <Image 
                     src={appleImg} 
                     width={14} 
                     height={18} 
                     alt=''
                     className="min-[1440px]:w-5 min-[1440px]:h-6"
                   />
                </div>

                <ul className=" max-sm:hidden flex flex-1 justify-center">
                  {navLists.map((item , i)=>{
                    return <li key={i} className='text-gray-500 text-sm px-5 cursor-pointer hover:text-white transition-all' >
                      {item}</li>
                  })}
                </ul>

                <div className='flex  justify-end gap-7'>
                  <Image 
                    src={searchImg} 
                    height={18} 
                    width={14} 
                    alt=''
                    className="min-[1440px]:w-5 min-[1440px]:h-6"
                  />
                  <Image 
                    src={bagImg} 
                    height={18} 
                    width={14} 
                    alt=''
                    className="min-[1440px]:w-5 min-[1440px]:h-6"
                  />
                </div>

            </nav>
        </header>
  )
}

export default Navbar