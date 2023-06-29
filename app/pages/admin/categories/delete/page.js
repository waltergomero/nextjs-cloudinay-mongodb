'use client';

import { useState, useEffect } from "react";
import DeleteCategory from "../delete";
import { useRouter, useSearchParams } from "next/navigation";
import { alertService } from "@/services/alert.service";

const apiUrl = process.env.public_url_api;
const baseUrl = `${apiUrl}/admin/categories`;

const DeletePage =() => {
  const router = useRouter();

  const [category, setCategory] = useState(null);
  const [submitting, setIsSubmitting] = useState(false);

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
      const fetchCategory = async () => {
      const response = await fetch(`${baseUrl}/${id}`);
      const data = await response.json()

      setCategory(data);

      };
      fetchCategory();

  }, []);

  const deleteCategory = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!id) return alert("Missing Status Id!");

    await fetch(`${baseUrl}/${id}`, {
      method: "DELETE",
      body: JSON.stringify({
          id
      }),
    })
    .then((response) => response.json())
    .then(data => {
      if(data.error){
          alertService.error(data.error);
        }
      else{
          router.push("/pages/admin/categories")
      }
    })
    .catch(error => alertService.error(error.message))
  };
  

  if(category){
    return <><DeleteCategory 
              data={category}
              type='Delete'
              submitting={submitting}
              handleSubmit={deleteCategory} /></>;
  }

}

export default DeletePage;