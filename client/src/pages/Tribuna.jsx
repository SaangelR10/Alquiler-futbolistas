import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaComments, FaPlus } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { User, MessageCircle } from 'lucide-react';
import { usePanel } from '../contexts/PanelContext';
import { useAuth } from '../contexts/AuthContext';
import FeedPost from '../components/FeedPost';
import { useSwipeable } from 'react-swipeable';

// Mock de publicaciones (en el futuro vendrán del backend)
const publicacionesMock = [
  {
    id: 1,
    tipo: 'video',
    usuario: 'Juan Pérez',
    avatar: '',
    contenido: 'https://www.w3schools.com/html/mov_bbb.mp4',
    descripcion: '¡Gran jugada en el partido de ayer!',
    fecha: 'Hace 2h',
  },
  {
    id: 2,
    tipo: 'imagen',
    usuario: 'Equipo Los Tigres',
    avatar: '',
    contenido: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=400&q=80',
    descripcion: '¡Victoria épica!',
    fecha: 'Hace 3h',
  },
  {
    id: 3,
    tipo: 'texto',
    usuario: 'María López',
    avatar: '',
    contenido: '',
    descripcion: 'Busco equipo para torneo en Bogotá. ¡Escríbanme!',
    fecha: 'Hace 4h',
  },
];

const fondo = 'bg-white';

