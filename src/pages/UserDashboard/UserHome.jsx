import React from 'react'

const UserHome = () => {
  return (
    <div className='ml-[20%] p-4'>
      <div className='grid grid-cols-1 md:grid-cols-2  text-center gap-4 '>
        <div className='h-32 rounded-md p-14 bg-blue-400'>1</div>
        <div className='h-32 rounded-md p-14 bg-blue-400'>2</div>
        
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 my-5'>
      <div className='bg-red-500 h-96 rounded-md'></div>
      <div className='bg-red-500 h-96 rounded-md md:col-span-2'></div>
      </div>
    </div>
  )
}

export default UserHome