
import useSWR from 'swr'
import { useUserService } from '@/services/UserService'

export const useProfile = () => {
  const api = useUserService()

  const { data, error, isLoading, mutate } = useSWR('me', () => api.getProfile())

  return {
    data,
    isLoading,
    isError: error,
    mutate,
  }
}
