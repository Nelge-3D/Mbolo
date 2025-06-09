"use client";

import { useState } from "react";
import SuperAdminLayout from "@/components/layouts/SuperAdminLayout";
import { Trash2, UserCheck } from "lucide-react";
import { useForm } from "react-hook-form";

interface Invite {
  id: number;
  email: string;
  status: "invité" | "en attente" | "activé";
}

export default function InvitationsPage() {
  const [invites, setInvites] = useState<Invite[]>([
    { id: 1, email: "lara@example.com", status: "invité" },
    { id: 2, email: "kofi@example.com", status: "en attente" },
    { id: 3, email: "paul@example.com", status: "activé" },
  ]);

  const { register, handleSubmit, reset } = useForm<{ email: string }>();

  const onSubmit = ({ email }: { email: string }) => {
    setInvites(prev => [...prev, { id: Date.now(), email, status: "invité" }]);
    reset();
  };

  const activateInvite = (id: number) => {
    setInvites(prev =>
      prev.map(i => (i.id === id ? { ...i, status: "activé" } : i))
    );
  };

  const deleteInvite = (id: number) => {
    if (confirm("Supprimer cette invitation ?")) {
      setInvites(prev => prev.filter(i => i.id !== id));
    }
  };

  return (
    <SuperAdminLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Invitations</h1>
        <p className="text-sm text-gray-600">Inviter un contributeur par email ou activer un compte manuellement.</p>
      </div>

      {/* Formulaire d'invitation */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-2 mb-6">
        <input
          type="email"
          placeholder="Email du contributeur"
          {...register("email", { required: true })}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Envoyer l&apos;invitation
        </button>
      </form>

      {/* Tableau des invitations */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-gray-200 rounded-xl overflow-hidden text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Statut</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {invites.map((invite) => (
              <tr key={invite.id}>
                <td className="px-4 py-2">{invite.email}</td>
                <td className="px-4 py-2 capitalize">
                  {invite.status === "invité" && (
                    <span className="text-blue-600 font-medium">Invité</span>
                  )}
                  {invite.status === "en attente" && (
                    <span className="text-yellow-600 font-medium">En attente</span>
                  )}
                  {invite.status === "activé" && (
                    <span className="text-green-600 font-medium">Activé</span>
                  )}
                </td>
                <td className="px-4 py-2 flex gap-2">
                  {invite.status !== "activé" && (
                    <button
                      onClick={() => activateInvite(invite.id)}
                      className="text-green-600 hover:text-green-800 flex items-center gap-1"
                    >
                      <UserCheck size={16} />
                      Activer
                    </button>
                  )}
                  <button
                    onClick={() => deleteInvite(invite.id)}
                    className="text-red-600 hover:text-red-800 flex items-center gap-1"
                  >
                    <Trash2 size={16} />
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
            {invites.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center text-gray-500">
                  Aucune invitation pour l’instant
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </SuperAdminLayout>
  );
}
