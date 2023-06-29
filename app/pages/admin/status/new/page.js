"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from '../statusForm';
import { alertService } from "@/services/alert.service";


const AddStatus = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ status_name: "", status_typeid: "" });

  const createStatus = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    await fetch("/api/admin/status/new", {
            method: "POST",
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

  return (
    <Form
      type='Create'
      status={status}
      setStatus={setStatus}
      submitting={submitting}
      handleSubmit={createStatus}
    />
  );
};

export default AddStatus;
