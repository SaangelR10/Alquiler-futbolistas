import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { motion, AnimatePresence } from 'framer-motion';

const equiposEjemplo = [
  {
    id: 1,
    nombre: 'Atlético Nacional',
    ciudad: 'Medellín',
    departamento: 'Antioquia',
    tipo: 'Profesional',
    torneo: 'Liga BetPlay',
    estado: 'Lleno',
    descripcion: 'Equipo profesional de fútbol, juega en el Atanasio Girardot.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Escudo_Atl%C3%A9tico_Nacional.png',
    cancha: { lat: 6.2569, lng: -75.5905, nombre: 'Atanasio Girardot' },
    integrantes: 25,
  },
  {
    id: 2,
    nombre: 'Millonarios FC',
    ciudad: 'Bogotá',
    departamento: 'Cundinamarca',
    tipo: 'Profesional',
    torneo: 'Liga BetPlay',
    estado: 'Buscando jugador',
    descripcion: 'Equipo profesional, juega en el Estadio El Campín.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Escudo_de_Millonarios.png',
    cancha: { lat: 4.6462, lng: -74.0788, nombre: 'El Campín' },
    integrantes: 24,
  },
  {
    id: 3,
    nombre: 'Deportivo Cali',
    ciudad: 'Cali',
    departamento: 'Valle del Cauca',
    tipo: 'Profesional',
    torneo: 'Liga BetPlay',
    estado: 'Lleno',
    descripcion: 'Equipo profesional, juega en el Estadio Deportivo Cali.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Escudo_deportivo_cali.png',
    cancha: { lat: 3.3753, lng: -76.3575, nombre: 'Estadio Deportivo Cali' },
    integrantes: 23,
  },
  {
    id: 4,
    nombre: 'Junior FC',
    ciudad: 'Barranquilla',
    departamento: 'Atlántico',
    tipo: 'Semipro',
    torneo: 'Liga BetPlay',
    estado: 'Buscando jugador',
    descripcion: 'Equipo semiprofesional, juega en el Estadio Metropolitano.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Escudo_Atl%C3%A9tico_Junior.png',
    cancha: { lat: 10.8896, lng: -74.8057, nombre: 'Metropolitano' },
    integrantes: 20,
  },
  {
    id: 5,
    nombre: 'América de Cali',
    ciudad: 'Cali',
    departamento: 'Valle del Cauca',
    tipo: 'Amateur',
    torneo: 'Copa Colombia',
    estado: 'Buscando jugador',
    descripcion: 'Equipo amateur, juega en el Estadio Pascual Guerrero.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Escudo_America_de_Cali.png',
    cancha: { lat: 3.4372, lng: -76.5297, nombre: 'Pascual Guerrero' },
    integrantes: 18,
  },
];

const departamentos = [...new Set(equiposEjemplo.map(e => e.departamento))];
const ciudades = [...new Set(equiposEjemplo.map(e => e.ciudad))];
const tipos = ['Amateur', 'Semipro', 'Profesional'];
const torneos = [...new Set(equiposEjemplo.map(e => e.torneo))];
const estados = ['Buscando jugador', 'Lleno'];

// Límites geográficos para ciudades y departamentos principales de Colombia
const boundsColombia = [[-4.2, -79.1], [13.5, -66.8]];
const boundsDepartamentos = {
  'Antioquia': [[5.5, -76.2], [8.9, -73.8]],
  'Cundinamarca': [[3.7, -75.0], [5.6, -73.0]],
  'Valle del Cauca': [[2.9, -77.5], [5.0, -75.7]],
  'Atlántico': [[10.2, -75.2], [11.2, -74.4]],
};
const boundsCiudades = {
  'Medellín': [[6.15, -75.7], [6.38, -75.48]],
  'Bogotá': [[4.48, -74.25], [4.83, -73.95]],
  'Cali': [[3.32, -76.6], [3.55, -76.45]],
  'Barranquilla': [[10.88, -74.88], [11.05, -74.73]],
};

const equipoIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/616/616494.png',
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -36],
});

