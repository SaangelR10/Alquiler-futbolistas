import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaTrophy, FaUserFriends } from 'react-icons/fa';

const options = [
  {
    label: 'Jugadores',
    value: 'jugadores',
    icon: <FaUserFriends className="text-indigo-600 text-4xl md:text-5xl drop-shadow" />,
    path: '/buscar/jugadores',
    color: 'from-indigo-100 to-indigo-50',
    border: 'border-indigo-200',
    shadow: 'shadow-indigo-200',
  },
  {
    label: 'Equipos',
    value: 'equipos',
    icon: <FaUsers className="text-emerald-600 text-4xl md:text-5xl drop-shadow" />,
    path: '/buscar/equipos',
    color: 'from-emerald-100 to-emerald-50',
    border: 'border-emerald-200',
    shadow: 'shadow-emerald-200',
  },
  {
    label: 'Torneos',
    value: 'torneos',
    icon: <FaTrophy className="text-yellow-500 text-4xl md:text-5xl drop-shadow" />,
    path: '/buscar/torneos',
    color: 'from-yellow-100 to-yellow-50',
    border: 'border-yellow-200',
    shadow: 'shadow-yellow-200',
  },
];

export default function BuscarCentral() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-blue-50 to-sky-100 px-2">
      <div className="flex-1 flex flex-col items-center justify-center w-full pt-32 pb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-700 mb-12 text-center animate-fade-in drop-shadow-lg">¿Qué quieres buscar?</h1>
        <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl items-center justify-center animate-fade-in">
          {options.map(opt => (
            <button
              key={opt.value}
              onClick={() => navigate(opt.path)}
              className={`group flex flex-col items-center justify-center px-10 py-10 md:px-14 md:py-14 rounded-3xl border-2 ${opt.border} bg-gradient-to-br ${opt.color} ${opt.shadow} shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer focus:outline-none relative overflow-hidden hover:scale-105 active:scale-100`}
              style={{ minWidth: 200, minHeight: 220 }}
            >
              <span className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-10 transition bg-black" />
              <div className="mb-6 flex items-center justify-center">{opt.icon}</div>
              <span className="mt-2 text-xl md:text-2xl font-bold text-indigo-800 group-hover:text-indigo-900 tracking-wide drop-shadow-lg transition-all">{opt.label}</span>
            </button>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .pt-32 { padding-top: 6rem !important; }
        }
      `}</style>
    </div>
  );
} 