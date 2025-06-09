"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { Bell, UserCircle2 } from "lucide-react";

const links = [
  { name: "Vue d'activité", path: "/dashboard/superadmin/activity" },
  { name: "Cours", path: "/dashboard/superadmin/courses" },
  { name: "Contributeurs", path: "/dashboard/superadmin/contributors" },
  { name: "Dictionnaire", path: "/dashboard/superadmin/dictionary" },
  { name: "Invitations", path: "/dashboard/superadmin/invitations" },
];

export default function SuperAdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex bg-white text-black font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-200 p-6 bg-white">
        <h2 className="text-2xl font-[Italiana] mb-6">Mbolo Super Admin</h2>
        <nav className="space-y-3">
          {links.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`block px-4 py-2 rounded-lg transition ${
                pathname === link.path
                  ? "bg-green-100 text-green-900 font-semibold"
                  : "hover:bg-gray-100 text-gray-800"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white sticky top-0 z-10">
          <div className="text-sm text-gray-500">
            Connecté en tant que <span className="font-semibold text-green-700">Super Admin</span>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative hover:text-green-700 transition">
              <Bell className="w-5 h-5" />
              {/* Badge notification */}
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500" />
            </button>

            <div className="flex items-center gap-2 text-sm text-gray-700">
              <UserCircle2 className="w-6 h-6 text-gray-500" />
              <span className="hidden sm:inline">Super Admin</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
