'use client';

import { useRouter } from "next/navigation";
import { useUserService } from '@/services/UserService';

export default function LogoutButton() {
  const router = useRouter();
  const userService = useUserService();

  const handleLogout = async () => {
    try {
      await userService.logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <li
      onClick={handleLogout}
      className="px-4 py-2 text-red-500 hover:bg-red-100 cursor-pointer transition-colors"
    >
      Log Out
    </li>
  );
}
