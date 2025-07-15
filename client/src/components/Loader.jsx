import React from 'react';

const Loader = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-700 via-blue-600 to-sky-400">
    <div className="flex flex-col items-center">
      <img
        src="https://cdn-icons-png.flaticon.com/512/861/861512.png"
        alt="Cargando..."
        className="w-24 h-24 animate-spin-slow mb-6"
        style={{ animation: 'spin 1.2s linear infinite' }}
      />
      <p className="text-white text-xl font-bold">Cargando...</p>
    </div>
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      .animate-spin-slow {
        animation: spin 1.2s linear infinite;
      }
    `}</style>
  </div>
);

export default Loader; 