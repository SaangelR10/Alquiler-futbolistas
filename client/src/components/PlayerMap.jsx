import React, { useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Icono de camiseta para los jugadores
const playerIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/1041/1041916.png', // camiseta
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -36],
});

// Componente para centrar y limitar el mapa
function SetViewAndBounds({ ciudad }) {
  const map = useMap();
  useEffect(() => {
    if (ciudad) {
      map.setView([ciudad.lat, ciudad.lng], 13, { animate: true });
      if (ciudad.bounds) {
        map.setMaxBounds(ciudad.bounds);
        map.fitBounds(ciudad.bounds, { maxZoom: 15 });
      }
    } else {
      map.setView([4.711, -74.0721], 6); // Centro de Colombia
      map.setMaxBounds(null);
    }
  }, [ciudad, map]);
  return null;
}

const PlayerMap = ({ jugadores, ciudadSeleccionada }) => {
  const center = ciudadSeleccionada ? [ciudadSeleccionada.lat, ciudadSeleccionada.lng] : [4.711, -74.0721];
  const bounds = ciudadSeleccionada?.bounds || null;
  const ciudadNombre = ciudadSeleccionada?.nombre;
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl overflow-hidden shadow-lg border-2 border-indigo-100 bg-white">
      <div className="px-6 pt-6 pb-2">
        <h2 className="text-2xl md:text-3xl font-extrabold text-indigo-700 text-center mb-2 drop-shadow-sm">
          Jugadores disponibles en {ciudadNombre ? <span className="text-blue-600">{ciudadNombre}</span> : <span className="text-indigo-500">Colombia</span>}
        </h2>
      </div>
      <MapContainer
        center={center}
        zoom={ciudadSeleccionada ? 13 : 6}
        style={{ height: '400px', width: '100%' }}
        scrollWheelZoom={true}
        maxBounds={bounds}
        maxBoundsViscosity={1.0}
      >
        <SetViewAndBounds ciudad={ciudadSeleccionada} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {jugadores.map(jugador => (
          <Marker key={jugador.id} position={[jugador.lat, jugador.lng]} icon={playerIcon}>
            <Popup>
              <div className="flex flex-col items-center p-2 min-w-[180px]">
                <img src={jugador.foto} alt={jugador.nombre} className="w-16 h-16 rounded-full object-cover border-2 border-indigo-200 shadow mb-2" />
                <div className="font-bold text-indigo-700 text-lg mb-1">{jugador.nombre}</div>
                <div className="text-sm text-gray-600 mb-1">{jugador.posicion}</div>
                <div className="text-indigo-600 font-semibold mb-2">{jugador.precio} €/hora</div>
                <button
                  onClick={() => navigate(`/jugador/${jugador.id}`)}
                  className="mt-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 animate-pulse hover:scale-105"
                >
                  Ver perfil
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default PlayerMap; 