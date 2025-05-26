import Image from "next/image";
import Link from "next/link";
import { JobItemResponse } from "@/services/JobsService";
import CardSkeleton from "./CardSkeleton";

interface CardsProps {
  data: JobItemResponse[] | null;
  isError: boolean;
  isLoading: boolean;
}

export default function Cards({ data, isError, isLoading }: CardsProps) {
  if (isError && !isLoading) {
    return <span>Error in loading data, please enter search value.</span>
  }

  if (isLoading) {
    return (
      <CardSkeleton />
    );
  }

  return (
    <div className="flex flex-wrap gap-4 mt-6">
      {!!data?.length ? 
        data.map(({ job_id, job_title, job_description, job_is_remote, job_location, job_posted_at_timestamp, employer_logo }) => (
          <div key={job_id} className="max-w-64 p-4 bg-white shadow rounded-md flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-4 mb-4">
                {employer_logo ? (
                  <Image
                    src={employer_logo}
                    width={250}
                    height={250}
                    alt={`${job_title} logo`}
                    className="h-12 w-12 object-cover rounded-full"
                  />
                ) : (
                  <div className=" h-12 w-12 bg-gray-300 rounded-full flex-shrink-0"></div>
                )}
                <div>
                  <h2 className="text-lg text-gray-800 font-semibold">{job_title}</h2>
                  <p className="text-sm text-gray-500">{job_location}</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-4">
                {job_description.length > 100
                  ? `${job_description.substring(0, 100)}...`
                  : job_description}
              </p>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{job_is_remote ? "Remote" : "On-site"}</span>
                {job_posted_at_timestamp && <span>{new Date(job_posted_at_timestamp * 1000).toLocaleDateString()}</span>}
              </div>
              <Link href={`/job-details/${job_id}`} className="block mt-4 text-center bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Details</Link>
            </div>
          </div>
        ))
        : <span>No data available</span>}
    </div>
  );
}
