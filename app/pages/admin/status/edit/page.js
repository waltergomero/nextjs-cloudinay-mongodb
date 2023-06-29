"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { alertService } from "@/services/alert.service";

import Form from "../statusForm";

const UpdateStatus = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const statusId = searchParams.get("id");

  const [status, setStatus] = useState({ status_name: "", status_typeid: "", _id: "" });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getStatusDetails = async () => {
      const response = await fetch(`/api/admin/status/${statusId}`);
      const data = await response.json();

      setStatus({
        status_name: data.status_name,
        status_typeid: data.status_typeid,
        _id: data._id,
      });
    };

    if (statusId) getStatusDetails();
  }, [statusId]);


  const updateStatus = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!statusId) return alert("Missing Status Id!");

    await fetch(`/api/admin/status/${statusId}`, {
      method: "PATCH",
      body: JSON.stringify({
          status
      }),
    })
      .then((response) => response.json())
      .then(data => {
      if(data.error){
           alertService.error(data.error);
        }
      else{
          router.push("/pages/admin/status")
       }
  })
.catch(error => alertService.error(error.message))

  };
  
if(status._id != "") // call the form if data was returned
{
  return (
    <Form
      type='Edit'
      status={status}
      setStatus={setStatus}
      submitting={submitting}
      handleSubmit={updateStatus}
    />
  );
}
};

export default UpdateStatus;
