import { useJobs } from "@/hooks/useGetJobs";

export default function LikedPage() {
  // const { jobs, isLoading, isError } = useJobs({ query: "web development jobs in chicago", page:1, num_pages:1 });

  // console.log('jobs', jobs);

  return (
    <div>
      Liked Job
      {/* {isLoading ? (
        <div className="skeleton mb-2 flex h-[282px] w-full items-center justify-center rounded-lg"></div>
      ) : (
        <div>content</div>
      )} */}
    </div>
  );
}
