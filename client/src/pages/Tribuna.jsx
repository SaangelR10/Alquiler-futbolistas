import React, { useState } from 'react';
import { FaUserCircle, FaComments, FaPlus } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { User, MessageCircle } from 'lucide-react';
import { usePanel } from '../contexts/PanelContext';

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

  return (
    <div className="min-h-screen w-full flex flex-col items-center relative overflow-x-hidden">
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
            <span className="absolute -top-1 -right-2 bg-blue-600 text-xs text-white rounded-full px-1.5 py-0.5 font-bold shadow">2</span>
          </button>
        </div>
      </div>
      {/* Espaciado para la barra superior */}
      <div className="h-16" />
      {/* Feed principal */}
      <div className="w-full max-w-md mx-auto flex flex-col gap-6 pb-32">
        {/* Card para crear publicación */}
        <div className="bg-white border-2 border-green-500 rounded-2xl shadow-lg p-4 flex items-center gap-3 mt-2">
          <FaUserCircle className="text-3xl text-white/80" />
          <input type="text" placeholder="¿Qué quieres compartir?" className="flex-1 bg-transparent text-white placeholder:text-white/60 focus:outline-none text-base px-2" />
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full p-2 shadow transition"><FaPlus /></button>
        </div>
        {/* Feed de publicaciones */}
        {publicacionesMock.map(pub => (
          <motion.div key={pub.id} className="bg-white border-2 border-green-500 rounded-2xl shadow-lg overflow-hidden flex flex-col" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="flex items-center gap-3 px-4 pt-4">
              <FaUserCircle className="text-2xl text-white/80" />
              <div>
                <div className="text-white font-bold text-sm">{pub.usuario}</div>
                <div className="text-xs text-white/50">{pub.fecha}</div>
              </div>
            </div>
            {pub.tipo === 'video' && (
              <video src={pub.contenido} controls autoPlay loop className="w-full h-[340px] object-cover bg-black mt-3" />
            )}
            {pub.tipo === 'imagen' && (
              <img src={pub.contenido} alt="Publicación" className="w-full h-[340px] object-cover bg-black mt-3" />
            )}
            {pub.tipo === 'texto' && (
              <div className="text-white text-lg px-4 py-8">{pub.descripcion}</div>
            )}
            {pub.tipo !== 'texto' && (
              <div className="text-white text-base px-4 py-3">{pub.descripcion}</div>
            )}
            {/* Acciones */}
            <div className="flex items-center gap-6 px-4 pb-4 pt-2 border-t border-[#134e4a]/40">
              <button className="text-white/80 hover:text-emerald-400 font-bold transition">Me gusta</button>
              <button className="text-white/80 hover:text-blue-400 font-bold transition">Comentar</button>
              <button className="text-white/80 hover:text-indigo-400 font-bold transition">Compartir</button>
            </div>
          </motion.div>
        ))}
      </div>
      {/* Botón flotante para crear publicación */}
      <button className="fixed bottom-24 right-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full p-4 shadow-2xl z-40 md:hidden flex items-center justify-center text-3xl transition-all duration-200">
        <FaPlus />
      </button>
      {/* Panel de perfil a pantalla completa */}
      <AnimatePresence>
        {showPerfil && (
          <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} className="fixed inset-0 w-full h-full bg-[#1e293b] shadow-2xl z-50 p-6 flex flex-col gap-6">
            <button onClick={() => setShowPerfil(false)} className="self-end text-white text-2xl mb-2">×</button>
            <div className="flex flex-col items-center gap-2">
              <User className="w-16 h-16 text-white/80 mb-2" />
              <div className="text-white font-bold text-lg">Nombre Usuario</div>
              <div className="text-blue-400 font-semibold text-sm">@usuario</div>
              <div className="text-white/60 text-xs">Rol: Jugador</div>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-2 font-bold shadow">Editar perfil</button>
            {/* Acceso directo al chat desde el perfil */}
            <button onClick={() => { setShowPerfil(false); setShowChat(true); }} className="flex items-center gap-2 mt-4 text-blue-400 hover:text-blue-200 font-semibold transition text-base">
              <MessageCircle className="w-5 h-5" /> Ir al chat
            </button>
            {/* Más info y acciones aquí */}
          </motion.div>
        )}
      </AnimatePresence>
      {/* Panel lateral de chat mejorado */}
      <AnimatePresence>
        {showChat && (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} className="fixed inset-0 w-full h-full bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700/95 shadow-2xl z-[99999] p-0 flex flex-col">
            <div className="flex items-center justify-between px-8 py-6 border-b border-white/10">
              <div className="text-white font-bold text-2xl tracking-wide">Chats</div>
              <button onClick={() => setShowChat(false)} className="text-white text-4xl font-bold hover:text-blue-300 transition-all duration-200 focus:outline-none animate-pulse-slow">×</button>
            </div>
            {/* Lista de chats aquí */}
            <div className="flex-1 flex flex-col items-center justify-center text-white/70 text-lg">
              (Próximamente: lista de chats)
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <style>{`
        @keyframes pulse-slow { 0%,100%{opacity:1;} 50%{opacity:0.6;} }
        .animate-pulse-slow { animation: pulse-slow 1.8s infinite; }
      `}</style>
    </div>
  );
};

export default Tribuna; 