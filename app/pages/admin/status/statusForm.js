'use client';

import { useState, useEffect } from "react";
import Link from "next/link";

const Form = ({ type, status, setStatus, submitting, handleSubmit }) => {
  const [ddTypelist, setTypeDDList] = useState(null);
  const [selTypeValue, setSelTypeValue] = useState(
    status? status.status_typeid : ""
  );

  useEffect(() => {
    const buildOptions = () => {
      var arr = [];
      for (let i = 0; i <= 10; i++) {
        arr.push(
          <option key={i} value={i}>
            {i}
          </option>
        );
      }
      setTypeDDList(arr);
    };
    buildOptions();
  }, []);

  const handleSelectStatusTypeChange = (e) => {
    setSelTypeValue(e.target.value);
    setStatus({ ...status, status_typeid: e.target.value})
  };

  return (
    <section className='flex h-full flex-col items-center mt-10'>
      <div className="columns-sm px-8 py-2 text-left bg-white shadow-lg rounded-md border border-gray-200 ">
      <h2 className='text-lg leading-tight font-medium mt-2'>
        <span className='blue_gradient'>{type} Status</span>
      </h2> 
     <form
        onSubmit={handleSubmit}
        className='mt-2 mb-8 w-full max-w-2xl flex flex-col gap-7 '>
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-3">
        <label className='text-sm font-semibold  text-gray-700'>
            Status Name:
          <input
            type='text'
            name="status_name"
            value={status.status_name}
            onChange={(e) => setStatus({ ...status, status_name: e.target.value })}
            required
            className='w-full px-4 py-1 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600'
          />
        </label>
        </div>
        <div className="col-span-6 sm:col-span-3">
        <label className='text-sm font-semibold text-gray-700'>Type Id:</label>
          <select
            name="status_typeid"
            required
            className="w-full px-4 text-sm py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            onChange={handleSelectStatusTypeChange}
             value={selTypeValue}>
              <option value=""></option>
                {ddTypelist}
          </select>
        </div>
        </div>
        <div className='flex-end mx-3 mb-2 gap-4'>
        <Link href='/pages/admin/status' 
              className='px-5 py-1.5 text-sm bg-gray-500 rounded-full text-white'>
              Cancel
            </Link>

          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-blue-600 rounded-full text-white'
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
      </div>
    </section>
  );
};

export default Form;
