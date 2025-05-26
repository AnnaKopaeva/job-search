
import useSWR from 'swr'
import { jobsService } from '@/services/JobsService'

export const useJobDetails = (id: string) => {
  const { data, error, isLoading, mutate } = useSWR('/job-details', () => jobsService.getJobDetails(id));

  return {
    data,
    isLoading,
    isError: error,
    mutate,
  }
}
