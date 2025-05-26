
import useSWR from 'swr'
import { jobsService } from '@/services/JobsService'

export const useJobDetails = (ids: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/job-details?ts=${ids}`,
    () => jobsService.getJobDetails(ids),
  );

  return {
    data,
    isLoading,
    isError: error,
    mutate,
  }
}
