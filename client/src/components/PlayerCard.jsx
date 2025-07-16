import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const iconosPosicion = {
  'Delantero': '⚽️',
  'Mediocampista': '🎯',
  'Defensa': '🛡️',
  'Portero': '🧤',
};
const iconoExperiencia = {
  'Profesional': '⭐️',
  'Semi-profesional': '💎',
  'Amateur': '🔰',
};

const PlayerCard = ({ jugador, onReservar }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 32, scale: 0.97 }}
      transition={{ duration: 0.38, type: 'spring', bounce: 0.18 }}
      className="relative group bg-white/60 backdrop-blur-xl border border-indigo-100 shadow-2xl hover:shadow-indigo-300/30 rounded-3xl overflow-visible w-full max-w-xs mx-auto flex flex-col items-center transition-all duration-300 hover:scale-[1.025] hover:bg-white/80 cursor-pointer min-h-[460px] pt-24"
      style={{ background: 'linear-gradient(135deg, rgba(236,239,255,0.85) 60%, rgba(199,210,254,0.7) 100%)' }}
    >
      {/* Foto circular con borde animado */}
      <div className="relative flex justify-center -mt-14 mb-2 z-10">
        <motion.div
          className="rounded-full p-[3px] bg-gradient-to-tr from-indigo-400 via-blue-300 to-green-300 group-hover:from-indigo-600 group-hover:to-green-400 transition-all duration-300"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        >
          <img
            src={jugador.foto || 'https://randomuser.me/api/portraits/men/32.jpg'}
            alt={jugador.nombre}
            className="w-28 h-28 object-cover rounded-full border-4 border-white shadow-lg group-hover:shadow-xl transition-all duration-300"
          />
        </motion.div>
      </div>
      {/* Info principal */}
      <div className="px-5 pt-2 pb-6 flex-1 flex flex-col justify-between w-full items-center text-center">
        <h2 className="text-2xl font-extrabold text-indigo-700 mb-1 drop-shadow-sm flex items-center justify-center gap-2">
          {jugador.nombre}
        </h2>
        <div className="flex flex-wrap gap-2 justify-center mb-2">
          <span className="flex items-center gap-1 bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            <span className="text-lg">{iconosPosicion[jugador.posicion] || '🏃‍♂️'}</span> {jugador.posicion}
          </span>
          <span className="flex items-center gap-1 bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            <span className="text-lg">{iconoExperiencia[jugador.experiencia] || '🔰'}</span> {jugador.experiencia}
          </span>
        </div>
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="bg-green-100 text-green-700 text-sm font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg>
            {jugador.precio} €/hora
          </span>
          <span className="bg-indigo-50 text-indigo-600 text-xs font-semibold px-2 py-1 rounded-full shadow-sm">
            {jugador.ubicacion}
          </span>
        </div>
        {/* Disponibilidad */}
        <div className="flex flex-wrap gap-1 justify-center mb-2">
          {(jugador.disponibilidadDias || jugador.disponibilidad || []).map((dia, i) => (
            <span key={i} className="bg-indigo-100 text-indigo-700 text-[11px] font-semibold px-2 py-0.5 rounded-full shadow-sm">{dia}</span>
          ))}
        </div>
        <p className="text-gray-700 text-sm mb-3 line-clamp-2 min-h-[38px]">{jugador.descripcion}</p>
        <div className="flex gap-2 mt-4 w-full">
          <motion.button
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.04, boxShadow: '0 4px 24px 0 rgba(99,102,241,0.18)' }}
            onClick={() => onReservar && onReservar(jugador)}
            className="flex-1 bg-gradient-to-r from-indigo-500 to-blue-400 hover:from-indigo-600 hover:to-blue-500 text-white font-bold py-2 px-4 rounded-xl shadow-lg transition-all duration-200"
          >
            Reservar
          </motion.button>
          <Link
            to={`/jugador/${jugador.id}`}
            className="flex-1 border-2 border-indigo-500 text-indigo-700 font-bold py-2 px-4 rounded-xl hover:bg-indigo-50 transition text-center shadow-sm"
            style={{ lineHeight: '1.2' }}
          >
            Ver perfil
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default PlayerCard; 