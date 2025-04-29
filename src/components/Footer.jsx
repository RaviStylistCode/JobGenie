import React from 'react'

const Footer = () => {
  return (
    <div className='w-full   text-white grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 justify-items-center p-3 my-2 transition-all'>

    <div className='w-full  h-[50vh] border border-blue-800'>

        <div className='flex justify-center flex-col items-center w-full h-full '>
          <h3>@jobGenie</h3>
          <p>Kankarbagh patna 800020 </p>
        </div>

    </div>
    <div className='w-full  h-[50vh] border border-blue-800'>2</div>
    <div className='w-full  h-[50vh] border border-blue-800'>3</div>
    <div className='w-full  h-[50vh] border border-blue-800'>4</div>
    </div>
  )
}

export default Footer