function useVisibleEquipos(equipos, mapRef) {
  const [visibles, setVisibles] = useState(equipos);
  useEffect(() => {
    if (!mapRef.current) {
      setVisibles(equipos);
      return;
    }
    const map = mapRef.current;
    const update = () => {
      const bounds = map.getBounds();
      const nuevosVisibles = equipos.filter(e => bounds.contains([e.cancha.lat, e.cancha.lng]));
      setVisibles(prev => {
        // Solo actualiza si cambia el array
        if (prev.length !== nuevosVisibles.length || prev.some((v, i) => v.id !== nuevosVisibles[i]?.id)) {
          return nuevosVisibles;
        }
        return prev;
      });
    };
    update();
    map.on('moveend zoomend', update);
    return () => {
      map.off('moveend zoomend', update);
    };
  }, [equipos, mapRef]);
  return visibles;
}

function EquipoCard({ equipo, onVerMas }) {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 flex flex-col md:flex-row items-center border-2 border-indigo-100 hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.03] transition-all duration-300 group">
      <img src={equipo.logo} alt={equipo.nombre} className="w-20 h-20 rounded-full object-cover border-4 border-indigo-200 mb-4 md:mb-0 md:mr-6 shadow-lg group-hover:scale-110 transition-transform" />
      <div className="flex-1 flex flex-col items-center md:items-start">
        <div className="text-xl font-bold text-indigo-700 mb-1 text-center md:text-left">{equipo.nombre}</div>
        <div className="text-indigo-500 font-semibold mb-1 text-center md:text-left">{equipo.ciudad} • {equipo.departamento}</div>
        <div className="text-gray-700 text-center md:text-left mb-2">{equipo.descripcion}</div>
        <div className="flex flex-wrap gap-2 mb-2 justify-center md:justify-start">
          <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">{equipo.tipo}</span>
          <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">{equipo.torneo}</span>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full shadow-sm ${equipo.estado === 'Buscando jugador' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-200 text-gray-600'}`}>{equipo.estado}</span>
          <span className="bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">{equipo.integrantes} integrantes</span>
        </div>
        <div className="text-xs text-gray-400 mb-2">Cancha: {equipo.cancha.nombre}</div>
        <button onClick={() => onVerMas(equipo)} className="mt-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-2 rounded-xl shadow transition-all">Ver más</button>
      </div>
    </div>
  );
}

function SetViewAndBounds({ equipos, selectedId, mapBounds, mapCenter, mapZoom, filtrosPrincipales }) {
  const map = useMap();
  const prevFiltros = useRef('');
  useEffect(() => {
    const filtrosString = JSON.stringify(filtrosPrincipales);
    if (!selectedId && equipos.length > 0 && filtrosString !== prevFiltros.current) {
      map.setMaxBounds(mapBounds);
      map.setView(mapCenter, mapZoom, { animate: true });
      prevFiltros.current = filtrosString;
    } else if (!selectedId && equipos.length > 0) {
      map.setMaxBounds(mapBounds);
    }
    // Si hay equipo seleccionado, no hace nada
  }, [selectedId, equipos.length, mapBounds, mapCenter, mapZoom, map, filtrosPrincipales]);
  return null;
}

