"use client";

import { useState, useEffect,} from "react";
import SuperAdminLayout from "@/components/layouts/SuperAdminLayout";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";

interface Course {
  id: number;
  title: string;
  language: string;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, title: "Introduction au Fang", language: "Fang" },
    { id: 2, title: "Grammaire Nzebi", language: "Nzebi" },
    { id: 3, title: "Expressions courantes en Teke", language: "Teke" },
  ]);

  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const { register, handleSubmit, reset, formState: { errors }, setFocus } = useForm<Course>();

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(search.toLowerCase()) ||
    course.language.toLowerCase().includes(search.toLowerCase())
  );

  const onSubmit = (data: Course) => {
    if (editingCourse) {
      setCourses(prev =>
        prev.map(c => (c.id === editingCourse.id ? { ...c, ...data } : c))
      );
    } else {
      setCourses(prev => [...prev, { ...data, id: Date.now() }]);
    }
    closeModal();
  };

  const openModal = (course?: Course) => {
    if (course) {
      setEditingCourse(course);
      reset(course);
    } else {
      setEditingCourse(null);
      reset({ title: "", language: "" });
    }
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setEditingCourse(null);
    reset();
  };

  // Focus le premier champ quand la modale s'ouvre
  useEffect(() => {
    if (isOpen) setFocus("title");
  }, [isOpen, setFocus]);

  const deleteCourse = (id: number) => {
    if (confirm("Voulez-vous vraiment supprimer ce cours ?")) {
      setCourses(prev => prev.filter(c => c.id !== id));
    }
  };

  return (
    <SuperAdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Gestion des cours</h1>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
        >
          <Plus size={16} /> Ajouter un cours
        </button>
      </div>

      <div className="mb-4 flex items-center gap-2">
        <Search className="text-gray-500" size={18} />
        <input
          type="text"
          placeholder="Rechercher un cours..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-gray-200 rounded-xl overflow-hidden">
          <thead className="bg-gray-100 text-left text-sm">
            <tr>
              <th className="px-4 py-2">Titre</th>
              <th className="px-4 py-2">Langue</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y">
            {filteredCourses.map((course) => (
              <tr key={course.id}>
                <td className="px-4 py-2">{course.title}</td>
                <td className="px-4 py-2">{course.language}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => openModal(course)}
                    className="text-blue-600 hover:text-blue-800"
                    aria-label={`Modifier le cours ${course.title}`}
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => deleteCourse(course.id)}
                    className="text-red-600 hover:text-red-800"
                    aria-label={`Supprimer le cours ${course.title}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}

            {filteredCourses.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center text-gray-500">
                  Aucun cours trouvé
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
        {/* Overlay */}
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

        <Dialog.Panel className="relative bg-white p-6 rounded-xl w-[90%] max-w-md z-50 shadow-lg">
          <Dialog.Title className="text-xl font-semibold mb-4">
            {editingCourse ? "Modifier un cours" : "Ajouter un cours"}
          </Dialog.Title>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="title">
                Titre <span className="text-red-600">*</span>
              </label>
              <input
                id="title"
                type="text"
                {...register("title", { required: "Le titre est requis" })}
                className={`w-full border rounded px-3 py-2 ${
                  errors.title ? "border-red-500" : "border-gray-300"
                }`}
                autoComplete="off"
              />
              {errors.title && (
                <p className="text-red-600 text-xs mt-1">{errors.title.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="language">
                Langue <span className="text-red-600">*</span>
              </label>
              <input
                id="language"
                type="text"
                {...register("language", { required: "La langue est requise" })}
                className={`w-full border rounded px-3 py-2 ${
                  errors.language ? "border-red-500" : "border-gray-300"
                }`}
                autoComplete="off"
              />
              {errors.language && (
                <p className="text-red-600 text-xs mt-1">{errors.language.message}</p>
              )}
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
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
              >
                {editingCourse ? "Modifier" : "Ajouter"}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </Dialog>
    </SuperAdminLayout>
  );
}
