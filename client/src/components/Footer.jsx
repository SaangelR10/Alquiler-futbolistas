import React from 'react';
import { FaEnvelope, FaFileContract, FaUserSecret } from 'react-icons/fa';

const Footer = () => (
  <footer className="bg-indigo-900 w-full py-1 md:py-2 text-center text-white text-xs md:text-xs shadow-none md:shadow-none pb-0 md:pb-2 hidden md:block">
    <div className="w-full flex flex-col md:flex-row md:justify-between items-center md:items-center px-4 md:px-6 gap-0 md:gap-0 min-h-0">
      {/* Móvil: solo copyright y developed by debajo de la barra de navegación */}
      <div className="flex flex-col w-full md:hidden">
        <div className="w-full h-[2px] bg-[#6d28d9] mb-1" />
        <span className="text-xs flex flex-col items-center pt-1 pb-1">
          © 2025 . Todos los derechos reservados.
          <span className="font-bold text-[13px] mt-1" style={{ color: '#34d399', letterSpacing: '0.5px' }}>developed by angelware.labs</span>
        </span>
      </div>
      {/* Escritorio: solo cambia el texto del copyright, mantiene estructura y enlaces */}
      <>
        <div className="hidden md:flex mb-0 w-full md:w-auto text-center md:text-left flex-col md:block">
          <span className="w-full md:w-auto text-xs">© 2025 . Todos los derechos reservados. <span className='font-bold' style={{ color: '#34d399', letterSpacing: '0.5px' }}>developed by angelware.labs</span></span>
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