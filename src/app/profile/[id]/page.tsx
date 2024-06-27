import React from 'react'

export default function page({params}:any) {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 '>
        
        <h1>Profile Page</h1>

        <h2 className='text-3xl p-3 bg-green-500 rounded'>{params.id}</h2>
    </div>
  )
}
