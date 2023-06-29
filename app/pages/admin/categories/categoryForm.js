'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
const apiUrl = process.env.public_url_api;
const baseApiUrl = `${apiUrl}/admin/status/ddl`;

const Form = ({ type, data, setCategory, submitting, handleSubmit }) => {

  const [ddList, setDDList] = useState(null);
  const [selStatusValue, setSelStatusValue] = useState(
    data? data.status_id : ""
  );

  useEffect(() => {
    const fetchStatus = async () => {
    const response = await fetch(`${baseApiUrl}`);
    const ddlData = await response.json()

    setDDList(ddlData);

  };
  fetchStatus();

}, []);


  const handleSelectStatusChange = (e) => {
    setSelStatusValue(e.target.value);
    setCategory({ ...data, status_id: e.target.value, status_name:e.target.options[e.target.selectedIndex].text})

  };


  return (
    <section className='flex h-full flex-col items-center mt-10'>
      <div className="columns-sm px-8 py-2 text-left bg-white shadow-lg rounded-md border border-gray-200 ">
      <h2 className='text-lg leading-tight font-medium mt-2'>
        <span className='blue_gradient'>{type} Category</span>
      </h2> 
     <form
        onSubmit={handleSubmit}
        className='mt-2 mb-8 w-full max-w-2xl flex flex-col gap-7'>
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-3">
        <label className='text-sm font-semibold  text-gray-700'>
            Category Name:
          <input
            type='text'
            name="category_name"
            value={data.category_name}
            onChange={(e) => setCategory({ ...data, category_name: e.target.value })}
            required
            className='w-full px-4 py-1 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600'
          />
        </label>
        </div>
        <div className="col-span-6 sm:col-span-3">
        <label className='text-sm font-semibold text-gray-700'>Status:</label>
          <select
            name="status_id"
            required
            className="w-full px-4 text-sm py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            onChange={handleSelectStatusChange}
             value={selStatusValue}>
              <option value=""></option>
              {ddList && ddList.map((d) => (
                          <option key={d._id} value={d._id}>
                            {d.status_name}
                          </option>
                        ))}  
          </select>
        </div>
        </div>
        <div className='flex-end mx-3 mb-2 gap-4'>
        <Link href='/pages/admin/categories' 
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
  
}

export default Form;
