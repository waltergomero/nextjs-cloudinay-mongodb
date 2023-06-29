import React from "react";
import Link from "next/link";

const Delete = ({ data, type, submitting, handleSubmit }) => {

  const title = "Are you sure you want to delete this user?";


  return (
    <section className='flex h-full flex-col items-center mt-10'>
      <div className="columns-sm py-2 text-left bg-white shadow-lg rounded-md border border-gray-200">
    <h2 className='text-lg leading-tight font-medium ml-6 mt-2 mb-2'>
      <span className='red_gradient'>{type} User</span>
    </h2> 
    <hr/>
    <div className="flex h-full flex-col items-center ">
      <div className="columns-sm px-8  mt-2 text-left  ">
        <h5 className="text-red-500 text-lg leading-tight font-medium ml-2 mt-2">
          {title}
        </h5>
        <div className="md:mt-0 md:col-span-2">
          <form onSubmit={handleSubmit}>
            <div className="px-4  sm:p-1">
                <label className=" text-sm font-semibold text-gray-700">
                  First Name:
                </label>
                <span className=" text-sm text-gray-700"> {data.first_name}</span>
            </div>
            <div className="px-4  sm:p-1">
                <label className=" text-sm font-semibold text-gray-700">
                  Last Name:
                </label>
                <span className=" text-sm text-gray-700"> {data.last_name}</span>
            </div>
            <div className="px-4 sm:p-2 mb-2">
                <label className=" text-sm font-semibold text-gray-700">
                  Email:
                </label>
                <span className=" text-sm text-gray-700"> {data.email}</span>
            </div>
            <div className="flex-end mx-3 mb-5 gap-4">
            <Link href='/pages/admin/users' 
              className='px-5 py-1.5 text-sm bg-gray-500 rounded-full text-white'>
              Cancel
            </Link>
              <button
            type='submit'
             disabled={submitting}
              className='px-5 py-1.5 text-sm bg-red-500 rounded-full text-white'
              >
            {submitting ? `${type}ing...` : type}
          </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
    </section>
  );
}

export default Delete;
