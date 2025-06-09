"use client";

import { useState } from "react";
import SuperAdminLayout from "@/components/layouts/SuperAdminLayout";
import { Pencil, Trash2, Search } from "lucide-react";
import { Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";

interface Word {
  id: number;
  original: string;
  translation: string;
  language: "Fang" | "Nzebi" | "Teke";
  active: boolean;
}

export default function DictionaryPage() {
  const [words, setWords] = useState<Word[]>([
    { id: 1, original: "Bonjour", translation: "Mbote", language: "Fang", active: true },
    { id: 2, original: "Merci", translation: "Oyé", language: "Nzebi", active: true },
    { id: 3, original: "Feu", translation: "Yaya", language: "Teke", active: false },
  ]);

  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [editingWord, setEditingWord] = useState<Word | null>(null);
  const { register, handleSubmit, reset } = useForm<Word>();

  const filteredWords = words.filter(w =>
    w.original.toLowerCase().includes(search.toLowerCase()) ||
    w.translation.toLowerCase().includes(search.toLowerCase()) ||
    w.language.toLowerCase().includes(search.toLowerCase())
  );

  const onSubmit = (data: Word) => {
    if (editingWord) {
      setWords(prev =>
        prev.map(w => (w.id === editingWord.id ? { ...w, ...data } : w))
      );
    } else {
      setWords(prev => [...prev, { ...data, id: Date.now(), active: true }]);
    }
    closeModal();
  };

  const openModal = (word?: Word) => {
    setEditingWord(word ?? null);
    reset(word ?? { original: "", translation: "", language: "Fang", active: true });
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setEditingWord(null);
    reset();
  };

  const deleteWord = (id: number) => {
    if (confirm("Supprimer ce mot ?")) {
      setWords(prev => prev.filter(w => w.id !== id));
    }
  };

  const toggleStatus = (id: number) => {
    setWords(prev => prev.map(w => (w.id === id ? { ...w, active: !w.active } : w)));
  };

  return (
    <SuperAdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestion du dictionnaire</h1>
        <button
          onClick={() => openModal()}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          + Ajouter un mot
        </button>
      </div>

      <div className="mb-4 flex items-center gap-2">
        <Search className="text-gray-500" size={18} />
        <input
          type="text"
          placeholder="Rechercher un mot..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-gray-200 rounded-xl overflow-hidden">
          <thead className="bg-gray-100 text-left text-sm">
            <tr>
              <th className="px-4 py-2">Original</th>
              <th className="px-4 py-2">Traduction</th>
              <th className="px-4 py-2">Langue</th>
              <th className="px-4 py-2">Statut</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y">
            {filteredWords.map(word => (
              <tr
                key={word.id}
                className={word.active ? "" : "opacity-50"}
              >
                <td className="px-4 py-2">{word.original}</td>
                <td className="px-4 py-2">{word.translation}</td>
                <td className="px-4 py-2">{word.language}</td>
                <td className="px-4 py-2">{word.active ? "Actif" : "Inactif"}</td>
                <td className="px-4 py-2 space-x-2">
                  <button onClick={() => openModal(word)} className="text-blue-600 hover:text-blue-800">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => toggleStatus(word.id)} className="text-yellow-600 hover:text-yellow-800">
                    {word.active ? "Désactiver" : "Activer"}
                  </button>
                  <button onClick={() => deleteWord(word.id)} className="text-red-600 hover:text-red-800">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {filteredWords.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center px-4 py-6 text-gray-500">Aucun mot trouvé</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Dialog open={isOpen} onClose={closeModal} className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <Dialog.Panel className="relative bg-white p-6 rounded-xl w-[90%] max-w-md z-50 shadow-lg">
          <Dialog.Title className="text-xl font-semibold mb-4">
            {editingWord ? `Modifier le mot` : "Ajouter un nouveau mot"}
          </Dialog.Title>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Mot original</label>
              <input {...register("original", { required: true })} className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Traduction</label>
              <input {...register("translation", { required: true })} className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Langue</label>
              <select {...register("language")} className="w-full border rounded px-3 py-2">
                <option value="Fang">Fang</option>
                <option value="Nzebi">Nzebi</option>
                <option value="Teke">Teke</option>
              </select>
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={closeModal} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">
                Annuler
              </button>
              <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
                {editingWord ? "Modifier" : "Ajouter"}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </Dialog>
    </SuperAdminLayout>
  );
}
