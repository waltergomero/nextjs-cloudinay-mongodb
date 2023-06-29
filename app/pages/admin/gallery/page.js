'use client'
import React from 'react';
import { useState, useEffect } from "react";
import Gallery from "./gallery";
import { useRouter } from "next/navigation";

const apiUrl = process.env.public_url_api;
const baseUrl = `${apiUrl}/admin/gallery`;

const GalleryPage = () => {
  const router = useRouter();
  const [images, setImages] = useState(null);

  useEffect(() => {
      const fetchImages = async () => {
      const response = await fetch(`${baseUrl}`);
      const data = await response.json()

      setImages(data);

    };
   fetchImages();

  }, []);

return (
  <>
    <Gallery data={images} />
  </>
);

}

export default GalleryPage
