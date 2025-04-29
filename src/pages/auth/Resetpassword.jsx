import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

const Resetpassword = () => {
  return (
    <div>
      <Header/>
      <div className='max-w-3xl p-8 shadow-2xl my-10 rounded-md flex mx-auto'>
      <form className='w-full p-5'>
      <h1  className='font-bold md:text-2xl py-5'>Reset Password</h1>

        <div className='flex flex-col gap-3 py-2'>
          <Label>New Password</Label>
          <Input type="text" placeholder="Your email please...."/>
        </div>

        <div className='flex flex-col gap-3 py-2'>
          <Label>Confirm Password</Label>
          <Input type="text" placeholder="Your email please...."/>
        </div>

        <div className='flex gap-3 py-5'>
        <Button type="reset" className="bg-orange-400">Cancel</Button>
        <Button type="submit" className="bg-blue-400">Submit</Button>
        </div>
      </form>
      </div>
    </div>
  )
}

export default Resetpassword