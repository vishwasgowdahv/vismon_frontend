import React from 'react'

export default function Footer() {
  return (
   <div className='p-6 px-4 bg-gray-200'>
    <div className=' flex flex-col p-5 gap-2 items-center'>
      <label htmlFor="newsletter" className='text-3xl font-bold'> Subscribe for Newsletter</label>
      <div className='flex gap-3 justify-between items-center'>
        <input className='border rounded-md p-3 sm:px-6 text-sm sm:text-sm' type="text" name="newsletter" placeholder='maxmuller@vismon.com' id="newsletter" />
      <button className='border rounded-md p-2'>
        subscribe
      </button>
      </div>
    </div>
     <div className='text-center p-3'>
      &copy; Copyrights All Rights Reserved 
    </div>
   </div>
  )
}
