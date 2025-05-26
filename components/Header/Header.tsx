'use client';

import LogoutButton from "@/components/LogoutButton";
import { useUserService } from '@/services/UserService';

export default function Header() {
  const { isAuthenticated } = useUserService();

  if (!isAuthenticated) return null;

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-lg font-bold">Job Search</h1>
      <LogoutButton />
    </header>
  );
}
