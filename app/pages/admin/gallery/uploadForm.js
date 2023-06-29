'use client';

import { useState, useEffect } from "react";
import Compressor from "compressorjs";

const uploadForm = ({ type, ddCategorylist, setImageData, submitting,  handleSubmit }) => {
  const [selCategoryValue, setSelCategoryValue] = useState("");
  const [selCategoryName, setSelCategoryName] = useState("");
  const [compressedFile, setCompressedFile] = useState(null);
  const [imageExtension, setImageExtension] = useState(null);
  

  
  const handleCompressedUpload = (e) => {
    const image = e.target.files[0];
    const ext = image.name.substr(image.name.lastIndexOf(".") + 1);

    setImageExtension(ext);

    new Compressor(image, {
      quality: 0.9, // 0.6 can also be used, but its not recommended to go below.
      maxWidth: 1290,
      maxHeight: 1290,
      success: (compressedResult) => {
        setCompressedFile(compressedResult);
      },
    });
  };

  const handleCategoryChange = (e) => {
    setSelCategoryName(e.target.options[e.target.selectedIndex].text);
    setSelCategoryValue(e.target.value);
};


const removeSelectedImage = () => {
  setCompressedFile();
  input.value = null;
};

const handleCancel = (e) => {
  e.preventDefault();
  router.back();
};



  return (
    <section className='flex h-full flex-col items-center mt-10'>
    <div className="columns-sm px-8 py-2 text-left bg-white shadow-lg rounded-md border border-gray-200 ">
    <h2 className='text-lg leading-tight font-medium mt-2'>
      <span className='blue_gradient'>{type} Images</span>
    </h2> 
    <form onSubmit={handleSubmit}>
            <div>
              <input type="file" required onChange={handleCompressedUpload} />
            </div>
            <div>
              <input
                name="title"
                maxLength="48"
                type="text"
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
                onChange={handleCategoryChange}
                value={selCategoryValue}
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

            {compressedFile && (
              <>
                <div className="flex justify-center mt-4 p-2 rounded-lg border border-gray-200">
                  <img
                    className="h-72 rounded-lg"
                    src={URL.createObjectURL(compressedFile)}
                    alt="uploaded Images"
                  />
                </div>
                <div>
                  <button
                    onClick={removeSelectedImage}
                    className={`w-full px-1 py-1 mb-2 text-white text-xs rounded-md bg-red-500`}
                  >
                    Remove this image
                  </button>
                  <textarea
                    name="description"
                    placeholder="Description"
                    rows={2}
                    cols={5}
                    maxLength="48"
                    className="w-full px-1 py-1 mt-2 mb-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>
              </>
            )}
            <div className="px-4 py-1 text-right sm:px-6">
              <button
                id="cancel"
                onClick={handleCancel}
                className="px-6  text-white bg-gray-500 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
              <span>&nbsp; </span>
              <button
                className="px-6 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </form>
    </div>
  </section>
  )
}

export default uploadForm