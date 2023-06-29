'use client';
import { useState, useEffect } from "react";
import { Spinner } from "@/components/Spinner";
import StatusTable from "./statusTable";
const apiUrl = process.env.public_url_api;
const baseApiUrl = `${apiUrl}/admin/status`;

const StatusPage = () => {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const fetchStatus = async () => {
    const response = await fetch(`${baseApiUrl}`);
    const data = await response.json()

    setStatus(data);

  };
  fetchStatus();

}, []);


let statusContent = "";

if (status) {
  statusContent = <StatusTable data={status} />;
}

return (
  <>
    {!status && <Spinner />}
    {statusContent}
  </>
);
}

export default StatusPage;
