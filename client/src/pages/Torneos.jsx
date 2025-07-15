import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import PanelCanchas from '../components/PanelCanchas';

// Estructura de ejemplo para canchas y torneos
const canchasEjemplo = [
  {
    id: 1,
    nombre: 'Cancha Sintética El Golazo',
    tipo: 'Sintética',
    ciudad: 'Bogotá',
    departamento: 'Cundinamarca',
    direccion: 'Cra 45 #123-45',
    foto: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    lat: 4.711,
    lng: -74.0721,
    torneos: [
      {
        id: 101,
        nombre: 'Torneo Relámpago Fútbol 5',
        fechas: '10-15 Junio 2024',
        tipo: 'Eliminatoria',
        estado: 'Abierto',
        inscripcion: 200000,
        premio1: 1000000,
        premio2: 500000,
        premio3: 200000,
        imagen: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: 102,
        nombre: 'Copa Semanal',
        fechas: 'Junio - Julio 2024',
        tipo: 'Liguilla',
        estado: 'Cerrado',
        inscripcion: 150000,
        premio1: 700000,
        premio2: 300000,
        premio3: 100000,
        imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
      },
    ],
  },
  {
    id: 2,
    nombre: 'Estadio La Bombonera',
    tipo: 'Pasto',
    ciudad: 'Medellín',
    departamento: 'Antioquia',
    direccion: 'Calle 50 #30-20',
    foto: 'https://images.unsplash.com/photo-1505843271134-2549c8c4e41e?auto=format&fit=crop&w=400&q=80',
    lat: 6.2442,
    lng: -75.5812,
    torneos: [
      {
        id: 201,
        nombre: 'Liga Antioqueña',
        fechas: 'Julio - Agosto 2024',
        tipo: 'Eliminatoria',
        estado: 'Abierto',
        inscripcion: 300000,
        premio1: 2000000,
        premio2: 1000000,
        premio3: 400000,
        imagen: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=400&q=80',
      },
    ],
  },
];

const departamentos = [
  { nombre: 'Cundinamarca', ciudades: ['Bogotá'] },
  { nombre: 'Antioquia', ciudades: ['Medellín'] },
];

const canchaIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const Torneos = () => {
  const [filtroDepartamento, setFiltroDepartamento] = useState('');
  const [filtroCiudad, setFiltroCiudad] = useState('');
  const [canchaSeleccionada, setCanchaSeleccionada] = useState(null);

  // Filtrar canchas según ciudad/departamento
  const canchasFiltradas = canchasEjemplo.filter(c =>
    (!filtroDepartamento || c.departamento === filtroDepartamento) &&
    (!filtroCiudad || c.ciudad === filtroCiudad)
  );

  // Centrar el mapa en Colombia o en la ciudad filtrada
  const center = filtroCiudad
    ? [canchasFiltradas[0]?.lat || 4.711, canchasFiltradas[0]?.lng || -74.0721]
    : [4.711, -74.0721];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 mt-24">
      {/* Hero visual */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-4 drop-shadow-lg">Torneos de Fútbol</h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-6">
          Descubre, organiza y participa en torneos de fútbol en canchas profesionales de toda Colombia. Explora el mapa, encuentra torneos activos y vive la pasión del fútbol con una experiencia moderna, intuitiva y profesional.
        </p>
      </div>
      {/* Filtros ciudad/departamento */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-center">
        <select
          className="border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 min-w-[180px]"
          value={filtroDepartamento}
          onChange={e => {
            setFiltroDepartamento(e.target.value);
            setFiltroCiudad('');
          }}
        >
          <option value="">Todos los departamentos</option>
          {departamentos.map(dep => (
            <option key={dep.nombre} value={dep.nombre}>{dep.nombre}</option>
          ))}
        </select>
        <select
          className="border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 min-w-[180px]"
          value={filtroCiudad}
          onChange={e => setFiltroCiudad(e.target.value)}
          disabled={!filtroDepartamento}
        >
          <option value="">Todas las ciudades</option>
          {departamentos.find(dep => dep.nombre === filtroDepartamento)?.ciudades.map(ciudad => (
            <option key={ciudad} value={ciudad}>{ciudad}</option>
          ))}
        </select>
      </div>
      {/* Mapa interactivo */}
      <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-lg border-2 border-indigo-100 bg-white">
        <MapContainer center={center} zoom={filtroCiudad ? 12 : 6} style={{ height: '100%', width: '100%' }} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {canchasFiltradas.map(cancha => (
            <Marker key={cancha.id} position={[cancha.lat, cancha.lng]} icon={canchaIcon} eventHandlers={{ click: () => setCanchaSeleccionada(cancha) }} />
          ))}
        </MapContainer>
        {/* Panel lateral de cancha y torneos (ahora componente aparte) */}
        <PanelCanchas cancha={canchaSeleccionada} onClose={() => setCanchaSeleccionada(null)} />
      </div>
    </div>
  );
};

export default Torneos; 