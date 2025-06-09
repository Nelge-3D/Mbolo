"use client";

import SuperAdminLayout from "@/components/layouts/SuperAdminLayout";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";

const COLORS = ["#34d399", "#60a5fa", "#f59e0b"];

const activityData = [
  { day: "Lun", users: 120},
  { day: "Mar", users: 200 },
  { day: "Mer", users: 150 },
  { day: "Jeu", users: 80 },
  { day: "Ven", users: 170 },
  { day: "Sam", users: 250 },
  { day: "Dim", users: 90 },
];

const languageData = [
  { name: "Fang", value: 400 },
  { name: "Nzebi", value: 300 },
  { name: "Teke", value: 300 },
];

const progressionData = [
  { week: "S1", score: 20 },
  { week: "S2", score: 35 },
  { week: "S3", score: 50 },
  { week: "S4", score: 65 },
  { week: "S5", score: 80 },
  { week: "S6", score: 95 },
];

const logs = [
  { id: 1, message: "Nouvel utilisateur inscrit", date: "2025-06-07" },
  { id: 2, message: "Cours Fang mis à jour", date: "2025-06-08" },
  { id: 3, message: "Invitation envoyée à un contributeur", date: "2025-06-08" },
  { id: 4, message: "Nouveau mot ajouté au dictionnaire", date: "2025-06-09" },
];

export default function ActivityPage() {
  return (
    <SuperAdminLayout>
      <h1 className="text-3xl font-bold mb-6">Statistiques d&apos;activité</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-2">Utilisateurs actifs</h2>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={activityData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="users" stroke="#34d399" fill="#bbf7d0" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-2">Langues les plus apprises</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={languageData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {languageData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-2">Progression globale des utilisateurs</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={progressionData}>
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="score" stroke="#60a5fa" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-2">Logs récents</h2>
          <ul className="space-y-2 text-sm">
            {logs.map((log) => (
              <li key={log.id} className="flex justify-between border-b pb-1 last:border-b-0">
                <span>{log.message}</span>
                <span className="text-gray-500">{log.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SuperAdminLayout>
  );
}
