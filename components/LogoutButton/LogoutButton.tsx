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
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
    >
      Log Out
    </button>
  );
}
