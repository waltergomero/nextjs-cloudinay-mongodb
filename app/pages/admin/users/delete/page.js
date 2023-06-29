'use client';

import { useState, useEffect } from "react";
import { Spinner } from "@/components/Spinner";
import DeleteUser from "../delete";
import { useRouter, useSearchParams } from "next/navigation";

const apiUrl = process.env.public_url_api;
const baseUrl = `${apiUrl}/admin/users`;

const DeletePage =() => {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [submitting, setIsSubmitting] = useState(false);

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
      const fetchUser = async () => {
      const response = await fetch(`${baseUrl}/${id}`);
      const data = await response.json()

      setUser(data);

      };
      fetchUser();

  }, []);

  const deleteUser = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!id) return alert("Missing User Id!");

    try {
      const response = await fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
        body: JSON.stringify({
          id
        }),
      });

      if (response.ok) {
        router.push("/pages/admin/users");
      }
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };
  

  if(user){
    return <><DeleteUser 
              data={user}
              type='Delete'
              submitting={submitting}
              handleSubmit={deleteUser} /></>;
  }

}

export default DeletePage;