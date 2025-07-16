import React, { useRef, useEffect, useState } from 'react';
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

// Hook para obtener los jugadores visibles en el área del mapa
function useVisiblePlayers(jugadores, mapRef) {
  const [visibles, setVisibles] = useState(jugadores);
  useEffect(() => {
    if (!mapRef.current) {
      setVisibles(jugadores);
      return;
    }
    const map = mapRef.current;
    const update = () => {
      const bounds = map.getBounds();
      setVisibles(
        jugadores.filter(j => bounds.contains([j.lat, j.lng]))
      );
    };
    update();
    map.on('moveend zoomend', update);
    return () => {
      map.off('moveend zoomend', update);
    };
  }, [jugadores, mapRef, jugadores.length]);
  return visibles;
}

// Lista de jugadores (fuera del MapContainer)
function PlayerList({ jugadores, onSelect, selectedId, className }) {
  const navigate = useNavigate();
  // Altura de la Tab Bar móvil (ajustar si es diferente)
  const TAB_BAR_HEIGHT = 64; // px
  return (
    <div
      className={`bg-white/80 md:bg-white/90 rounded-b-2xl md:rounded-r-2xl border-t md:border-t-0 md:border-l border-indigo-100 p-2 md:p-4 flex flex-col gap-1 md:gap-2 shadow-none md:shadow-xl z-[500] w-full h-full
        overflow-y-auto
        max-h-[calc(100vh-300px-${TAB_BAR_HEIGHT}px)]
        md:max-h-none
        pb-20 md:pb-0
        ${className || ''}`}
      style={{ pointerEvents: 'auto' }}
    >
      <h3 className="text-base md:text-lg font-bold text-indigo-700 mb-1 md:mb-2 text-center md:text-left">Jugadores en el área</h3>
      {jugadores.length === 0 ? (
        <div className="text-gray-400 text-center py-4 md:py-8 text-sm md:text-base">No hay jugadores en el área visible.</div>
      ) : (
        <ul className="flex flex-col gap-1 md:gap-2">
          {jugadores.map(j => (
            <li
              key={j.id}
              className={`flex items-center gap-2 md:gap-3 bg-white/90 hover:bg-indigo-50 rounded-xl px-2 md:px-3 py-2 shadow-sm border border-indigo-50 transition cursor-pointer group ${selectedId === j.id ? 'ring-2 ring-indigo-400' : ''}`}
              onClick={() => onSelect(j)}
            >
              <img src={j.foto} alt={j.nombre} className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border-2 border-indigo-200 shadow-sm" />
              <div className="flex-1 min-w-0">
                <div className="font-bold text-indigo-700 truncate text-sm md:text-base">{j.nombre}</div>
                <div className="text-xs text-gray-500 flex gap-2 items-center">
                  <span className="inline-flex items-center gap-1"><span className="text-base md:text-lg">⚽️</span> {j.posicion}</span>
                  <span className="inline-flex items-center gap-1 text-green-600 font-bold"><svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg> {j.precio} €/h</span>
                </div>
              </div>
              <button
                onClick={e => { e.stopPropagation(); navigate(`/jugador/${j.id}`); }}
                className="ml-1 md:ml-2 px-2 md:px-3 py-1 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-400 text-white font-bold text-xs shadow hover:from-indigo-600 hover:to-blue-500 transition"
              >
                Ver perfil
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const PlayerMap = ({ jugadores, ciudadSeleccionada }) => {
  const center = ciudadSeleccionada ? [ciudadSeleccionada.lat, ciudadSeleccionada.lng] : [4.711, -74.0721];
  const bounds = ciudadSeleccionada?.bounds || null;
  const [selectedId, setSelectedId] = useState(null);
  const markerRefs = useRef({});
  const mapRef = useRef();

  // Hook para obtener los jugadores visibles en el área del mapa
  const jugadoresVisibles = useVisiblePlayers(jugadores, mapRef);

  // Centrar y abrir popup al seleccionar
  function handleSelect(jugador) {
    setSelectedId(jugador.id);
    if (mapRef.current) {
      mapRef.current.setView([jugador.lat, jugador.lng], mapRef.current.getZoom(), { animate: true });
    }
    setTimeout(() => {
      if (markerRefs.current[jugador.id]) {
        markerRefs.current[jugador.id].openPopup();
      }
    }, 350);
  }

  // Forzar invalidateSize al montar y al cambiar tamaño de ventana
  useEffect(() => {
    const handleResize = () => {
      if (mapRef.current) {
        mapRef.current.invalidateSize();
      }
    };
    setTimeout(handleResize, 350); // Al montar
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-stretch gap-0 md:gap-0 rounded-2xl overflow-hidden shadow-lg border-2 border-indigo-100 bg-white w-full h-full">
      {/* Mapa */}
      <div className="w-full md:w-2/3 h-[300px] md:h-[600px] relative">
        <MapContainer
          center={center}
          zoom={ciudadSeleccionada ? 13 : 6}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
          maxBounds={bounds}
          maxBoundsViscosity={1.0}
          whenCreated={mapInstance => { mapRef.current = mapInstance; }}
        >
          <SetViewAndBounds ciudad={ciudadSeleccionada} />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          />
          {jugadores.map(jugador => (
            <Marker
              key={jugador.id}
              position={[jugador.lat, jugador.lng]}
              icon={playerIcon}
              ref={ref => { markerRefs.current[jugador.id] = ref; }}
            >
              <Popup autoPan className={selectedId === jugador.id ? 'popup-destacado' : ''}>
                <div className={`flex flex-col items-center p-2 min-w-[180px] ${selectedId === jugador.id ? 'ring-2 ring-indigo-400 rounded-xl bg-indigo-50/80' : ''}`}>
                  <img src={jugador.foto} alt={jugador.nombre} className="w-16 h-16 rounded-full object-cover border-2 border-indigo-200 shadow mb-2" />
                  <div className="font-bold text-indigo-700 text-lg mb-1">{jugador.nombre}</div>
                  <div className="text-sm text-gray-600 mb-1">{jugador.posicion}</div>
                  <div className="text-indigo-600 font-semibold mb-2">{jugador.precio} €/hora</div>
                  <button
                    onClick={() => window.location.href = `/jugador/${jugador.id}`}
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
      {/* Lista */}
      <div className="w-full md:w-1/3 h-[220px] md:h-[600px] flex-shrink-0">
        <PlayerList jugadores={jugadoresVisibles} onSelect={handleSelect} selectedId={selectedId} />
      </div>
    </div>
  );
};

export default PlayerMap; 