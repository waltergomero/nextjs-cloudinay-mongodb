"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Bridge from '@/components/Icons/Bridge'
import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
const apiUrl = process.env.public_url_api;
const baseApiUrl = `${apiUrl}/front`;

import lgThumbnail from "lightgallery/plugins/thumbnail";
import Thumbnail from "lightgallery/plugins/thumbnail";


export default function HomePage() {
  const [imageList, setImageList] = useState(null);

  const onInit = () => {
    console.log("lightGallery has been initialized");
  };

  useEffect(() => {
    const fetchRandomImage = async () => {
    const response = await fetch(`${baseApiUrl}`);
    const data = await response.json()

    setImageList(data);

  };
  fetchRandomImage();

}, []);


  return (
      <main className="mx-auto max-w-[1960px] p-1 ">
        <div className="columns-1 gap-2 sm:columns-2 xl:columns-3 2xl:columns-4">
          <div className="after:content relative mb-2 flex h-[629px] flex-col items-center justify-end overflow-hidden rounded-lg bg-white/10 px-6 pb-16 pt-64 text-center text-white shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0">
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <span className="flex max-h-full max-w-full items-center justify-center">
              <Bridge/>
                {/* <Image src="/214c1.jpg" width={736} height={832} className=" rounded-lg" /> */}
              </span>
              <span className="absolute left-0 right-0 bottom-0 h-[400px] bg-gradient-to-b from-black/0 via-black to-black"></span>
            </div>

            <h1 className="mt-8 mb-4 text-base text-gray-500 font-bold uppercase tracking-widest">
              Life event photos
            </h1>

            <a
              className=" z-10 mt-6 rounded-lg border border-gray-900 bg-gray-800 px-3 py-2 text-sm font-semibold text-gray-200 transition hover:bg-gray-900 hover:text-white md:mt-4"
              href="/categories"
              rel="noreferrer"
            >
              View photos by categories
            </a>
          </div>
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
  );
}

HomePage.layout = "Main";
