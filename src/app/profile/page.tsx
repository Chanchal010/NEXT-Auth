'use client'
import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import toast, { Toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const rouuter = useRouter()
  const [ data, setData ] = useState("nothing")
  const getUserData = async () => {
    try {
      const res = await axios.post('/api/users/me')
      console.log("res.data",res.data.user);
      setData(res.data.user._id)
    } catch (error:any) {
      console.log(error.message);
        toast.error(error.message)
    }
  }

    const logOut = async () => {
      try {
        const res = await axios.get('/api/users/logout')
        toast.success(res.data.message)
        console.log(res.data);
        rouuter.push('/login')
      } catch (error:any) {
        console.log(error.message);
        toast.error(error.message)
      }
    }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 '>
      <h1>Profile Page</h1>
      
      <h2>{data === 'nothing' ? 'Nothing' : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
      

      <button
      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded '
      onClick={logOut}
      >log Out</button>

      <button
      className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
      onClick={getUserData}
      >get User Details</button>
      </div>
  )
}
