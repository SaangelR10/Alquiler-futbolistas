import React from 'react';
import './index.css';

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-800">
      <div className="bg-white rounded-xl shadow-2xl p-10 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-indigo-700 mb-4">¡Bienvenido a Alquiler de Futbolistas!</h1>
        <p className="text-gray-700 mb-6">Tu plataforma para encontrar y reservar futbolistas profesionales y amateurs de forma fácil, segura y rápida.</p>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition">Comenzar</button>
      </div>
    </div>
  );
}

export default App; 