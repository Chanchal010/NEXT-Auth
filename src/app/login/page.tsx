'use client';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast} from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function logInPage() {
    const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");


  const onLogIn = async () => {
    try {
        setLoading(true);

         const res = await axios.post('/api/users/login', user);

        console.log("login res", res.data);

        router.push("/profile");

        
    } catch (error: any) {
        console.log("signup error", error);
        toast.error(error.message);
    }
  };

  useEffect(() => {
      if (user.email.length > 0 && user.password.length > 0 ) {
        setButtonDisabled(false)
      }else {
        setButtonDisabled(true)
      }
  },[user])

  return (
  <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "No SignIn" : "Log In"}</h1>
      
      <label 
      className="p-2"
      htmlFor="email">email</label>
      <input 
      className="flex p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
      id="email"
      value={user.email}
      onChange={(e) => setUser({...user, email: e.target.value})}
      type="email" />


      <label 
      className="p-2"
      htmlFor="password">password</label>
      <input 
      className="flex p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
      id="password"
      value={user.password}
      onChange={(e) => setUser({...user, password: e.target.value})}
      type="password" />

      <button 
      className=" p-2 bg-blue-500 rounded-lg text-white hover:bg-blue-600"
      onClick={onLogIn}>
        {buttonDisabled ? "No SignIn" : "Log In"} 
      </button>

      <Link 
      className="text-black text-sm  mt-500 bg-blue-100 p-2 hover:text-blue-700"
      href="/signup">Visit signUp Page</Link>

  </div>
);
}
