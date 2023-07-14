'use client'

import React from 'react';
import { useState, useEffect } from "react";
import Link from 'next/link';
import Image from 'next/image';

const apiUrl = process.env.public_url_api;
const baseApiUrl = `${apiUrl}/front/categories`;


const ByCategories = () => {

    const [categories, setCategories] = useState()

    useEffect(() => {
        const fetchImagesByCategory = async () => {
        const response = await fetch(`${baseApiUrl}`);
        const data = await response.json()
    
        setCategories(data);
    
      };
      fetchImagesByCategory();
    
    }, []);

  return (
    <main className="mx-auto max-w-[1960px] p-4">
    <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
      {categories &&
        categories?.map((item) => (
          <div>
            <Link
              href={`/bycategory?id=${item.category_id}`}
              key={item.category_id}
              className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
            >
              <Image
                alt={item.category_name}
                className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110 cursor-pointer"
                src={item.image_url}
                width={720}
                height={480}
                sizes="(max-width: 640px) 100vw,
            (max-width: 1280px) 50vw,
            (max-width: 1536px) 33vw,
            25vw"
              />
              <div className="absolute text-1xl font-semibold tracking-wide  text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {item.category_name}
              </div>
            </Link>
          </div>
        ))}
    </div>
  </main>
  )
}

export default ByCategories