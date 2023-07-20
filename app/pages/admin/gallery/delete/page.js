'use client'

import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from 'next/link';
import Image from 'next/image';

const DeletePage = () => {
    const {data: session} = useSession();
    const searchParams = useSearchParams();
    const imageId = searchParams.get("id");

    const [imageInformation, setImageInformation] = useState(
        { title: "", category_name: "", category_id: "", description: "", user_id:"", email: "", url:"", });

    useEffect(() => {
        const getImageDetails = async () => {
        const response = await fetch(`/api/admin/gallery/${imageId}`);
        const imagedata = await response.json();
  
        setImageInformation({
            _id: imagedata._id,
            user_id: session?.user._id, 
            email: session?.user.email,
            title: imagedata.title,
            category_id: imagedata.category_id,
            category_name:imagedata.category_name,
            description:imagedata.description,
            url:imagedata.url,
         })
      };
      getImageDetails();
    
    }, []);

  return (

          <section className='flex h-full flex-col items-center mt-10'>
    <div className="columns-sm px-8 py-2 text-left bg-white shadow-lg rounded-md border border-gray-200 ">
          <h5 className="text-red-500 text-lg leading-tight font-medium ml-6 mt-2">
            Are you sure you want to delete this image?
          </h5>
          <div className="mt-4 md:mt-0 md:col-span-2">
            <form>
              <label className="mt-4 block text-sm font-medium text-gray-700">
                Title: {imageInformation.title}
              </label>             
              <div className="flex justify-center mt-4 rounded-lg border border-gray-200">
                <div className="flex flex-col-2 gap-2 ">
                  <Image
                    width={340}
                    height={340}
                    className="rounded-lg m-2"
                    src={imageInformation.url}
                    alt={imageInformation.title}
                  />
                </div>
              </div>
              <div className="flex items-center justify-center mt-2 gap-2">
              <Link href='/pages/admin/gallery' 
                    className='px-5 py-1.5 text-sm bg-gray-500 rounded-lg text-white'>
                    Cancel
                </Link>
                <button
                  onClick={() => handleDelete(imageInformation._id)}
                  className="px-6 py-1 text-white bg-red-500 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

  );
}

export default DeletePage;

