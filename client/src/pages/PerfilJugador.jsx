import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import ModalReservaStepper from '../components/ModalReservaStepper';

const jugador = {
  nombre: 'Juan Pérez',
  foto: 'https://randomuser.me/api/portraits/men/32.jpg',
  posicion: 'Delantero',
  experiencia: 'Profesional',
  ciudad: 'Madrid',
  precio: 50,
  disponibilidad: ['Lunes', 'Miércoles', 'Viernes'],
  descripcion: 'Rápido, goleador y con gran visión de juego. Experiencia en ligas regionales y nacionales.',
  habilidades: ['Velocidad', 'Remate', 'Regate', 'Trabajo en equipo'],
  lat: 40.4168,
  lng: -3.7038,
  reseñas: [
    { usuario: 'Carlos López', calificacion: 5, comentario: '¡Gran delantero, muy profesional!' },
    { usuario: 'Miguel Torres', calificacion: 4, comentario: 'Cumplió con lo acordado y jugó excelente.' },
  ],
};

const playerIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/1041/1041916.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const PerfilJugador = () => {
  const [tab, setTab] = useState('info');
  const [openReserva, setOpenReserva] = useState(false);
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 mt-24 bg-white rounded-2xl shadow-xl">
      {/* Header visual */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
        <img src={jugador.foto} alt={jugador.nombre} className="w-40 h-40 rounded-full object-cover border-4 border-indigo-200 shadow" />
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold text-indigo-700 mb-1">{jugador.nombre}</h1>
          <p className="text-gray-600 text-lg mb-1">{jugador.posicion} • {jugador.experiencia}</p>
          <p className="text-gray-500 mb-2">{jugador.ciudad}</p>
          <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-2">
            {jugador.habilidades.map(hab => (
              <span key={hab} className="bg-indigo-100 text-indigo-700 text-xs font-semibold px-2 py-1 rounded">{hab}</span>
            ))}
          </div>
          <div className="text-2xl font-bold text-green-600 mb-2">{jugador.precio} €/hora</div>
          <button onClick={() => setOpenReserva(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition">Reservar</button>
        </div>
      </div>
      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b pb-2">
        <button onClick={() => setTab('info')} className={`font-semibold pb-1 ${tab==='info' ? 'border-b-2 border-indigo-600 text-indigo-700' : 'text-gray-500'}`}>Información</button>
        <button onClick={() => setTab('disponibilidad')} className={`font-semibold pb-1 ${tab==='disponibilidad' ? 'border-b-2 border-indigo-600 text-indigo-700' : 'text-gray-500'}`}>Disponibilidad</button>
        <button onClick={() => setTab('reseñas')} className={`font-semibold pb-1 ${tab==='reseñas' ? 'border-b-2 border-indigo-600 text-indigo-700' : 'text-gray-500'}`}>Reseñas</button>
      </div>
      {/* Contenido de tabs */}
      {tab === 'info' && (
        <div>
          <h2 className="text-lg font-bold mb-2 text-indigo-700">Descripción</h2>
          <p className="text-gray-700 mb-4">{jugador.descripcion}</p>
          <h2 className="text-lg font-bold mb-2 text-indigo-700">Ubicación</h2>
          <div className="rounded-xl overflow-hidden shadow border mb-4">
            <MapContainer center={[jugador.lat, jugador.lng]} zoom={12} style={{ height: '200px', width: '100%' }} scrollWheelZoom={false} dragging={false} doubleClickZoom={false} zoomControl={false} attributionControl={false}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[jugador.lat, jugador.lng]} icon={playerIcon} />
            </MapContainer>
          </div>
        </div>
      )}
      {tab === 'disponibilidad' && (
        <div>
          <h2 className="text-lg font-bold mb-2 text-indigo-700">Días disponibles</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {jugador.disponibilidad.map(dia => (
              <span key={dia} className="bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-full">{dia}</span>
            ))}
          </div>
          <p className="text-gray-500">* Para reservar, selecciona un día disponible y haz clic en "Reservar".</p>
        </div>
      )}
      {tab === 'reseñas' && (
        <div>
          <h2 className="text-lg font-bold mb-4 text-indigo-700">Reseñas de clientes</h2>
          <div className="space-y-4">
            {jugador.reseñas.map((r, i) => (
              <div key={i} className="bg-indigo-50 rounded-lg p-4 shadow flex flex-col md:flex-row md:items-center gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 text-lg">{'★'.repeat(r.calificacion)}{'☆'.repeat(5 - r.calificacion)}</span>
                  <span className="font-semibold text-indigo-700">{r.usuario}</span>
                </div>
                <span className="text-gray-700">{r.comentario}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Botón de contacto */}
      <div className="mt-8 text-center">
        <button className="bg-white border border-indigo-600 text-indigo-700 font-semibold py-2 px-6 rounded-lg shadow hover:bg-indigo-50 transition">Contactar jugador</button>
      </div>
      <ModalReservaStepper jugador={jugador} abierto={openReserva} onClose={() => setOpenReserva(false)} />
    </div>
  );
};

export default PerfilJugador; 