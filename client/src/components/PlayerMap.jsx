import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Icono de camiseta para los jugadores
const playerIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/1041/1041916.png', // camiseta
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -36],
});

const PlayerMap = ({ jugadores }) => {
  // Centrar el mapa en España
  const center = [40.4168, -3.7038];
  return (
    <div className="rounded-2xl overflow-hidden shadow-lg border-2 border-indigo-100">
      <MapContainer center={center} zoom={6} style={{ height: '400px', width: '100%' }} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {jugadores.map(jugador => (
          <Marker key={jugador.id} position={[jugador.lat, jugador.lng]} icon={playerIcon}>
            <Popup>
              <div className="text-center">
                <strong>{jugador.nombre}</strong><br />
                {jugador.posicion} <br />
                {jugador.ubicacion} <br />
                <span className="text-indigo-700 font-bold">{jugador.precio} €/hora</span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default PlayerMap; 