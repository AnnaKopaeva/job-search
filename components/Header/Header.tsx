'use client';

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logout from "@/components/Logout";
import { useUserService } from '@/services/UserService';

export default function Header() {
  const { isAuthenticated } = useUserService();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace('/login');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!isAuthenticated() || !isClient) return null;

  return (
    <header className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md">
      <Link href="/jobs" className="text-xl font-bold tracking-wide">Job Search</Link>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Menu
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg z-10">
            <ul className="py-2">
              <li
                onClick={() => handleNavigation("/create-profile")}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors"
              >
                Profile
              </li>
              <li
                onClick={() => handleNavigation("/liked")}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors"
              >
                Liked Jobs
              </li>
              <Logout />
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