const Tribuna = () => {
  // const [showPerfil, setShowPerfil] = useState(false);
  // const [showChat, setShowChat] = useState(false);
  const { showPerfil, setShowPerfil, showChat, setShowChat } = usePanel();
  const { isLoggedIn } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showComments, setShowComments] = useState(false);

  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    if (!isMobile) {
      const handleKeyDown = (e) => {
        if (e.key === 'ArrowUp') setCurrentIndex(i => Math.max(i - 1, 0));
        if (e.key === 'ArrowDown') setCurrentIndex(i => Math.min(i + 1, publicacionesMock.length - 1));
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  const handlers = isMobile ? useSwipeable({
    onSwipedUp: () => setCurrentIndex(i => Math.min(i + 1, publicacionesMock.length - 1)),
    onSwipedDown: () => setCurrentIndex(i => Math.max(i - 1, 0)),
    trackMouse: false,
    preventDefaultTouchmoveEvent: true,
  }) : {};

  return (
    <div className="min-h-screen h-auto w-full flex flex-col items-center relative overflow-y-auto touch-auto">
      {/* Fondo animado de gradiente */}
      <div className="fixed inset-0 -z-10 w-full h-full animate-gradient-move bg-gradient-to-br from-blue-400 via-blue-300 to-sky-300 transition-colors duration-1000" style={{backgroundSize:'200% 200%'}} />
      <style>{`
        @keyframes gradient-move {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-move {
          animation: gradient-move 12s ease-in-out infinite;
        }
      `}</style>
      {/* Barra superior responsive SOLO móvil */}
      <div className="fixed top-0 left-0 w-full z-30 flex items-center justify-between px-2 md:px-8 py-3 bg-white/30 backdrop-blur-md shadow-lg border-b border-white/10 md:hidden">
        {/* Perfil y chat solo en móvil */}
        <div className="flex items-center gap-2">
          <button onClick={() => setShowPerfil(true)} className="flex flex-col items-center gap-0 text-[#0a2240] hover:text-blue-700 transition">
            <User className="w-7 h-7" />
            <span className="text-xs font-semibold mt-0.5">Perfil</span>
          </button>
        </div>
        <span className="text-xl font-extrabold text-[#0a2240] tracking-wide select-none drop-shadow">Tribuna</span>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowChat(true)} className="flex flex-col items-center gap-0 text-[#0a2240] hover:text-blue-700 transition relative">
            <MessageCircle className="w-7 h-7" />
            <span className="text-xs font-semibold mt-0.5">Chat</span>
            <span className="absolute -top-2 -right-2 bg-blue-600 text-xs text-white rounded-full px-1.5 py-0.5 font-bold shadow animate-pulse">2</span>
          </button>
        </div>
      </div>
      {/* Espaciado para la barra superior */}
      <div className="h-16" />
      {/* Feed principal solo visible si no hay paneles abiertos */}
      {!showPerfil && !showChat && (
        <div {...handlers} className="w-full h-[90vh] flex flex-col items-center justify-center select-none relative">
          {/* Mensaje de ayuda navegación */}
          {!isMobile ? (
            <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30 bg-white/60 backdrop-blur-lg rounded-2xl px-8 py-4 flex flex-col items-center shadow-lg animate-fade-in-up">
              <div className="flex gap-4 mb-2">
                <span className="inline-flex flex-col items-center"><span className="text-3xl">⬆️</span><span className="text-xs text-blue-900 font-bold mt-1">Arriba</span></span>
                <span className="inline-flex flex-col items-center"><span className="text-3xl">⬇️</span><span className="text-xs text-blue-900 font-bold mt-1">Abajo</span></span>
              </div>
              <span className="text-blue-900 font-semibold text-sm">Usa las flechas para deslizar entre publicaciones</span>
            </div>
          ) : (
            <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30 bg-white/60 backdrop-blur-lg rounded-2xl px-6 py-3 flex flex-col items-center shadow-lg animate-fade-in-up">
              <span className="text-2xl mb-1">👆</span>
              <span className="text-blue-900 font-semibold text-sm">Desliza con el dedo</span>
            </div>
          )}
          <AnimatePresence initial={false} custom={currentIndex}>
            <motion.div
              key={currentIndex}
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -80, opacity: 0 }}
              transition={{ duration: 0.45, type: 'spring', bounce: 0.18 }}
              className="w-full h-full flex items-center justify-center"
            >
              <FeedPost post={publicacionesMock[currentIndex]} onShowComments={() => setShowComments(true)} />
            </motion.div>
          </AnimatePresence>
        </div>
      )}
      {/* Panel de comentarios tipo TikTok (placeholder) */}
      {showComments && (
        <div className="fixed inset-0 z-[999999] flex items-end md:items-center justify-center bg-black/40" onClick={() => setShowComments(false)}>
          <div className="w-full md:w-[420px] max-h-[70vh] bg-white/90 rounded-t-3xl md:rounded-3xl shadow-2xl p-6 flex flex-col animate-fade-in-up border border-blue-200" onClick={e => e.stopPropagation()}>
            <div className="font-bold text-blue-900 text-lg mb-2">Comentarios</div>
            <div className="flex-1 overflow-y-auto text-blue-900 text-base mb-4">(Próximamente: lista de comentarios)</div>
            <input type="text" placeholder="Escribe un comentario..." className="w-full rounded-full border border-blue-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <button className="mt-3 px-6 py-2 rounded-full bg-blue-600 text-white font-bold shadow hover:bg-blue-700 transition">Enviar</button>
          </div>
        </div>
      )}
      {/* Botón flotante para crear publicación solo si no hay paneles abiertos */}
      {!showPerfil && !showChat && (
        <button className="fixed bottom-24 right-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full p-4 shadow-2xl z-40 md:hidden flex items-center justify-center text-3xl transition-all duration-200">
          <FaPlus />
        </button>
      )}
      {/* Panel de perfil a pantalla completa con lógica de login */}
      <AnimatePresence>
        {showPerfil && (
          <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} className="fixed inset-0 w-full h-full bg-[#1e293b] shadow-2xl z-[99999] p-0 flex flex-col overflow-y-auto touch-auto">
            {/* Botón cerrar siempre visible y por encima */}
            <button onClick={() => setShowPerfil(false)} className="absolute top-6 right-8 text-white text-4xl font-bold hover:text-blue-300 transition-all duration-200 focus:outline-none animate-pulse-slow z-30">×</button>
            {/* Blurry y overlay: mismo diseño en todas las vistas */}
            {!isLoggedIn && <div className="absolute inset-0 w-full h-full transition-all duration-300 backdrop-blur-[6px] brightness-75 z-10" />}
            {!isLoggedIn && (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                <div className="bg-white/90 rounded-2xl shadow-2xl px-8 py-8 flex flex-col items-center animate-fade-in-up border border-blue-200">
                  <User className="w-12 h-12 text-blue-600 mb-2" />
                  <div className="text-xl font-bold text-blue-900 mb-2 text-center">Necesitas iniciar sesión o registrarte</div>
                  <div className="text-blue-700 text-sm mb-4 text-center">Para acceder a tu perfil, por favor inicia sesión o crea una cuenta.</div>
                  <div className="flex gap-4 mt-2">
                    <a href="/login" className="px-5 py-2 rounded-full font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow transition">Iniciar sesión</a>
                    <a href="/register" className="px-5 py-2 rounded-full font-semibold text-blue-700 bg-white border border-blue-300 hover:bg-blue-50 shadow transition">Registrarse</a>
                  </div>
                </div>
              </div>
            )}
            {/* Contenido real solo si logueado */}
            {isLoggedIn && (
              <div className="flex flex-col items-center gap-2 z-20 mt-20">
                <User className="w-16 h-16 text-white/80 mb-2" />
                <div className="text-white font-bold text-lg">Nombre Usuario</div>
                <div className="text-blue-400 font-semibold text-sm">@usuario</div>
                <div className="text-white/60 text-xs">Rol: Jugador</div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-2 font-bold shadow mt-4">Editar perfil</button>
                <button onClick={() => { setShowPerfil(false); setShowChat(true); }} className="flex items-center gap-2 mt-4 text-blue-400 hover:text-blue-200 font-semibold transition text-base">
                  <MessageCircle className="w-5 h-5" /> Ir al chat
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      {/* Panel lateral de chat mejorado con lógica de login */}
      <AnimatePresence>
        {showChat && (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} className="fixed inset-0 w-full h-full bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700/95 shadow-2xl z-[99999] p-0 flex flex-col overflow-y-auto touch-auto">
            {/* Botón cerrar siempre visible y por encima */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-white/10 z-30">
              <div className="text-white font-bold text-2xl tracking-wide">Chats</div>
              <button onClick={() => setShowChat(false)} className="text-white text-4xl font-bold hover:text-blue-300 transition-all duration-200 focus:outline-none animate-pulse-slow">×</button>
            </div>
            {/* Blurry y overlay: mismo diseño en todas las vistas */}
            {!isLoggedIn && <div className="absolute inset-0 w-full h-full transition-all duration-300 backdrop-blur-[6px] brightness-75 z-10" />}
            {!isLoggedIn && (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                <div className="bg-white/90 rounded-2xl shadow-2xl px-8 py-8 flex flex-col items-center animate-fade-in-up border border-blue-200">
                  <MessageCircle className="w-12 h-12 text-blue-600 mb-2" />
                  <div className="text-xl font-bold text-blue-900 mb-2 text-center">Necesitas iniciar sesión o registrarte</div>
                  <div className="text-blue-700 text-sm mb-4 text-center">Para acceder al chat, por favor inicia sesión o crea una cuenta.</div>
                  <div className="flex gap-4 mt-2">
                    <a href="/login" className="px-5 py-2 rounded-full font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow transition">Iniciar sesión</a>
                    <a href="/register" className="px-5 py-2 rounded-full font-semibold text-blue-700 bg-white border border-blue-300 hover:bg-blue-50 shadow transition">Registrarse</a>
                  </div>
                </div>
              </div>
            )}
            {/* Contenido real solo si logueado */}
            {isLoggedIn && (
              <div className="flex-1 flex flex-col items-center justify-center text-white/70 text-lg z-20">
                (Próximamente: lista de chats)
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <style>{`
        @keyframes fade-in-up { 0%{opacity:0;transform:translateY(40px);} 100%{opacity:1;transform:translateY(0);} }
        .animate-fade-in-up { animation: fade-in-up 0.7s cubic-bezier(.39,.575,.565,1) both; }
        @keyframes pulse-slow { 0%,100%{opacity:1;} 50%{opacity:0.6;} }
        .animate-pulse-slow { animation: pulse-slow 1.8s infinite; }
      `}</style>
    </div>
  );
};

export default Tribuna; 