"use client";

import { useState } from "react";
import Search from "@/components/Search";
import Cards from "@/components/Cards";
import Pagination from "@/components/Pagination";
import { useJobsSearch } from "@/hooks/useGetJobs";
import { profileService } from "@/services/ProfileService";

const PAGE_SIZE = 10;

export default function JobsPage() {
  const [query, setQuery] = useState(profileService.getProfile()?.jobTitle || 'job');
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useJobsSearch({ query, page, num_pages: 1 });

  const handleSearch = (query: string) => {
    setQuery(query);
    setPage(1);
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const hasNextPage = data?.jobs?.length === PAGE_SIZE;

  return (
    <div className="m-8">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold text-gray-300 mb-4">Job search</h2>
        <Search onSearch={handleSearch} />
      </div>
      <Cards data={data?.jobs || []} isError={isError} isLoading={isLoading} />
      <Pagination
        currentPage={page}
        hasNextPage={hasNextPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
