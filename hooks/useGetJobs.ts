
import useSWR from 'swr'
import { jobsService, JobsSearchParams } from '@/services/JobsService'

export const useJobsSearch = (params: JobsSearchParams) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/search?params${JSON.stringify(params)}`,
     () => jobsService.getJobs(params), 
    {
      refreshInterval: 0,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    });

  return {
    data,
    isLoading,
    isError: error,
    mutate,
  }
}
