import SuperAdminLayout from "@/components/layouts/SuperAdminLayout";

export default function SuperAdminDashboardPage() {
  return (
    <SuperAdminLayout>
      <h1 className="text-3xl font-bold mb-6">Bienvenue Super Admin</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map(({ title, href }) => (
          <a
            key={title}
            href={href}
            className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition bg-white text-black"
          >
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="text-sm text-gray-500 mt-1">
              Gérer la section {title.toLowerCase()}.
            </p>
          </a>
        ))}
      </div>
    </SuperAdminLayout>
  );
}

const cards = [
  { title: "Vue d'activité", href: "/dashboard/superadmin/activity" },
  { title: "Cours", href: "/dashboard/superadmin/courses" },
  { title: "Contributeurs", href: "/dashboard/superadmin/contributors" },
  { title: "Dictionnaire", href: "/dashboard/superadmin/dictionary" },
  { title: "Invitations", href: "/dashboard/superadmin/invitations" },
];
