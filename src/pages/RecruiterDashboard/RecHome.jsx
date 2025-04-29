import React from 'react'

const RecHome = () => {
  return (
    <div className='ml-[20%]   text-red-600'>
        
        RecHome lorem300
        <div className='grid grid-cols-1 md:grid-cols-4 gap-3 text-center p-4'>
            <div className='bg-green-400 h-32 rounded-md'>1</div>
            <div className='bg-green-400 h-32 rounded-md'>2</div>
            <div className='bg-green-400 h-32 rounded-md'>3</div>
            <div className='bg-green-400 h-32 rounded-md'>4</div>
        </div>


        <div className='grid grid-cols-1 md:grid-cols-3 gap-3 text-center p-4'>
            <div className='bg-green-400 h-96 rounded-md'>1</div>
            <div className='bg-green-400 h-96 rounded-md col-span-2'>2</div>
           
        </div>
        
        </div>
  )
}

export default RecHome