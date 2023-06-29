'use client';

import { useState, useEffect } from "react";
import { Spinner } from "@/components/Spinner";
import DeleteStatus from "../delete";
import { useRouter, useSearchParams } from "next/navigation";

const apiUrl = process.env.public_url_api;
const baseUrl = `${apiUrl}/admin/status`;

const DeletePage =() => {
  const router = useRouter();

  const [status, setStatus] = useState(null);
  const [submitting, setIsSubmitting] = useState(false);

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
      const fetchStatus = async () => {
      const response = await fetch(`${baseUrl}/${id}`);
      const data = await response.json()

      setStatus(data);

      };
      fetchStatus();

  }, []);

  const deleteStatus = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!id) return alert("Missing Status Id!");

    try {
      const response = await fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
        body: JSON.stringify({
          id
        }),
      });
      if (response.ok) {
        router.push("/pages/admin/status");
      }
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };
  

  if(status){
    return <><DeleteStatus 
              status={status}
              type='Delete'
              submitting={submitting}
              handleSubmit={deleteStatus} /></>;
  }

}

export default DeletePage;