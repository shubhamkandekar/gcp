"use client";

import { useState } from "react";
import axios from 'axios';
import { toast } from "sonner";
import { PulseLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import Link from "next/link"
export default function Register() {
  const router = useRouter();
  const [authData, setAuthData] = useState({
    name:"",
    email:"",
    password:"",
  })
  const [loading , setLoading]= useState(false);
 const handlesubmit = async  (e)=>{
  e.preventDefault()
  setLoading(true);
  try {
    if(!authData){
      toast.error('Fill the require Fields')
    }
  const res = await  axios.post("/api/register", {
    name: authData.name,
    email: authData.email,
    password: authData.password
  })
   if (res.status === 200){
    setAuthData({  name:"",
    email:"",
    password:"",})
   } 
   toast.success('User Register Sucessfully')
   router.push("/login") 
  } catch (error) {
    console.log(error)
    toast.error('Unable To Create Customer');
  }finally{
    setLoading(false);
  }
 }
  return (
    <main className="flex w-full h-full items-center justify-center bg-opacity-50">
    <section className="flex items-center justify-center">
      <div className="right rounded-lg bg-slate-100 bg-opacity-75 shadow-sm shadow-white border-white p-8">
        <div className="flex flex-col items-center justify-center my-5">
          <h1 className="text-4xl font-extrabold mb-4 text-sky-900">Welcome Back</h1>
         
        </div>
        <div className="flex flex-col items-center my-5">
          <h2 className="text-3xl font-extrabold text-gradient-bg text-gradient-bg1">Register</h2>
          <h3 className="text-lg font-semibold text-center text-gradient-bg1">
            Please Register to continue
          </h3>
          <form action="#" method="POST" className="mt-3">
            <div className="Email mb-2 w-full">
              <label htmlFor="name" className="text-sm font-semibold text-gray-600">
                Name:
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-2 border rounded outline-blue-500 focus:border-blue-500 text-sky-900"
                placeholder="Enter your Name"
                onChange={(e) => setAuthData({ ...authData, name: e.target.value })}
                required
              />
            </div>
            <div className="Email mb-2 w-full">
              <label htmlFor="email" className="text-sm font-semibold text-gray-600">
                Email:
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border rounded outline-blue-500 focus:border-blue-500 text-sky-900"
                placeholder="Enter your Email"
                onChange={(e) => setAuthData({ ...authData, email: e.target.value })}
                required
              />
            </div>
            <div className="password mb-2 w-full">
              <label htmlFor="password" className="text-sm font-semibold text-gray-600">
                Password:
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-2 border rounded outline-blue-500 focus:border-blue-500 text-sky-900"
                placeholder="Enter your Password"
                onChange={(e) => setAuthData({ ...authData, password: e.target.value })}
                required
              />
            </div>
            <Link href='/login' className="text-sm text-blue-400 text-right">already have account? signin </Link> 
            <button
              className="bg-blue-500 w-full mt-5 text-white p-2 rounded hover:bg-blue-700"
              onClick={handlesubmit}
            >
              {loading ? <PulseLoader color="#fff" size={8} /> : "Register"}
            </button>
          </form>
        </div>
      </div>
    </section>
  </main>
  
  );
}
