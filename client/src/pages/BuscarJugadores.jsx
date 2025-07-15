import React, { useState } from 'react';
import PlayerMap from '../components/PlayerMap';
import PlayerCard from '../components/PlayerCard';

const jugadoresEjemplo = [
  {
    id: 1,
    nombre: 'Juan Pérez',
    posicion: 'Delantero',
    experiencia: 'Profesional',
    precio: 50,
    ubicacion: 'Madrid',
    disponibilidad: 'Disponible',
    descripcion: 'Rápido, goleador y con gran visión de juego.',
    foto: 'https://randomuser.me/api/portraits/men/32.jpg',
    lat: 40.4168,
    lng: -3.7038,
  },
  {
    id: 2,
    nombre: 'Carlos López',
    posicion: 'Portero',
    experiencia: 'Amateur',
    precio: 40,
    ubicacion: 'Barcelona',
    disponibilidad: 'Disponible',
    descripcion: 'Seguro bajo palos y gran juego aéreo.',
    foto: 'https://randomuser.me/api/portraits/men/45.jpg',
    lat: 41.3874,
    lng: 2.1686,
  },
  {
    id: 3,
    nombre: 'Miguel Torres',
    posicion: 'Defensa',
    experiencia: 'Semi-profesional',
    precio: 35,
    ubicacion: 'Valencia',
    disponibilidad: 'No disponible',
    descripcion: 'Fuerte, rápido y con gran anticipación.',
    foto: 'https://randomuser.me/api/portraits/men/52.jpg',
    lat: 39.4699,
    lng: -0.3763,
  },
];

const posiciones = ['Delantero', 'Mediocampista', 'Defensa', 'Portero'];

const BuscarJugadores = () => {
  const [filtroPosicion, setFiltroPosicion] = useState('');
  const [filtroDisponibilidad, setFiltroDisponibilidad] = useState('');
  const [filtroPrecio, setFiltroPrecio] = useState([0, 100]);

  // Filtrado simple
  const jugadoresFiltrados = jugadoresEjemplo.filter(j =>
    (!filtroPosicion || j.posicion === filtroPosicion) &&
    (!filtroDisponibilidad || j.disponibilidad === filtroDisponibilidad) &&
    (j.precio >= filtroPrecio[0] && j.precio <= filtroPrecio[1])
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-24">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">Buscar jugadores</h1>
      {/* Filtros */}
      <div className="bg-white rounded-xl shadow p-4 flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
        <select
          className="border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={filtroPosicion}
          onChange={e => setFiltroPosicion(e.target.value)}
        >
          <option value="">Todas las posiciones</option>
          {posiciones.map(pos => (
            <option key={pos} value={pos}>{pos}</option>
          ))}
        </select>
        <select
          className="border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={filtroDisponibilidad}
          onChange={e => setFiltroDisponibilidad(e.target.value)}
        >
          <option value="">Todas las disponibilidades</option>
          <option value="Disponible">Disponible</option>
          <option value="No disponible">No disponible</option>
        </select>
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Precio:</span>
          <input
            type="range"
            min={0}
            max={100}
            value={filtroPrecio[0]}
            onChange={e => setFiltroPrecio([+e.target.value, filtroPrecio[1]])}
            className="accent-indigo-600"
          />
          <input
            type="range"
            min={0}
            max={100}
            value={filtroPrecio[1]}
            onChange={e => setFiltroPrecio([filtroPrecio[0], +e.target.value])}
            className="accent-indigo-600"
          />
          <span className="text-indigo-700 font-bold">{filtroPrecio[0]}€ - {filtroPrecio[1]}€</span>
        </div>
      </div>
      {/* Layout mapa + cards */}
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2 w-full">
          <PlayerMap jugadores={jugadoresFiltrados} />
        </div>
        <div className="lg:w-1/2 w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
          {jugadoresFiltrados.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">No se encontraron jugadores con esos filtros.</div>
          ) : (
            jugadoresFiltrados.map(j => <PlayerCard key={j.id} jugador={j} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default BuscarJugadores; 