"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from '../categoryForm';
import { alertService } from "@/services/alert.service";


const AddCategory = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setIsSubmitting] = useState(false);
  const [category, setCategory] = useState({ category_name: "", status_id: "", status_name: "" });

  const createCategory = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    await fetch("/api/admin/categories/new", {method: "POST", body: JSON.stringify({ category}),})
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

  return (
    <Form
      type='Create'
      data={category}
      setCategory={setCategory}
      submitting={submitting}
      handleSubmit={createCategory}
    />
  );
};

export default AddCategory;