const BuscarEquipos = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [filtroDepartamento, setFiltroDepartamento] = useState('');
  const [filtroCiudad, setFiltroCiudad] = useState('');
  const [filtroNombre, setFiltroNombre] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('');
  const [filtroTorneo, setFiltroTorneo] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');
  const [vista, setVista] = useState('tarjetas');
  const mapRef = useRef();
  const markerRefs = useRef({});
  const [selectedId, setSelectedId] = useState(null);
  const popupOpenedRef = useRef(null);
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const filtrosPanelRef = useRef();

  // Eliminar el useEffect de mousedown para cierre global
  // (ya no es necesario, lo haremos con overlay y stopPropagation)

  // Determinar bounds y centro según filtros
  let mapBounds = boundsColombia;
  let mapCenter = [4.6462, -74.0788]; // Centro de Colombia
  let mapZoom = 6;
  if (filtroCiudad && boundsCiudades[filtroCiudad]) {
    mapBounds = boundsCiudades[filtroCiudad];
    mapCenter = [
      (boundsCiudades[filtroCiudad][0][0] + boundsCiudades[filtroCiudad][1][0]) / 2,
      (boundsCiudades[filtroCiudad][0][1] + boundsCiudades[filtroCiudad][1][1]) / 2,
    ];
    mapZoom = 12;
  } else if (filtroDepartamento && boundsDepartamentos[filtroDepartamento]) {
    mapBounds = boundsDepartamentos[filtroDepartamento];
    mapCenter = [
      (boundsDepartamentos[filtroDepartamento][0][0] + boundsDepartamentos[filtroDepartamento][1][0]) / 2,
      (boundsDepartamentos[filtroDepartamento][0][1] + boundsDepartamentos[filtroDepartamento][1][1]) / 2,
    ];
    mapZoom = 8;
  }

  // Agrupa los filtros principales en un objeto memoizado
  const filtrosPrincipales = useMemo(() => ({
    filtroDepartamento,
    filtroCiudad,
    filtroTipo,
    filtroTorneo,
    filtroEstado,
    filtroNombre
  }), [filtroDepartamento, filtroCiudad, filtroTipo, filtroTorneo, filtroEstado, filtroNombre]);

  // Resetear selección solo cuando cambian los filtros principales
  useEffect(() => {
    setSelectedId(null);
  }, [filtrosPrincipales]);

  // Filtrar equipos (memoizado para evitar bucles infinitos)
  const equiposFiltrados = useMemo(() =>
    equiposEjemplo.filter(e =>
      (!filtroDepartamento || e.departamento === filtroDepartamento) &&
      (!filtroCiudad || e.ciudad === filtroCiudad) &&
      (!filtroNombre || e.nombre.toLowerCase().includes(filtroNombre.toLowerCase())) &&
      (!filtroTipo || e.tipo === filtroTipo) &&
      (!filtroTorneo || e.torneo === filtroTorneo) &&
      (!filtroEstado || e.estado === filtroEstado)
    ),
    [filtroDepartamento, filtroCiudad, filtroNombre, filtroTipo, filtroTorneo, filtroEstado]
  );

  // Equipos visibles en el área del mapa
  const equiposVisibles = useVisibleEquipos(equiposFiltrados, mapRef);

  // Determinar si hay filtros aplicados
  const filtrosAplicados =
    filtroNombre || filtroDepartamento || filtroCiudad || filtroTipo || filtroTorneo || filtroEstado;

  function handleVerMas(equipo) {
    navigate(`/equipo/${equipo.id}`);
  }

  function handleSelectEquipo(equipo) {
    setSelectedId(equipo.id);
    popupOpenedRef.current = null; // Reset para nueva selección
    if (mapRef.current) {
      mapRef.current.setView([equipo.cancha.lat, equipo.cancha.lng], 15, { animate: true });
    }
  }

  // Forzar invalidateSize al montar y al cambiar tamaño de ventana
  useEffect(() => {
    const handleResize = () => {
      if (mapRef.current) {
        mapRef.current.invalidateSize();
      }
    };
    setTimeout(handleResize, 350);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Función para manejar clicks en botones importantes (volver, toggle de vista)
  function handleAccionConCierrePanel(accion) {
    if (mostrarFiltros) {
      setMostrarFiltros(false);
      setTimeout(accion, 50); // Espera suficiente para asegurar el re-render
    } else {
      accion();
    }
  }

  // Cerrar panel de filtros avanzados al hacer clic fuera
  useEffect(() => {
    if (!mostrarFiltros) return;
    function handleClickOutside(e) {
      if (filtrosPanelRef.current && !filtrosPanelRef.current.contains(e.target)) {
        setMostrarFiltros(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mostrarFiltros]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-24 relative">
      {console.log('BuscarEquipos render, location:', location.pathname)}
      {/* Overlay invisible SOLO sobre el contenido principal, nunca sobre la navbar ni la tab bar */}
      {mostrarFiltros && (
        <div
          className="fixed inset-0 z-30"
          style={{ pointerEvents: 'auto', background: 'transparent' }}
          onClick={e => {
            setMostrarFiltros(false);
            setTimeout(() => {
              // Vuelve a disparar el click original si fue en un enlace
              if (e.target.closest('a')) {
                e.target.closest('a').click();
              }
            }, 0);
          }}
        />
      )}
      {/* Overlay eliminado */}
      <button
        onClick={() => {
          console.log('Navegando a /buscar');
          navigate('/buscar');
        }}
        className="mb-8 self-start bg-white border border-indigo-200 text-indigo-700 font-bold px-6 py-2 rounded-xl shadow hover:bg-indigo-50 hover:border-indigo-400 transition flex items-center gap-2 z-40 relative"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        Volver
      </button>
      <h2 className="text-3xl font-extrabold text-indigo-700 mb-8 text-center drop-shadow-lg z-40 relative">Buscar equipos</h2>
      {/* Filtros premium */}
      <div className="w-full flex justify-center mb-8 z-40 relative">
        <div
          ref={filtrosPanelRef}
          className="backdrop-blur-xl bg-white/70 border border-indigo-100 shadow-2xl rounded-3xl px-6 py-8 flex flex-col gap-6 items-center w-full max-w-4xl relative"
          style={{ zIndex: mostrarFiltros ? 40 : 10 }}
        >
          <div className="w-full flex flex-col md:flex-row gap-4 md:gap-8 items-center justify-center">
            {/* Departamento */}
            <div className="flex flex-col items-center w-full md:w-56">
              <label className="text-xs font-bold text-indigo-700 mb-1">Departamento</label>
              <select
                className="rounded-xl border border-indigo-200 px-4 py-2 text-indigo-700 bg-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full shadow-sm"
                value={filtroDepartamento}
                onChange={e => {
                  setFiltroDepartamento(e.target.value);
                  setFiltroCiudad('');
                }}
              >
                <option value="">Todos</option>
                {departamentos.map(dep => (
                  <option key={dep} value={dep}>{dep}</option>
                ))}
              </select>
            </div>
            {/* Estado */}
            <div className="flex flex-col items-center w-full md:w-48">
              <label className="text-xs font-bold text-indigo-700 mb-1">Estado</label>
              <select
                className="rounded-xl border border-indigo-200 px-4 py-2 text-indigo-700 bg-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full shadow-sm"
                value={filtroEstado}
                onChange={e => setFiltroEstado(e.target.value)}
              >
                <option value="">Todos</option>
                {estados.map(estado => (
                  <option key={estado} value={estado}>{estado}</option>
                ))}
              </select>
            </div>
            {/* Nombre */}
            <div className="flex flex-col items-center w-full md:w-48">
              <label className="text-xs font-bold text-indigo-700 mb-1">Nombre</label>
              <input
                type="text"
                className="rounded-xl border border-indigo-200 px-4 py-2 w-full text-indigo-700 bg-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
                placeholder="Buscar por nombre..."
                value={filtroNombre}
                onChange={e => setFiltroNombre(e.target.value)}
                autoComplete="off"
              />
            </div>
          </div>
          {/* Filtros avanzados animados */}
          {mostrarFiltros && (
            <div
              className="w-full flex flex-col md:flex-row gap-4 md:gap-8 items-center justify-center mt-2 overflow-hidden"
            >
              {/* Ciudad */}
              <div className="flex flex-col items-center w-full md:w-56">
                <label className="text-xs font-bold text-indigo-700 mb-1">Ciudad</label>
                <select
                  className="rounded-xl border border-indigo-200 px-4 py-2 text-indigo-700 bg-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full shadow-sm"
                  value={filtroCiudad}
                  onChange={e => setFiltroCiudad(e.target.value)}
                  disabled={!filtroDepartamento}
                >
                  <option value="">Todas</option>
                  {ciudades.filter(c => !filtroDepartamento || equiposEjemplo.find(e => e.ciudad === c && e.departamento === filtroDepartamento)).map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              {/* Tipo de equipo */}
              <div className="flex flex-col items-center w-full md:w-48">
                <label className="text-xs font-bold text-indigo-700 mb-1">Tipo de equipo</label>
                <select
                  className="rounded-xl border border-indigo-200 px-4 py-2 text-indigo-700 bg-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full shadow-sm"
                  value={filtroTipo}
                  onChange={e => setFiltroTipo(e.target.value)}
                >
                  <option value="">Todos</option>
                  {tipos.map(tipo => (
                    <option key={tipo} value={tipo}>{tipo}</option>
                  ))}
                </select>
              </div>
              {/* Torneo */}
              <div className="flex flex-col items-center w-full md:w-48">
                <label className="text-xs font-bold text-indigo-700 mb-1">Torneo</label>
                <select
                  className="rounded-xl border border-indigo-200 px-4 py-2 text-indigo-700 bg-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full shadow-sm"
                  value={filtroTorneo}
                  onChange={e => setFiltroTorneo(e.target.value)}
                >
                  <option value="">Todos</option>
                  {torneos.map(torneo => (
                    <option key={torneo} value={torneo}>{torneo}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
          {/* Barra de acciones premium alineada */}
          <div className="w-full flex flex-col md:flex-row gap-4 items-center justify-between mt-4">
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto justify-center md:justify-start items-center">
              <button
                className="flex items-center gap-2 px-6 py-2 rounded-xl font-semibold bg-gradient-to-r from-indigo-500 to-blue-400 text-white shadow-lg hover:from-indigo-600 hover:to-blue-500 transition-all duration-200"
                onClick={() => setMostrarFiltros(v => !v)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 5h18M6 10h12M9 15h6" /></svg>
                {mostrarFiltros ? 'Ocultar filtros' : 'Más filtros'}
              </button>
              <button
                className="flex items-center gap-2 px-6 py-2 rounded-xl font-semibold bg-white border border-indigo-200 text-indigo-700 shadow hover:bg-indigo-50 hover:border-indigo-400 transition"
                onClick={() => {
                  setFiltroDepartamento('');
                  setFiltroCiudad('');
                  setFiltroNombre('');
                  setFiltroTipo('');
                  setFiltroTorneo('');
                  setFiltroEstado('');
                }}
                disabled={!filtrosAplicados}
              >
                <AnimatePresence initial={false}>
                  {filtrosAplicados && (
                    <motion.div
                      key="icono-x"
                      initial={{ opacity: 0, scale: 0.7, x: -8 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.7, x: -8 }}
                      transition={{ duration: 0.22, ease: 'easeInOut' }}
                      className="flex"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg>
                    </motion.div>
                  )}
                </AnimatePresence>
                Limpiar filtros
              </button>
            </div>
            {/* Toggle de vista alineado */}
            <div className="flex justify-center w-full md:w-auto mt-2 md:mt-0">
              <div className="inline-flex rounded-xl bg-indigo-50 p-1 shadow border border-indigo-100">
                <button
                  className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${vista==='tarjetas' ? 'bg-white text-indigo-700 shadow' : 'text-gray-500 hover:text-indigo-700'}`}
                  onClick={() => setVista('tarjetas')}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/></svg>
                  Tarjetas
                </button>
                <button
                  className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${vista==='mapa' ? 'bg-white text-indigo-700 shadow' : 'text-gray-500 hover:text-indigo-700'}`}
                  onClick={() => setVista('mapa')}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 20l-5.447-2.724A2 2 0 013 15.382V6.618a2 2 0 011.553-1.894l5.447-1.724a2 2 0 011.262 0l5.447 1.724A2 2 0 0121 6.618v8.764a2 2 0 01-1.553 1.894L14 20a2 2 0 01-1.262 0z"/></svg>
                  Mapa
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Vista seleccionada */}
      {vista === 'tarjetas' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {equiposFiltrados.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">No se encontraron equipos con esos filtros.</div>
          ) : (
            equiposFiltrados.map(equipo => <EquipoCard key={equipo.id} equipo={equipo} onVerMas={handleVerMas} />)
          )}
        </div>
      ) : (
        <div className="flex flex-col md:flex-row items-stretch gap-0 md:gap-0 rounded-2xl overflow-hidden shadow-lg border-2 border-indigo-100 bg-white w-full h-full">
          {/* Mapa */}
          <div className="w-full md:w-2/3 h-[300px] md:h-[600px] relative">
            <MapContainer
              center={mapCenter}
              zoom={mapZoom}
              maxBounds={mapBounds}
              style={{ height: '100%', width: '100%' }}
              scrollWheelZoom={true}
              whenCreated={mapInstance => { mapRef.current = mapInstance; }}
            >
              <SetViewAndBounds equipos={equiposFiltrados} selectedId={selectedId} mapBounds={mapBounds} mapCenter={mapCenter} mapZoom={mapZoom} filtrosPrincipales={filtrosPrincipales} />
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
              />
              {equiposFiltrados.map(equipo => (
                <Marker
                  key={equipo.id}
                  position={[equipo.cancha.lat, equipo.cancha.lng]}
                  icon={equipoIcon}
                  ref={ref => { markerRefs.current[equipo.id] = ref; }}
                  eventHandlers={{ click: () => handleSelectEquipo(equipo) }}
                >
                  <Popup autoPan>
                    <div className="flex flex-col items-center p-2 min-w-[180px]">
                      <img src={equipo.logo} alt={equipo.nombre} className="w-14 h-14 rounded-full object-cover border-2 border-indigo-200 shadow mb-2" />
                      <div className="font-bold text-indigo-700 text-lg mb-1">{equipo.nombre}</div>
                      <div className="text-sm text-gray-600 mb-1">{equipo.ciudad}</div>
                      <div className="text-indigo-600 font-semibold mb-2">{equipo.torneo}</div>
                      <button
                        onClick={() => handleVerMas(equipo)}
                        className="mt-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 animate-pulse hover:scale-105"
                      >
                        Ver más
                      </button>
                    </div>
                  </Popup>
                  {selectedId === equipo.id && (
                    <PopupOpener markerRef={markerRefs.current[equipo.id]} popupOpenedRef={popupOpenedRef} equipoId={equipo.id} />
                  )}
                </Marker>
              ))}
            </MapContainer>
          </div>
          {/* Lista de equipos */}
          <div className="w-full md:w-1/3 h-[220px] md:h-[600px] flex-shrink-0 overflow-y-auto max-h-[calc(100vh-300px-64px)] md:max-h-none pb-20 md:pb-0">
            {equiposVisibles.length === 0 ? (
              <div className="text-gray-400 text-center py-4 md:py-8 text-sm md:text-base">No hay equipos en el área visible.</div>
            ) : (
              <ul className="flex flex-col gap-1 md:gap-2">
                {equiposVisibles.map(equipo => (
                  <li
                    key={equipo.id}
                    className={`flex items-center gap-2 md:gap-3 bg-white/90 hover:bg-indigo-50 rounded-xl px-2 md:px-3 py-2 shadow-sm border border-indigo-50 transition cursor-pointer group ${selectedId === equipo.id ? 'ring-2 ring-indigo-400' : ''}`}
                    onClick={() => handleSelectEquipo(equipo)}
                  >
                    <img src={equipo.logo} alt={equipo.nombre} className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border-2 border-indigo-200 shadow-sm" />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-indigo-700 truncate text-sm md:text-base">{equipo.nombre}</div>
                      <div className="text-xs text-gray-500 flex gap-2 items-center">
                        <span className="inline-flex items-center gap-1"><span className="text-base md:text-lg">🏟️</span> {equipo.cancha.nombre}</span>
                        <span className="inline-flex items-center gap-1 text-green-600 font-bold"><svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg> {equipo.torneo}</span>
                      </div>
                    </div>
                    <button
                      onClick={e => { e.stopPropagation(); handleVerMas(equipo); }}
                      className="ml-1 md:ml-2 px-2 md:px-3 py-1 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-400 text-white font-bold text-xs shadow hover:from-indigo-600 hover:to-blue-500 transition"
                    >
                      Ver más
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

function PopupOpener({ markerRef, popupOpenedRef, equipoId }) {
  useEffect(() => {
    if (markerRef && popupOpenedRef.current !== equipoId) {
      markerRef.openPopup();
      popupOpenedRef.current = equipoId;
    }
  }, [markerRef, popupOpenedRef, equipoId]);
  return null;
}

export default BuscarEquipos; 