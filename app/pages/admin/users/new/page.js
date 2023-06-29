"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from '../userForm';
import { alertService } from "@/services/alert.service";


const AddUser = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState({ first_name: "", last_name: "", email: "", password:"", role: "", _id: "" });

  const createUser = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    await fetch("/api/admin/users/new", { method: "POST", body: JSON.stringify({ user }), })
    .then((response) => response.json())
    .then(data => {
      if(data.error){
        alertService.error(data.error);
        }
      else{
        router.push("/pages/admin/users")
      }
      })
    .catch(error => alertService.error(error.message))
    };

  return (
    <Form
      type='Create'
      data={user}
      setUser={setUser}
      submitting={submitting}
      handleSubmit={createUser}
    />
  );
};

export default AddUser;
