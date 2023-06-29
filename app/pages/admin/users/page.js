'use client'
import React from 'react';
import { useState, useEffect } from "react";
import { Spinner } from "@/components/Spinner";
import UserTable from "./userTable";
import { useRouter } from "next/navigation";

const apiUrl = process.env.public_url_api;
const baseUrl = `${apiUrl}/admin/users`;

const UserPage = () => {
  const router = useRouter();
  const [users, setUsers] = useState(null);

  useEffect(() => {
      const fetchUsers = async () => {
      const response = await fetch(`${baseUrl}`);
      const data = await response.json()

      setUsers(data);

    };
   fetchUsers();

  }, []);

  let userContent = "";

if (users) {
  userContent = <UserTable data={users} />;
}

return (
  <>
    {!users && <Spinner />}
    {userContent}
  </>
);

}


export default UserPage
