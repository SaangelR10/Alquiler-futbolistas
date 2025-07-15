import React from 'react';
import { FaEnvelope, FaFileContract, FaUserSecret } from 'react-icons/fa';

const Footer = () => (
  <footer className="bg-indigo-900 w-full py-2 md:py-2 text-center text-white text-xs md:text-xs shadow-none md:shadow-none relative">
    <div className="w-full flex flex-col md:flex-row md:justify-between items-center md:items-center px-4 md:px-6 gap-0 md:gap-0 min-h-0">
      <div className="mb-2 md:mb-0 w-full md:w-auto text-center md:text-left flex flex-col md:block">
        <span className="w-full md:w-auto text-xs md:text-xs">&copy; {new Date().getFullYear()} AlquilerFutbolistas. Todos los derechos reservados.</span>
      </div>
      <div className="flex flex-col md:flex-row gap-3 md:gap-6 justify-center md:justify-end items-center w-full md:w-auto mt-2 md:mt-0">
        <a href="#" className="flex items-center gap-2 justify-center text-base md:text-xs hover:text-blue-300 transition"><FaEnvelope className="inline md:hidden"/> <span>Contacto</span></a>
        <a href="#" className="flex items-center gap-2 justify-center text-base md:text-xs hover:text-blue-300 transition"><FaFileContract className="inline md:hidden"/> <span>Términos</span></a>
        <a href="#" className="flex items-center gap-2 justify-center text-base md:text-xs hover:text-blue-300 transition"><FaUserSecret className="inline md:hidden"/> <span>Privacidad</span></a>
      </div>
    </div>
    <div className="block md:hidden absolute top-0 left-0 w-full h-2 bg-gradient-to-b from-black/20 to-transparent rounded-t-xl shadow-lg" />
  </footer>
);

export default Footer; 