"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { alertService } from "@/services/alert.service";
import Form from "../userForm";

const apiUrl = process.env.public_url_api;
const baseUrl = `${apiUrl}/admin/users`;

const UpdateUserInfo = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");

  const [user, setUser] = useState({ first_name: "", last_name: "", email: "", password:"", role: "", _id: "" });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getUserDetails = async () => {
      const response = await fetch(`${baseUrl}/${userId}`);
      const data = await response.json();

      setUser({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password,
        role: data.role,
        _id: data._id,
      });
    };

    if (userId) getUserDetails();
  }, [userId]);


  const updateUser = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!userId) return alert("Missing User Id!");

    await fetch(`/api/admin/users/${userId}`, { method: "PATCH", body: JSON.stringify({ user }), })
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
  
if(user._id != "") // call the form if data was returned
{
  return (
    <Form
      type='Edit'
      data={user}
      setUser={setUser}
      submitting={submitting}
      handleSubmit={updateUser}
    />
  );
}
};

export default UpdateUserInfo;


// 'use client';

// import { useState, useEffect } from 'react';
// import { Spinner } from '@/components/Spinner';
// import { useSearchParams } from "next/navigation";

// const apiUrl = process.env.public_url_api;
// const baseUrl = `${apiUrl}/admin/users`;

// import AddEditUserPage from '.';

// export default function EditPage() {
//   const [user, setUser] = useState(null);
  
//   const searchParams = useSearchParams();
//   const id = searchParams.get("id");

  
//   useEffect(() => {
//     const fetchUser = async () => {
//     const response = await fetch(`${baseUrl}/${id}`);
//     const data = await response.json()

//     setUser(data);

//   };
//  fetchUser();

// }, []);

//  return (
//         <>
//           {user ? <AddEditUserPage data={user} /> : <Spinner /> }
//         </>
                
//  );
// }
