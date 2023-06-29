'use client';

import {useState} from 'react'
import Link from 'next/link'
import styles from '@/styles/AuthForm.module.css'
import { alertService } from '@/services/alert.service'
import { accountService } from '@/services/account.service';
import { useRouter } from 'next/navigation';


const LoginPage = () => {
    const router = useRouter();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
  
    const handleSubmit = (e) => {
      e.preventDefault();
      return accountService
        .login(email, password)
        .then((res) => {
          if (!res.error) {
            router.push("/pages/admin");
          } else {
            alertService.error(res.error);
          }
        })
        .catch(alertService.error);
    };
  
  return (
    <section className="mt-10 bg-white flex items-center justify-center">
      <div className="bg-white p-5 flex rounded-lg border border-gray-200 shadow-sm max-w-3xl">
        <div className="md:w-1/2 px-5">
          <h2 className="text-2xl font-bold text-[#002D74]">Login</h2>
          <p className="text-sm mt-4 text-[#002D74]">If you have an account, please login</p>
          <form className="mt-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-900">Email:</label>
              <input type="email" id="email" placeholder="Enter Email Address" maxLength="32" onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"  required/>
            </div>
  
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-900">Password:</label>
              <input type="password" name="" id="" placeholder="Enter Password" minLength="6" maxLength="24" onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg mt-2 border focus:border-blue-500
                    focus:bg-white focus:outline-none" required/>
            </div>
  
            <div className="text-right mt-2">
              <a href="#" className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700">Forgot Password?</a>
            </div>
  
            <button type="submit" className="w-full block bg-blue-600 hover:bg-blue-500 focus:bg-blue-500 text-white font-semibold rounded-lg
                  px-4 py-3 mt-6">Log In</button>
          </form>
  
          <div className="mt-7 grid grid-cols-3 items-center text-gray-500">
            <hr className="border-gray-500" />
            <p className="text-center text-sm">OR</p>
            <hr className="border-gray-500" />
          </div>
  
          <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 ">
            <span className= "ml-4">Login with Google</span>
          </button>
  
          <div className="text-sm flex justify-between items-center mt-3">
            <p>If you don't have an account...</p>
            <Link href={"/pages/account/register"} className="py-2 px-5 ml-3 bg-white border rounded-xl hover:scale-110 duration-300 border-blue-400  ">Register</Link>
          </div>
        </div>
  
        <div className="w-1/2 md:block hidden ">
          <img src="/login-image.avif" className="rounded-2xl" alt="page img"/>
        </div>
  
      </div>
    </section>
  )
}

export default LoginPage