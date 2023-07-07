'use client'
import React from 'react';
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from 'next/link';
import Image from 'next/image';
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { CldImage } from 'next-cloudinary';
import { useRouter } from "next/navigation";

const apiUrl = process.env.public_url_api;
const baseUrl = `${apiUrl}/admin/gallery`;

const GalleryPage = () => {
  const {data: session} = useSession();
  const [images, setImages] = useState(null);

  useEffect(() => {
      const fetchImages = async () => {
      //const response = await fetch(`${baseUrl}`);
      //const data = await response.json()
     const response = await fetch(`${baseUrl}`)
     const data = await response.json();
      setImages(data);

    };
   fetchImages();

  }, []);

  console.log("returned images: ", images)

return (
  <>
      <div className="flex h-full flex-col rounded p-4 m-2 border border-gray-200">
        <div className='mb-2'>
          <Link
            href="/pages/admin/gallery/upload"
            className="px-4 py-2 bg-blue-600 text-white font-medium text-xs uppercase rounded"
          >
            Upload Image
          </Link>
          <Link
            href="/pages/admin/gallery/uploadMultiple"
            className="px-4 py-2 ml-4 bg-blue-600 text-white font-medium text-xs uppercase rounded"
          >
            Upload Multiple Images
          </Link>
        </div>
        <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
         {images && images.map((item) => (
            <div key={item._id} className="shadow-lg rounded-lg">
              <div className="w-84  h-72 relative">
                <Image
                  src={item.url}
                  fill
                  alt=""
                  className="rounded-tl-lg rounded-tr-lg"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="flex justify-between">
                  <Link
                    href={`/admin/gallery/edit/${item._id}`}
                    className="rounded-full py-2 px-4 text-gray-500 text-sm"
                  ><div className="flex justify-between">
                    <FaPencilAlt/>  Edit
                    </div>
                  </Link>
                  <Link
                    href={`/admin/gallery/delete/${item._id}`}
                    className=" rounded-full py-2 px-4 text-red-500 text-sm"
                  ><div className="flex justify-between">
                    <FaTrashAlt /> Delete </div>
                  </Link>
                </div>
              <div className="pl-4">
                <h4 className="text-gray-700 text-sm font-semibold">
                  {item.title}
                </h4>
                <div className="flex flex-row  text-xs">
                  <p className="text-gray-500">{item.description}</p>
                </div>

              </div>
            </div>
          ))} 
      </div>
      </div>
  </>
);

}

export default GalleryPage
