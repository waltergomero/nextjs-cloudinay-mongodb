'use client'

"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import Thumbnail from "lightgallery/plugins/thumbnail";
import { useSearchParams } from "next/navigation";

const apiUrl = process.env.public_url_api;
const baseApiUrl = `${apiUrl}/front/`;


const ByCategory = () => {
    const searchParams = useSearchParams();
    const categoryid = searchParams.get("id");

    const onInit = () => {
      console.log("lightGallery has been initialized");
    };
  

    const [imageList, setimageList] = useState()

    useEffect(() => {
        const fetchImagesByCategory = async () => {
        const response = await fetch(`${baseApiUrl}/${categoryid}`);

        const data = await response.json()
    
        setimageList(data);
    
      };
      fetchImagesByCategory();
    
    }, []);

  return (
    <main className="mx-auto max-w-[1960px] p-1 ">
    <div className="columns-1 gap-2 sm:columns-2 xl:columns-3 2xl:columns-4">
      <LightGallery
        mode="lg-fade"
        onInit={onInit}
        speed={500}
        plugins={[Thumbnail, lgZoom]}
      >
        {imageList &&
          imageList?.map((item) => (
            <a
              key={item._id}
              href={item.url}
              shallow
              className="after:content group relative mb-2 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
            >
              <Image
                alt={item.category_name}
                className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110 cursor-pointer"
                style={{ transform: "translate3d(0, 0, 0)" }}
                src={item.url}
                width={item.width}
                height={item.height}
                sizes="(max-width: 640px) 100vw,
                (max-width: 1280px) 50vw,
                (max-width: 1536px) 33vw, 25vw"
              />
            </a>
          ))}
      </LightGallery>
    </div>
  </main>
  )
}

export default ByCategory