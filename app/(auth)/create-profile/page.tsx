"use client"

import { useProfile } from '@/hooks/useProfile'

export default function ProfilePage() {
  const { data, isLoading, isError } = useProfile();

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading user</div>

  return (
    <>{data && <div>Welcome, {data.user.email}!</div>}</>
  )
}
