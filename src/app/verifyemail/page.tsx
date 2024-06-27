'use client'

import React, { useEffect } from 'react'
import axios from 'axios'
// import { useRouter } from 'next/router'
import Link from 'next/link'

export default function verifyEmailPage() {

    // const router = useRouter()

    const [token , setToken] = React.useState("")
    const [verified , setVerified] = React.useState(false)
    const [error, setError] = React.useState(false)

    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/users/verifyemail', { token })
    
            setVerified(true)
            setError(false)
        } catch (error:any) {
            setError(true)
            console.log(error.response.data)
        }

    }

    useEffect(() => {
        setError(false)
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken || "")

        // const { query } = router;

        // const urlToken = query.token

        // setToken(urlToken || "")

    }, [])


    useEffect(() => {
        setError(false)
        if (token.length > 0) {
            verifyUserEmail()
        }
    }, [token])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className='etxt-4xl'>Verify Email</h1>
        <h2 className='p-2 bg-orange-500 text-black'>
            {token ? `${token}` : "no token"}
        </h2>
        
        {verified && (
            <>
            <h2>verified</h2>
            <Link href="/login">login</Link>
            </>
        )}
        {error && (
            <>
            <h2>{error}</h2>
            
            </>
        )}
    </div>
  )
}
