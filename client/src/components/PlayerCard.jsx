import React from 'react';

const PlayerCard = ({ jugador }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 w-full max-w-xs mx-auto flex flex-col">
      <img
        src={jugador.foto || 'https://randomuser.me/api/portraits/men/32.jpg'}
        alt={jugador.nombre}
        className="h-48 w-full object-cover"
      />
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold text-indigo-700 mb-1">{jugador.nombre}</h2>
          <p className="text-gray-600 text-sm mb-2">{jugador.posicion} • {jugador.experiencia}</p>
          <p className="text-gray-500 text-xs mb-2">{jugador.ubicacion}</p>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-indigo-100 text-indigo-700 text-xs font-semibold px-2 py-1 rounded">{jugador.disponibilidad}</span>
            <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded">{jugador.precio} €/hora</span>
          </div>
          <p className="text-gray-700 text-sm mb-3 line-clamp-2">{jugador.descripcion}</p>
        </div>
        <div className="flex gap-2 mt-4">
          <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition">Reservar</button>
          <button className="flex-1 border border-indigo-600 text-indigo-700 font-semibold py-2 px-4 rounded-lg hover:bg-indigo-50 transition">Ver perfil</button>
        </div>
      </div>
    </div>
  );
};

// Ejemplo de uso:
// <PlayerCard jugador={{ nombre: 'Juan Pérez', posicion: 'Delantero', experiencia: 'Profesional', precio: 50, ubicacion: 'Madrid', disponibilidad: 'Disponible', descripcion: 'Rápido, goleador y con gran visión de juego.', foto: '...' }} />

export default PlayerCard; 