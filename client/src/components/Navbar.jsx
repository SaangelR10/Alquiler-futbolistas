import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [visible, setVisible] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const location = useLocation();

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

  return (
    <nav className={`fixed w-full z-[9999] top-0 left-0 bg-transparent transition-transform duration-300 ease-in-out ${visible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <div className="flex items-center min-w-0 justify-start">
            <Link
              to="/"
              className="text-3xl md:text-4xl font-extrabold tracking-tight whitespace-nowrap select-none px-2 py-1"
              style={
                rutasFondoBlanco.includes(location.pathname)
                  ? {
                      color: '#1e293b',
                      textShadow: '0 1px 2px rgba(49,46,129,0.08)'
                    }
                  : rutasFondoAzul.includes(location.pathname)
                  ? {
                      color: '#fff',
                      textShadow: '0 2px 8px rgba(30,41,59,0.18)'
                    }
                  : {
                      color: '#1e293b',
                      textShadow: '0 1px 2px rgba(49,46,129,0.08)'
                    }
              }
            >
              AlquilerFutbolistas
            </Link>
          </div>
          {/* Menú centrado respecto al logo */}
          <div className="flex-1 flex justify-center">
            <div className="flex items-center bg-white/80 backdrop-blur-md shadow-lg rounded-full px-4 py-1 space-x-6 border border-indigo-100">
              <Link to="/" className="text-indigo-700 font-semibold px-3 py-1 rounded-full hover:bg-indigo-50 transition">Inicio</Link>
              <Link to="/buscar" className="text-indigo-700 font-semibold px-3 py-1 rounded-full hover:bg-indigo-50 transition">Buscar</Link>
              <Link to="/como-funciona" className="text-indigo-700 font-semibold px-3 py-1 rounded-full hover:bg-indigo-50 transition">¿Cómo funciona?</Link>
            </div>
          </div>
          {/* Botones de sesión */}
          <div className="flex items-center space-x-3 min-w-0 justify-end">
            <Link to="/login" className="px-5 py-2 rounded-full font-semibold text-indigo-700 border border-indigo-200 bg-white/80 backdrop-blur-md hover:bg-indigo-50 transition shadow">Iniciar sesión</Link>
            <Link to="/register" className="px-5 py-2 rounded-full font-semibold text-white bg-indigo-700 hover:bg-indigo-800 shadow transition">Registrarse</Link>
          </div>
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
  );
};

export default Navbar; 