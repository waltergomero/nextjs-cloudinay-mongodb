'use client';

import {useState} from 'react'
import Link from 'next/link'
import { alertService } from '@/services/alert.service'
import { accountService } from '@/services/account.service';
import { useRouter } from 'next/navigation';


const RegisterPage = () => {
    const router = useRouter();

    const [registration, setRegistration] = useState({
        first_name:"", last_name:"", email:"", password:"", role: "user"}
    )
  
    const registrationHandler = (e) => {
      e.preventDefault();
      return accountService
        .register(registration)
        .then((res) => {
          if (!res.error) {
            router.push("/pages/account/login");
          } else {
            alertService.error(res.error);
          }
        })
        .catch(alertService.error);
    };
  
  return (
    <section className="border-red-500 bg-white mt-10 flex items-center justify-center">
      <div className="bg-white p-5 flex rounded-lg border border-gray-200 shadow-sm max-w-3xl">
        <div className="md:w-1/2 px-5">
          <h2 className="text-2xl font-bold text-[#002D74]">Register</h2>
          <p className="text-sm mt-4 text-[#002D74]">If you don't have an account, please register</p>
          <form className="mt-6" onSubmit={registrationHandler}>
          <div>
              <label className="block text-sm font-medium text-gray-900">First Name:</label>
              <input type="text" id="first_name" placeholder="Enter your first name" maxLength="32" onChange={(e) => setRegistration({...registration, first_name: e.target.value})}
              className="w-full px-4 py-2 rounded-lg mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" required/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">Last Name:</label>
              <input type="text" id="last_name" placeholder="Enter your last name" maxLength="32" onChange={(e) => setRegistration({...registration,  last_name: e.target.value})}
              className="w-full px-4 py-2 rounded-lg mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" required/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">Email:</label>
              <input type="email" id="email" placeholder="Enter email address" maxLength="32" onChange={(e) => setRegistration({...registration, email: e.target.value})}
              className="w-full px-4 py-2 rounded-lg mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" required/>
            </div>
  
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-900">Password:</label>
              <input type="password" name="" id="" placeholder="Enter password" minLength="6" maxLength="24" onChange={(e) => setRegistration({...registration, password:e.target.value})}
              className="w-full px-4 py-2 rounded-lg mt-2 border focus:border-blue-500
                    focus:bg-white focus:outline-none" required/>
            </div>

            <button type="submit" className="w-full block bg-blue-600 hover:bg-blue-500 focus:bg-blue-500 text-white font-semibold rounded-lg
                  px-4 py-3 mt-6">Register</button>
          </form>
  
          <div className="text-sm flex justify-between items-center mt-3">
            <p>If already have an account...</p>
            <Link href={"/pages/account/login"} className="py-2 px-5 ml-3 bg-white border rounded-xl hover:scale-110 duration-300 border-blue-400  ">Log In</Link>
          </div>
        </div>
  
        <div className="w-1/2 md:block hidden ">
          <img src="/login-image.avif" className="rounded-2xl" alt="page img"/>
        </div>
  
      </div>
    </section>
  )
}

export default RegisterPage