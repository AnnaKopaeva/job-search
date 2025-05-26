
import useSWR from 'swr'
import { jobsService, JobsSearchParams } from '@/services/JobsService'

export const useJobsSearch = (params: JobsSearchParams) => {
  const { data, error, isLoading, mutate } = useSWR('/search', () => jobsService.getJobs(params));

  return {
    data,
    isLoading,
    isError: error,
    mutate,
  }
}
