"use client";

import { Bell, UserCircle } from "lucide-react";

export default function SuperAdminNavbar() {
  return (
    <header className="w-full border-b border-gray-200 bg-white px-4 py-3 flex justify-between items-center shadow-sm z-10">
      <div className="text-xl font-bold text-black">Mbolo - Super Admin</div>

      <div className="flex items-center gap-4">
        {/* Icône notifications */}
        <button className="relative text-gray-700 hover:text-black">
          <Bell size={22} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
            3
          </span>
        </button>

        {/* Super Admin Info */}
        <div className="flex items-center gap-2">
          <UserCircle size={24} className="text-gray-700" />
          <span className="text-sm font-medium text-gray-700">Super Admin</span>
        </div>
      </div>
    </header>
  );
}
