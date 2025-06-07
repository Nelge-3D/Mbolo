"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

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
        <h2 className="text-2xl font-[Italiana] mb-6">Mbolo Admin</h2>
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
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
}
