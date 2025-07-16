import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaSearch, FaUserPlus, FaQuestionCircle, FaUser, FaFutbol } from 'react-icons/fa';
import { User, MessageCircle } from 'lucide-react';
import { usePanel } from '../contexts/PanelContext';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [visible, setVisible] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const location = useLocation();
  const { setShowPerfil, setShowChat } = usePanel();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScroll = window.scrollY;
          if (currentScroll <= 0) {
            setVisible(true);
          } else if (currentScroll > lastScroll && currentScroll > 60) {
            setVisible(false);
          } else if (currentScroll < lastScroll) {
            setVisible(true);
          }
          setLastScroll(currentScroll);
          ticking = false;
        });
        ticking = true;
      }
    };
    const handleMouseMove = (e) => {
      if (e.clientY < 40) setVisible(true);
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [lastScroll]);

  const rutasFondoBlanco = ['/buscar', '/login', '/register', '/perfil-jugador'];
  const rutasFondoAzul = ['/como-funciona']; // Puedes agregar más rutas si hay más fondos azul oscuro

  // Detectar si estamos en Tribuna o Perfil
  const mostrarBotonesTribuna = location.pathname.startsWith('/tribuna') || location.pathname.startsWith('/perfil-jugador');

  return (
    <>
      {/* Navbar superior solo visible en desktop */}
      <nav className={`fixed w-full z-[9999] top-0 left-0 bg-transparent transition-transform duration-300 ease-in-out ${visible ? 'translate-y-0' : '-translate-y-full'} md:flex hidden`}>
        <div className="relative max-w-7xl mx-auto px-0 lg:px-0 pt-4 w-full flex items-center justify-between">
          {/* Botón Perfil pegado al lateral izquierdo */}
          <div className="flex items-center min-w-0 justify-start pl-4 pr-2">
            {mostrarBotonesTribuna && (
              <button
                onClick={() => {
                  if (isLoggedIn) {
                    setShowPerfil(true);
                  } else {
                    // Animación premium y redirección a login
                    window.location.href = '/login';
                  }
                }}
                className="flex flex-col items-center gap-0 text-[#0a2240] hover:text-blue-700 transition"
              >
                <User className="w-7 h-7" />
                <span className="text-xs font-semibold mt-0.5">Perfil</span>
              </button>
            )}
          </div>
          {/* Isla de navegación perfectamente centrada */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center bg-white/80 backdrop-blur-md shadow-lg rounded-full px-6 py-1.5 space-x-6 border border-indigo-100">
            <Link to="/" className="text-indigo-700 font-semibold px-4 py-1 rounded-full hover:bg-indigo-50 transition">Inicio</Link>
            <Link to="/buscar" className="text-indigo-700 font-semibold px-4 py-1 rounded-full hover:bg-indigo-50 transition">Buscar</Link>
            <Link to="/tribuna" className={`flex items-center gap-2 px-4 py-1 rounded-full font-extrabold transition-all duration-200 shadow-sm border-2 ${location.pathname.startsWith('/tribuna') ? 'bg-white text-green-700 border-green-500 ring-2 ring-green-200' : 'bg-white text-green-700 border-green-200 hover:bg-green-50 hover:border-green-400'}`}
              style={{ fontFamily: 'Poppins, Montserrat, Arial, sans-serif', fontWeight: 800 }}>
              <FaFutbol className="text-xl animate-spin-slow mr-1" />
              <span className="tracking-wide">Tribuna</span>
            </Link>
            <Link to="/como-funciona" className="text-indigo-700 font-semibold px-4 py-1 rounded-full hover:bg-indigo-50 transition">¿Cómo funciona?</Link>
          </div>
          {/* Botón Chat pegado al lateral derecho */}
          <div className="flex items-center min-w-0 justify-end pr-4 pl-2">
            {mostrarBotonesTribuna ? (
              <button
                onClick={() => {
                  if (isLoggedIn) {
                    setShowChat(true);
                  } else {
                    // Animación premium y redirección a login
                    window.location.href = '/login';
                  }
                }}
                className="flex flex-col items-center gap-0 text-[#0a2240] hover:text-blue-700 transition relative"
              >
                <MessageCircle className="w-7 h-7" />
                <span className="text-xs font-semibold mt-0.5">Chat</span>
                <span className="absolute -top-2 -right-2 bg-blue-600 text-xs text-white rounded-full px-1.5 py-0.5 font-bold shadow animate-pulse">2</span>
              </button>
            ) : (
              <>
                <Link to="/login" className="px-5 py-2 rounded-full font-semibold text-indigo-700 border border-indigo-200 bg-white/80 backdrop-blur-md hover:bg-indigo-50 transition shadow mr-2">Iniciar sesión</Link>
                <Link to="/register" className="px-5 py-2 rounded-full font-semibold text-white bg-indigo-700 hover:bg-indigo-800 shadow transition ml-2">Registrarse</Link>
              </>
            )}
          </div>
        </div>
        <style>{`
          @keyframes shine {
            0% { filter: brightness(1); }
            40% { filter: brightness(1.15); }
            50% { filter: brightness(1.35); }
            60% { filter: brightness(1.15); }
            100% { filter: brightness(1); }
          }
          @keyframes shineOverlay {
            0% { opacity: 0.7; left: -30%; }
            50% { opacity: 1; left: 100%; }
            100% { opacity: 0.7; left: -30%; }
          }
        `}</style>
      </nav>
      {/* Tab Bar inferior solo móvil */}
      <nav className="fixed bottom-0 left-0 w-full z-[9999] bg-white/90 backdrop-blur-md border-t border-indigo-100 shadow-t flex md:hidden justify-around items-center h-16 px-1">
        <Link to="/" className={`flex flex-col items-center justify-center flex-1 h-full transition-all ${location.pathname==='/' ? 'text-indigo-700 font-bold' : 'text-gray-500'}`}> <FaHome className="text-xl mb-0.5" /> <span className="text-xs">Inicio</span> </Link>
        <Link to="/buscar" className={`flex flex-col items-center justify-center flex-1 h-full transition-all ${location.pathname.startsWith('/buscar') ? 'text-indigo-700 font-bold' : 'text-gray-500'}`}> <FaSearch className="text-xl mb-0.5" /> <span className="text-xs">Buscar</span> </Link>
        <Link to="/tribuna" className={`flex flex-col items-center justify-center flex-1 h-full transition-all ${location.pathname.startsWith('/tribuna') ? 'text-green-600 font-extrabold animate-bounce-slow' : 'text-green-700'}`}> <FaFutbol className="text-2xl mb-0.5 animate-spin-slow" /> <span className="text-xs font-extrabold tracking-wide animate-pulse-fast" style={{letterSpacing: '0.04em'}}>Tribuna</span> </Link>
        <Link to="/crear-equipo" className={`flex flex-col items-center justify-center flex-1 h-full transition-all ${location.pathname.startsWith('/crear-equipo') ? 'text-emerald-600 font-bold' : 'text-gray-500'}`}> <FaUserPlus className="text-xl mb-0.5" /> <span className="text-xs">Crear</span> </Link>
        <Link to="/como-funciona" className={`flex flex-col items-center justify-center flex-1 h-full transition-all ${location.pathname.startsWith('/como-funciona') ? 'text-indigo-700 font-bold' : 'text-gray-500'}`}> <FaQuestionCircle className="text-xl mb-0.5" /> <span className="text-xs">¿Cómo?</span> </Link>
        <Link to="/login" className={`flex flex-col items-center justify-center flex-1 h-full transition-all ${location.pathname.startsWith('/login') || location.pathname.startsWith('/register') ? 'text-indigo-700 font-bold' : 'text-gray-500'}`}> <FaUser className="text-xl mb-0.5" /> <span className="text-xs">Sesión</span> </Link>
      </nav>
      <style>{`
        @keyframes spin-slow { 0% { transform: rotate(0deg);} 100% { transform: rotate(360deg);} }
        .animate-spin-slow { animation: spin-slow 2.5s linear infinite; }
        @keyframes bounce-slow { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-6px);} }
        .animate-bounce-slow { animation: bounce-slow 1.8s infinite; }
        @keyframes pulse-fast { 0%,100%{opacity:1;} 50%{opacity:0.7;} }
        .animate-pulse-fast { animation: pulse-fast 1.2s infinite; }
        @keyframes tribuna-premium { 0%,100%{filter:brightness(1);} 50%{filter:brightness(1.18) drop-shadow(0 0 8px #34d399);} }
        .animate-tribuna-premium { animation: tribuna-premium 2.2s infinite; }
        .tribuna-text-gradient { background: linear-gradient(90deg,#22d3ee 0%,#34d399 60%,#2563eb 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
      `}</style>
    </>
  );
};

export default Navbar; 