import React from 'react';
import { FaEnvelope, FaFileContract, FaUserSecret } from 'react-icons/fa';

const Footer = () => (
  <footer className="bg-indigo-900 w-full py-2 md:py-2 text-center text-white text-xs md:text-xs shadow-none md:shadow-none relative pb-20 md:pb-2">
    <div className="w-full flex flex-col md:flex-row md:justify-between items-center md:items-center px-4 md:px-6 gap-0 md:gap-0 min-h-0">
      {/* Móvil: enlaces en fila con iconos, copyright abajo */}
      <div className="flex flex-col w-full md:hidden">
        <div className="flex flex-row justify-center items-center gap-6 mb-2">
          <a href="#" className="flex flex-col items-center gap-1 text-base hover:text-blue-300 transition"><FaEnvelope className="text-lg"/> <span>Contacto</span></a>
          <a href="#" className="flex flex-col items-center gap-1 text-base hover:text-blue-300 transition"><FaFileContract className="text-lg"/> <span>Términos</span></a>
          <a href="#" className="flex flex-col items-center gap-1 text-base hover:text-blue-300 transition"><FaUserSecret className="text-lg"/> <span>Privacidad</span></a>
        </div>
        <span className="text-xs">&copy; {new Date().getFullYear()} AlquilerFutbolistas. Todos los derechos reservados.</span>
      </div>
      {/* Escritorio: estructura original */}
      <>
        <div className="hidden md:flex mb-0 w-full md:w-auto text-center md:text-left flex-col md:block">
          <span className="w-full md:w-auto text-xs">&copy; {new Date().getFullYear()} AlquilerFutbolistas. Todos los derechos reservados.</span>
        </div>
        <div className="hidden md:flex flex-row gap-6 justify-center md:justify-end items-center w-full md:w-auto mt-0">
          <a href="#" className="hover:text-blue-300 transition">Contacto</a>
          <a href="#" className="hover:text-blue-300 transition">Términos</a>
          <a href="#" className="hover:text-blue-300 transition">Privacidad</a>
        </div>
      </>
    </div>
    <div className="block md:hidden absolute top-0 left-0 w-full h-2 bg-gradient-to-b from-black/20 to-transparent rounded-t-xl shadow-lg" />
  </footer>
);

export default Footer; 