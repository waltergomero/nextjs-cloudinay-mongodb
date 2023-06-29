import React from "react";
import Link from "next/link";

const StatusTable = (props) => {
  const status = props.data;
  const role = localStorage.getItem("role");

  return (
    <>
      <div className="flex h-full flex-col rounded p-4 m-2 border border-gray-200">
        <h5 className="text-dark text-lg leading-tight font-medium mb-2">
          Status
        </h5>
        <div>
        {role === "admin" ? 
          <Link
            href="/pages/admin/status/new"
            className="px-4 py-1.5 bg-blue-600 text-white font-medium text-xs uppercase rounded"
          >
            Add Status
          </Link> : ""}
        </div>


      <table className="border text-center mt-2 mb-4">
        <thead className="border-b bg-gray-100">
          <tr>
            <th className="text-sm text-gray-700  px-6 py-1 border-r">ID #</th>
            <th className="text-sm text-gray-700  px-6 py-1 border-r">
              Status Name
            </th>
            <th className="text-sm text-gray-700  px-6 py-1 border-r">
              Status Type Id
            </th>
            <th className="text-sm text-gray-700  px-6 py-1 border-r">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {status &&
            status.map((s) => (
              <tr className="border-b" key={s._id}>
                <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                  {s._id}
                </td>
                <td className="text-sm text-gray-900  px-6 py-1 whitespace-nowrap border-r">
                  {s.status_name}
                </td>
                <td className="text-sm text-gray-900  px-6 py-1 whitespace-nowrap border-r">
                  {s.status_typeid}
                </td>
                {role === "admin" ? 
                <td className="text-sm text-gray-900  px-6 py-1 whitespace-nowrap border-r">
                  <Link
                    href={`/pages/admin/status/edit?id=${s._id}`}
                    className="px-4 py-1 bg-blue-500 text-white font-medium text-xs uppercase rounded"
                  >
                    Edit
                  </Link>
                  <span>&nbsp; </span>
                  <Link
                    href={`/pages/admin/status/delete?id=${s._id}`}
                    className="px-4 py-1 bg-red-500 text-white font-medium text-xs uppercase rounded"
                  >
                    Delete
                  </Link>
                </td> : ""}
              </tr>
            ))}
        </tbody>
      </table>
      </div>
      {
      (status.length === 0 ?     
        <p className="p-2">No records were found.</p>
        : ""
      )
      }
    </>
  );
};


export default StatusTable;


