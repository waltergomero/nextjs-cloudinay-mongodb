import React from "react";
import Link from "next/link";

const Delete = ({ status, type, submitting, handleSubmit }) => {
  const _status = status;
  const title = "Are you sure you want to delete this status?";


  return (
    <section className='flex h-full flex-col items-center mt-10'>
      <div className="columns-sm py-2 text-left bg-white shadow-lg rounded-md border border-gray-200">
    <h2 className='text-lg leading-tight font-medium ml-6 mt-2 mb-2'>
      <span className='red_gradient'>{type} Status</span>
    </h2> 
    <hr/>
    <div className="flex h-full flex-col items-center ">
      <div className="columns-sm px-8  mt-2 text-left  ">
        <h5 className="text-red-500 text-lg leading-tight font-medium ml-6 mt-2">
          {title}
        </h5>
        <div className="md:mt-0 md:col-span-2">
          <form onSubmit={handleSubmit}>
            <div className="px-4 py-5 bg-white sm:p-6">
                <label className=" text-sm font-semibold text-gray-700">
                  Status Name:
                </label>
                <span className=" text-sm text-gray-700"> {_status.status_name}</span>
            </div>
            <div className="flex-end mx-3 mb-5 gap-4">
            <Link href='/pages/admin/status' 
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
