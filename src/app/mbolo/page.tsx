"use client";

import {
  Baby,
  User,
  UserRound,
  UserCheck,
  UserCog,
  UserCircle,
} from "lucide-react";
import { useState } from "react";

const levels = [
  { label: "Bébé", icon: Baby, color: "text-gray-400", size: "w-6 h-6" },
  { label: "Enfant", icon: User, color: "text-gray-500", size: "w-7 h-7" },
  { label: "Adolescent", icon: UserRound, color: "text-blue-500", size: "w-8 h-8" },
  { label: "Jeune adulte", icon: UserCheck, color: "text-green-500", size: "w-9 h-9" },
  { label: "Adulte", icon: UserCog, color: "text-yellow-600", size: "w-10 h-10" },
  { label: "Sage", icon: UserCircle, color: "text-orange-700", size: "w-12 h-12" },
];

export default function EvolutionAvatar() {
  const [level, setLevel] = useState(0);
  const { label, icon: Icon, color, size } = levels[level];

  return (
    <div className="flex flex-col items-center p-6 rounded-xl border shadow-md bg-white w-fit mx-auto transition-all duration-300">
      <Icon className={`${size} ${color} mb-2 transition-all`} />
      <p className="text-lg font-semibold">{label}</p>
      <button
        onClick={() => setLevel((prev) => (prev + 1) % levels.length)}
        className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primaryHover transition"
      >
        Monter de niveau
      </button>
    </div>
  );
}
