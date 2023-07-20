'use client'

import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from 'next/link';

const EditPage = () => {
    const {data: session} = useSession();
    const router = useRouter();

    const searchParams = useSearchParams();
    const imageId = searchParams.get("id");

    const [ddCategorylist, setDDCategoryList] = useState(null);
    const [imageInformation, setImageInformation] = useState(
        { title: "", category_name: "", category_id: "", description: "", user_id:"", email: "", url:"", });

    useEffect(() => {
        const fetchCategories = async () => {
        const response = await fetch("/api/admin/categories");
        const ddlData = await response.json()
    
        setDDCategoryList(ddlData);
    
      };

      fetchCategories();

        const getImageDetails = async () => {
        const response = await fetch(`/api/admin/gallery/${imageId}`);
        const imagedata = await response.json();
  
        setImageInformation({
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
  
    const handlerUpdateImage = async (e) => {
        e.preventDefault();

        await fetch(`/api/admin/gallery/${imageId}`, {method: "PATCH", body: JSON.stringify({ imageInformation,}),})
        .then((response) => response.json())
        .then(data => {
          if(data.error){
            alertService.error(data.error);
            }
          else{
            router.push("/pages/admin/gallery")
          }
          })
        .catch(error => alertService.error(error.message))
     
      }

  return (
    <section className='flex h-full flex-col items-center mt-10'>
    <div className="columns-sm px-8 py-2 text-left bg-white shadow-lg rounded-md border border-gray-200 ">
    <h2 className='text-lg leading-tight font-medium mt-2'>
      <span className='blue_gradient'>Edit Image Information</span>
    </h2> 
    <form onSubmit={handlerUpdateImage}>
      <div>
        <input
            name="title"
            maxLength="48"
            type="text"
            value={imageInformation.title}
            onChange={(e) => setImageInformation({ ...imageInformation, title: e.target.value })}
            required
            placeholder="Title"
            className="w-full px-4 py-1 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
      </div>
      <div>
        <select
            name="_id"
            placeholder="Select a category"
            required
            className="px-4 py-1 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            onChange={(e) => setImageInformation({ ...imageInformation, category_id: e.target.value, category_name: e.target.options[e.target.selectedIndex].text})}
            value={imageInformation.category_id}
             >
            <option value="">Select a category</option>
                {ddCategorylist &&
                  ddCategorylist.map((d) => (
                    <option key={d._id} value={d._id}>
                      {d.category_name}
            </option>
                  ))}
        </select>
            <div className="flex justify-center mt-2 p-2 rounded-lg border border-gray-200">
                <img
                    className="h-96 rounded-lg "
                    src={imageInformation.url}
                    alt="uploaded Images"
                  />
            </div>
            <div>
                <textarea
                    name="description"
                    placeholder="Description"
                    value={imageInformation.description}
                    onChange={(e) => setImageInformation({ ...imageInformation, description: e.target.value })}
                    rows={2}
                    cols={5}
                    maxLength="48"
                    className="w-full px-1 py-1 mt-2 mb-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />                  
            </div>
      </div>
      <div className='flex items-center justify-center mt-2 gap-2'>
      <Link href='/pages/admin/gallery' 
              className='px-5 py-1.5 text-sm bg-gray-500 rounded-lg text-white'>
              Cancel
        </Link>
       <button className='px-5 py-1.5 text-sm bg-blue-600 rounded-lg text-white justify-right'
       type="submit">Save</button>
      </div>
    
    </form>
    </div>
    </section>
  )
}

export default EditPage