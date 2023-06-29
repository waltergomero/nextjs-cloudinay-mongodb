'use client';
import { useState, useEffect } from "react";
import { Spinner } from "@/components/Spinner";
import CategoryTable from "./categoryTable";
const apiUrl = process.env.public_url_api;
const baseApiUrl = `${apiUrl}/admin/categories`;

const CategoryPage = () => {
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
    const response = await fetch(`${baseApiUrl}`);
    const data = await response.json()

    setCategory(data);

  };
  fetchCategory();

}, []);


let categoryContent = "";

if (category) {
  categoryContent = <CategoryTable data={category} />;
}

return (
  <>
    {!category && <Spinner />}
    {categoryContent}
  </>
);
}

export default CategoryPage;
