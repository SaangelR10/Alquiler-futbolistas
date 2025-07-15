import React from 'react';

const Footer = () => (
  <footer className="bg-white border-t mt-16 py-6 text-center text-gray-500 text-sm shadow-inner">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4">
      <div className="mb-2 md:mb-0">
        &copy; {new Date().getFullYear()} AlquilerFutbolistas. Todos los derechos reservados.
      </div>
      <div className="flex gap-4 justify-center">
        <a href="#" className="hover:text-indigo-700 transition">Contacto</a>
        <a href="#" className="hover:text-indigo-700 transition">Términos</a>
        <a href="#" className="hover:text-indigo-700 transition">Privacidad</a>
      </div>
    </div>
  </footer>
);

export default Footer; 