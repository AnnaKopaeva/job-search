"use client";

import { useJobDetails } from "@/hooks/useJobDetails";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const { data, isLoading, isError } = useJobDetails(id);
  const [showFullDescription, setShowFullDescription] = useState(false);

  if (isLoading) return <div className="text-center mt-8">Loading...</div>;
  if (isError) return <div className="text-center mt-8 text-red-500">Error loading job details</div>;

  if (!data?.job) {
    return <div className="text-center mt-8">No job details available.</div>;
  }

  const {
    job_id,
    job_title,
    job_description,
    job_is_remote,
    job_location,
    job_posted_at_timestamp,
    employer_logo,
    job_apply_link,
  } = data.job[0];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md m-8">
      <Link href="/jobs">
        <span className="text-blue-500 hover:underline mb-4 inline-block">← Back to Jobs</span>
      </Link>
  
      <div className="flex items-center space-x-4 mb-6">
        {employer_logo ? (
          <Image
            src={employer_logo}
            alt={`${job_title} logo`}
            width={80}
            height={80}
            className="h-20 w-20 object-cover rounded-full"
          />
        ) : (
          <div className="h-20 w-20 bg-gray-300 rounded-full"></div>
        )}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{job_title}</h1>
          <p className="text-gray-500">{job_location}</p>
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Job Description</h2>
        <p
          className={`text-gray-700 ${
            !showFullDescription ? "line-clamp-5" : ""
          }`}
        >
          {job_description}
        </p>
        <button
          onClick={() => setShowFullDescription(!showFullDescription)}
          className="text-blue-500 hover:underline mt-2"
        >
          {showFullDescription ? "Show Less" : "Show More"}
        </button>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Job Details</h2>
        <ul className="text-gray-700 space-y-2">
          <li>
            <strong>Job ID:</strong> {job_id}
          </li>
          <li>
            <strong>Remote:</strong> {job_is_remote ? "Yes" : "No"}
          </li>
          <li>
            <strong>Location:</strong> {job_location}
          </li>
          {job_posted_at_timestamp && <li>
            <strong>Posted On:</strong>{" "}
            {new Date(job_posted_at_timestamp * 1000).toLocaleDateString()}
          </li>}
        </ul>
      </div>
      <a
        href={job_apply_link}
        target="_blank"
        rel="noopener noreferrer"
        className="block mt-4 text-center bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600"
      >
        Apply Now
      </a>
    </div>
  );
}
