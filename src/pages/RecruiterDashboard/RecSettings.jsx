import { Button } from '@/components/ui/button'
import React from 'react'

const RecSettings = () => {
  return (
    <div className='ml-[20%] p-4'>
        <h1 className='font-bold  md:text-2xl px-2 py-2 text-gray-400'>Account</h1>
        <div className='grid grid-cols-2 gap-5 p-4 border border-green-500 rounded-md'>
            <h2 className='font-bold text-blue-600 md:text-2xl'>Update Profile</h2>
            <Button>Update</Button>
            <h2 className='font-bold text-blue-600 md:text-2xl'>Delete Account</h2>
            <Button>Delete</Button>
        </div>
        
        </div>
  )
}

export default RecSettings