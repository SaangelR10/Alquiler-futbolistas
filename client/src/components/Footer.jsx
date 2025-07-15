import React from 'react';

const Footer = () => (
  <footer className="bg-indigo-900 w-full py-2 text-center text-white text-xs">
    <div className="w-full flex flex-col md:flex-row md:justify-between items-center md:items-center px-6 gap-2 md:gap-0 min-h-0">
      <div className="mb-2 md:mb-0 w-full md:w-auto text-center md:text-left flex md:block">
        <span className="w-full md:w-auto">&copy; {new Date().getFullYear()} AlquilerFutbolistas. Todos los derechos reservados.</span>
      </div>
      <div className="flex flex-col md:flex-row gap-2 md:gap-6 justify-center md:justify-end items-center w-full md:w-auto">
        <a href="#" className="hover:text-blue-300 transition">Contacto</a>
        <a href="#" className="hover:text-blue-300 transition">Términos</a>
        <a href="#" className="hover:text-blue-300 transition">Privacidad</a>
      </div>
    </div>
  </footer>
);

export default Footer; 