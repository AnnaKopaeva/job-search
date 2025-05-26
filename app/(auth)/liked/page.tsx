"use client";

import { useJobDetails } from "@/hooks/useJobDetails";
import { profileService } from "@/services/ProfileService";
import Cards from "@/components/Cards";

export default function LikedPage() {
  const ids = profileService.getLikedJobs();

  const { data, isLoading, isError } = useJobDetails(ids.join(','));

  if (isError) return <div className="text-center mt-8 text-red-500">Error loading liked jobs</div>;

  if (!data?.job && !isLoading) {
    return <div className="text-center mt-8">No liked jobs available.</div>;
  }

  return (
    <div className="m-8">
      <h2 className="text-2xl font-bold text-gray-300 mb-4">Liked Jobs</h2>
      <Cards data={data?.job || []} isLoading={isLoading} isError={isError} />
    </div>
  );
}
