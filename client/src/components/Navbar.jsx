import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md fixed w-full z-[9999] top-0 left-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-extrabold text-indigo-700 tracking-tight">AlquilerFutbolistas</Link>
          </div>
          {/* Enlaces */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-indigo-700 font-medium transition">Inicio</Link>
            <Link to="/buscar" className="text-gray-700 hover:text-indigo-700 font-medium transition">Buscar jugadores</Link>
            <Link to="/torneos" className="text-gray-700 hover:text-indigo-700 font-medium transition">Torneos</Link>
            <Link to="/como-funciona" className="text-gray-700 hover:text-indigo-700 font-medium transition">¿Cómo funciona?</Link>
          </div>
          {/* Botones */}
          <div className="flex space-x-4">
            <Link to="/login" className="px-4 py-2 rounded-lg font-semibold text-indigo-700 border border-indigo-700 hover:bg-indigo-50 transition">Iniciar sesión</Link>
            <Link to="/register" className="px-4 py-2 rounded-lg font-semibold text-white bg-indigo-700 hover:bg-indigo-800 shadow transition">Registrarse</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 