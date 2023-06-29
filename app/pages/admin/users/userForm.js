import React from 'react';
import Link from 'next/link';
import { useState} from "react";

const userForm = ({ type, data, setUser, submitting, handleSubmit }) => {

  const [selRole, setSelRole] = useState(
    data? data.role : ""
  );


  const onOptionChangeHandler = (e) => { 
    setSelRole(e.target.value)
    setUser({...data, role: e.target.value})
  }
  return (
    <section className='flex h-full flex-col items-center mt-10 '>
    <div className="columns-sm px-8 py-2 text-left bg-white shadow-lg rounded-md border border-gray-200 ">
    <h2 className='text-lg leading-tight font-medium mt-2'>
      <span className='blue_gradient'>{type} User</span>
    </h2> 
   <form
      onSubmit={handleSubmit}
      className='mt-2 mb-8 w-full max-w-2xl flex flex-col gap-7 '>
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-6 sm:col-span-3">
        <label className='text-sm font-semibold  text-gray-700'> First Name:</label>      
        <input
          type='text'
          name="first_name"
          value={data.first_name}
          onChange={(e) => setUser({ ...data, first_name: e.target.value })}
          required
          className='w-full px-4 py-1 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600'
        />
      </div>
      <div className="col-span-6 sm:col-span-3">
      <label className='text-sm font-semibold  text-gray-700'> Last Name:</label>      
        <input
          type='text'
          name="last_name"
          value={data.last_name}
          onChange={(e) => setUser({ ...data, last_name: e.target.value })}
          required
          className='w-full px-4 py-1 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600'
        />
      </div>
      </div>
      <div className="grid grid-cols-6 gap-6">
      <div className="col-span-6 sm:col-span-6">
      <label className='text-sm font-semibold  text-gray-700'> Email:</label>      
        <input
          type='email'
          name="email"
          value={data.email}
          onChange={(e) => setUser({ ...data, email: e.target.value })}
          required
          className='w-full px-4 py-1 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600'
        />
      </div>
      </div>
      <div className="grid grid-cols-6 gap-6">
      <div className="col-span-6 sm:col-span-6">
      <label className='text-sm font-semibold  text-gray-700'> Password:</label>      
        <input
          type='password'
          name="password"
          value={data.password}
          onChange={(e) => setUser({ ...data, password: e.target.value })}
          className='w-full px-4 py-1 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600'
        />
      </div>
      </div>
      <div className="grid grid-cols-6 gap-6">
      <div className="col-span-6 sm:col-span-6">
      <label className="text-sm font-medium text-gray-700"> Role:</label>
        <input 
            type="radio" 
            name="rbUser" 
            checked={selRole === "admin"}
            value ="admin"
            required
            onChange={onOptionChangeHandler}
            className="text-sm text-gray-700 ml-2" />
            <label htmlFor="true" className="text-sm text-gray-700 ml-1"> Admin</label>

        <input 
            type="radio" 
            name="rbUser" 
            value = "user"
            required
            checked={selRole === "user"}
            onChange={onOptionChangeHandler} 
            className="text-sm text-gray-700 ml-2"  />
            <label htmlFor="false" className="text-sm text-gray-700 ml-1"> User</label>

        </div>
      </div>
      <div className='flex-end mx-3 mb-2 gap-4'>
      <Link href='/pages/admin/users' 
            className='px-5 py-1.5 text-sm bg-gray-500 rounded-full text-white'>
            Cancel
          </Link>

        <button
          type='submit'
          className='px-5 py-1.5 text-sm bg-blue-600 rounded-full text-white'
        >
          {submitting ? `${type}ing...` : type}
        </button>
      </div>
    </form>
    </div>
  </section>
  )
}

export default userForm