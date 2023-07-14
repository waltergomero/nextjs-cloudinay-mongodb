"use client"
import React, { Component } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Compressor from "compressorjs";
import { alertService } from "@/services/alert.service";

export default function UploadMultiple() {
  const {data: session} = useSession();
  const router = useRouter();

  const [compressedFile, setCompressedFile] = useState(null);
  const [ddCategorylist, setDDCategoryList] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [imageInformation, setImageInformation] = useState(
    { title: "", category_name: "", category_id: "", description: " ", user_id:"", email: ""});

  useEffect(() => {
    const fetchCategories = async () => {
    const response = await fetch("/api/admin/categories");
    const ddlData = await response.json()

    setDDCategoryList(ddlData);
    setImageInformation({title:".", user_id: session?.user._id, email: session?.user.email})

    };
    fetchCategories();

    }, []);


  const uploadImagesHandler = (e) =>{
    setSelectedFiles(Array.from(e.target.files))
  }


  const handlerAddImages = async (e) => {
    e.preventDefault();
 
   if (selectedFiles != null) {
        selectedFiles.map((image, index) => {
            new Compressor(image, {
                quality: 0.9, // 0.6 can also be used, but its not recommended to go below.
                maxWidth: 1870,
                maxHeight: 1870,
                success: async (result) => {
                  console.log("Image ", image)
                
                   const formdata = new FormData();
                   formdata.append('file', result);
                   formdata.append("upload_preset", "gallery")
       
                   const data =  await fetch('https://api.cloudinary.com/v1_1/wgomero-dev/image/upload', {
                   method: 'POST',
                   body: formdata
                       }).then(r => r.json());
                   
                   console.log("image information: ", imageInformation)

                  await fetch("/api/admin/gallery/new", {method: "POST", body: JSON.stringify({ imageInformation, url: data.url, image_name: data.public_id, height: data.height, width: data.width}),})
                  .then((response) => response.json())
                  .then(data => {
                  console.log("data: ", data)
                  if(data.error){
                      alertService.error(data.error);
                      }
                  else{
                      router.push("/pages/admin/gallery")
                      }
                  })
                  .catch(error => alertService.error(error.message))   
                },
            });

    })
  }
}

  const removeSelectedImage = (e) => {
    let _name = e.target.attributes['data-key'].value;
    setSelectedFiles(image => image.filter(x => x.name != _name))
  };

  const handleCancel = (e) => {
    e.preventDefault();
    router.back();
  };

  return (
    <>
      <div className="flex h-full flex-col m-4">
            <form onSubmit={handlerAddImages}>
              <div>
                <input type="file" required multiple onChange={uploadImagesHandler} />
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
              </div>
              <div className=" m-2">
              <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">  
              {selectedFiles && selectedFiles?.map((file,index) => (  
                            <img  key={index}
                              className="rounded-md"
                              data-key={file.name}
                              onClick = {removeSelectedImage}                                 
                              src={URL.createObjectURL(file)} alt="uploaded Images" />                                                                                                                                                      
                  ))}
              </div>
              </div>
              <div className="px-4 py-1 text-left sm:px-6">
                <button
                  id="cancel"
                  onClick={handleCancel}
                  className="px-4 py-1.5  text-white bg-gray-500 rounded-lg hover:bg-gray-600"
                >
                  {" "}
                  Cancel{" "}
                </button>
                <span>&nbsp; </span>
                <button className='px-4 py-1.5 text-sm bg-blue-600 rounded-lg text-white justify-right'
                    type="submit">Upload Images</button>
              </div>
            </form>
          </div>
    </>
  );

}
