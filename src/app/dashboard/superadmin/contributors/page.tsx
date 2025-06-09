"use client";

import { useState } from "react";
import SuperAdminLayout from "@/components/layouts/SuperAdminLayout";
import { Pencil, Trash2, Search } from "lucide-react";
import { Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";

interface Contributor {
  id: number;
  name: string;
  email: string;
  role: "contributeur" | "admin" | "superadmin";
  active: boolean;
}

export default function ContributorsPage() {
  const [contributors, setContributors] = useState<Contributor[]>([
    { id: 1, name: "Alice Nguema", email: "alice@example.com", role: "contributeur", active: true },
    { id: 2, name: "Marc Obiang", email: "marc@example.com", role: "admin", active: true },
    { id: 3, name: "Sophie Mba", email: "sophie@example.com", role: "contributeur", active: false },
  ]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
  const [isOpen, setIsOpen] = useState(false);
  const [editingContributor, setEditingContributor] = useState<Contributor | null>(null);
  const { register, handleSubmit, reset } = useForm<Contributor>();

  const filteredContributors = contributors.filter(c => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.role.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ? true : statusFilter === "active" ? c.active : !c.active;

    return matchesSearch && matchesStatus;
  });

  const onSubmit = (data: Contributor) => {
    if (editingContributor) {
      setContributors(prev =>
        prev.map(c => (c.id === editingContributor.id ? { ...c, role: data.role } : c))
      );
    }
    closeModal();
  };

  const openModal = (contributor: Contributor) => {
    setEditingContributor(contributor);
    reset({ ...contributor });
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setEditingContributor(null);
    reset();
  };

  const deleteContributor = (id: number) => {
    if (confirm("Voulez-vous vraiment supprimer ce contributeur ?")) {
      setContributors(prev => prev.filter(c => c.id !== id));
    }
  };

  const toggleActiveStatus = (id: number) => {
    setContributors(prev =>
      prev.map(c => (c.id === id ? { ...c, active: !c.active } : c))
    );
  };

  return (
    <SuperAdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Gestion des contributeurs</h1>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2">
          <Search className="text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Rechercher un contributeur..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          />
        </div>

        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value as "all" | "active" | "inactive")}
          className="text-sm border border-gray-300 rounded px-2 py-2"
        >
          <option value="all">Tous</option>
          <option value="active">Actifs</option>
          <option value="inactive">Désactivés</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-gray-200 rounded-xl overflow-hidden">
          <thead className="bg-gray-100 text-left text-sm">
            <tr>
              <th className="px-4 py-2">Nom</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Rôle</th>
              <th className="px-4 py-2">Statut</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y">
            {filteredContributors.map((contributor) => (
              <tr
                key={contributor.id}
                className={contributor.active ? "" : "opacity-50 cursor-not-allowed"}
              >
                <td className="px-4 py-2">{contributor.name}</td>
                <td className="px-4 py-2">{contributor.email}</td>
                <td className="px-4 py-2 capitalize">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium text-white ${
                      contributor.role === "superadmin"
                        ? "bg-red-600"
                        : contributor.role === "admin"
                        ? "bg-blue-600"
                        : "bg-green-600"
                    }`}
                  >
                    {contributor.role}
                  </span>
                </td>
                <td className="px-4 py-2">
                  {contributor.active ? "Actif" : "Désactivé"}
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => openModal(contributor)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => toggleActiveStatus(contributor.id)}
                    className="text-yellow-600 hover:text-yellow-800"
                  >
                    {contributor.active ? "Désactiver" : "Activer"}
                  </button>
                  <button
                    onClick={() => deleteContributor(contributor.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {filteredContributors.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                  Aucun contributeur trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Dialog
        open={isOpen}
        onClose={closeModal}
        className="fixed z-50 inset-0 flex items-center justify-center"
      >
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

        <Dialog.Panel className="relative bg-white p-6 rounded-xl w-[90%] max-w-md z-50 shadow-lg">
          <Dialog.Title className="text-xl font-semibold mb-4">
            Modifier le rôle de {editingContributor?.name}
          </Dialog.Title>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="role">
                Rôle
              </label>
              <select
                id="role"
                {...register("role")}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="contributeur">Contributeur</option>
                <option value="admin">Admin</option>
                <option value="superadmin">Super Admin</option>
              </select>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Modifier
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </Dialog>
    </SuperAdminLayout>
  );
}
