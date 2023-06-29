"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { alertService } from "@/services/alert.service";
import Form from "../categoryForm";

const UpdateCategory = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("id");

  const [category, setCategory] = useState({ category_name: "", status_id: "", _id: "", status_name: "" });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getStatusDetails = async () => {
      const response = await fetch(`/api/admin/categories/${categoryId}`);
      const data = await response.json();

      setCategory({
        category_name: data.category_name,
        status_id: data.status_id,
        status_name: data.status_name,
        _id: data._id,
      });
    };

    if (categoryId) getStatusDetails();
  }, [categoryId]);



  const updateCategory = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!categoryId) return alert("Missing Category Id!");

    await fetch(`/api/admin/categories/${categoryId}`, { method: "PATCH",  body: JSON.stringify({ category }), })
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

  
if(category._id != "") // call the form if data was returned
{
  return (
    <Form
      type='Edit'
      data={category}
      setCategory={setCategory}
      submitting={submitting}
      handleSubmit={updateCategory}
    />
  );
}
};

export default UpdateCategory;
