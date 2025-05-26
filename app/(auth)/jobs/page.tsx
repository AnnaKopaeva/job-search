"use client";

import { useState } from "react";
import Search from "@/components/Search";
import Cards from "@/components/Cards";
import { useJobsSearch } from "@/hooks/useGetJobs";

export default function JobsPage() {
  const [query, setQuery] = useState('jobs');
  const { data, isLoading, isError } = useJobsSearch({ query, page: 1, num_pages: 1 });

  const handleSearch = (query: string) => {
    setQuery(query)
  }

  return (
    <div className="m-8">
      Job search
      <Search onSearch={handleSearch} />
      <Cards data={data?.jobs || []} isError={isError} isLoading={isLoading} />
    </div>
  );
}
