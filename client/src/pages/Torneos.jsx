import React, { useState, useRef, useMemo, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import PanelCanchas from '../components/PanelCanchas';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

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

const VistaToggle = ({ vista, setVista }) => (
  <div className="flex justify-center mb-8 gap-2">
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
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 20l-5.447-2.724A2 2 0 013 15.382V6.618a2 2 0 011.553-1.894l5.447-1.724a2 2 0 011.262 0l5.447 1.724A2 2 0 0121 6.618v8.764a2 2 0 01-1.553 1.894L14 20a2 2 0 01-1.262 0z" /></svg>
      Mapa
    </button>
  </div>
);

const Torneos = () => {
  const navigate = useNavigate();
  const [filtroDepartamento, setFiltroDepartamento] = useState('');
  const [filtroCiudad, setFiltroCiudad] = useState('');
  const [filtroNombre, setFiltroNombre] = useState('');
  const [canchaSeleccionada, setCanchaSeleccionada] = useState(null);
  const [vista, setVista] = useState('tarjetas');
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  // Filtros avanzados
  const [filtroTipoCancha, setFiltroTipoCancha] = useState('');
  const [filtroPremio, setFiltroPremio] = useState('');
  const [filtroInscripcion, setFiltroInscripcion] = useState('');
  const [modalTorneo, setModalTorneo] = useState(null);
  const filtrosPanelRef = useRef();
  const [selectedTorneoId, setSelectedTorneoId] = useState(null);
  const mapRef = useRef();
  const markerRefs = useRef({});

  // Obtener tipos únicos de cancha
  const tiposCancha = Array.from(new Set(canchasEjemplo.map(c => c.tipo)));

  // Filtros principales memoizados
  const canchasFiltradas = useMemo(() => canchasEjemplo.filter(c =>
    (!filtroDepartamento || c.departamento === filtroDepartamento) &&
    (!filtroCiudad || c.ciudad === filtroCiudad)
  ), [filtroDepartamento, filtroCiudad]);

  // Torneos filtrados (incluye filtro por nombre)
  const torneosFiltrados = useMemo(() =>
    canchasFiltradas.flatMap(c => c.torneos.map(t => ({
      ...t,
      cancha: c.nombre,
      tipoCancha: c.tipo,
      ciudad: c.ciudad,
      direccion: c.direccion,
      fotoCancha: c.foto,
      lat: c.lat,
      lng: c.lng,
      departamento: c.departamento
    })))
    .filter(t =>
      (!filtroNombre || t.nombre.toLowerCase().includes(filtroNombre.toLowerCase())) &&
      (!filtroTipoCancha || t.tipoCancha === filtroTipoCancha) &&
      (!filtroPremio || t.premio1 >= Number(filtroPremio)) &&
      (!filtroInscripcion || t.inscripcion <= Number(filtroInscripcion))
    ),
    [canchasFiltradas, filtroNombre, filtroTipoCancha, filtroPremio, filtroInscripcion]
  );

  // Centrar el mapa en Colombia o en la ciudad filtrada
  const center = filtroCiudad
    ? [canchasFiltradas[0]?.lat || 4.711, canchasFiltradas[0]?.lng || -74.0721]
    : [4.711, -74.0721];

  // Función para limpiar filtros avanzados
  const limpiarFiltros = () => {
    setFiltroTipoCancha('');
    setFiltroPremio('');
    setFiltroInscripcion('');
  };

  // Cerrar filtros avanzados al hacer click fuera
  React.useEffect(() => {
    if (!mostrarFiltros) return;
    function handleClickOutside(e) {
      if (filtrosPanelRef.current && !filtrosPanelRef.current.contains(e.target)) {
        setMostrarFiltros(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mostrarFiltros]);

  // Torneos visibles en el área del mapa
  function useVisibleTorneos(torneos, mapRef) {
    const [visibles, setVisibles] = useState(torneos);
    useEffect(() => {
      if (!mapRef.current) {
        setVisibles(torneos);
        return;
      }
      const map = mapRef.current;
      const update = () => {
        const bounds = map.getBounds();
        setVisibles(
          torneos.filter(t => bounds.contains([t.lat, t.lng]))
        );
      };
      update();
      map.on('moveend zoomend', update);
      return () => {
        map.off('moveend zoomend', update);
      };
    }, [torneos, mapRef]);
    return visibles;
  }
  const torneosVisibles = useVisibleTorneos(torneosFiltrados, mapRef);

  // Centrar y abrir popup al seleccionar torneo
  function handleSelectTorneo(torneo) {
    setSelectedTorneoId(torneo.id);
    if (mapRef.current) {
      mapRef.current.setView([torneo.lat, torneo.lng], 15, { animate: true });
    }
    setTimeout(() => {
      if (markerRefs.current[torneo.id]) {
        markerRefs.current[torneo.id].openPopup();
      }
    }, 200);
  }

  // Tarjeta premium de torneo
  function TorneoCard({ torneo, onVerDetalle, selected }) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 32, scale: 0.97 }}
        transition={{ duration: 0.38, type: 'spring', bounce: 0.18 }}
        className={`relative bg-white/70 backdrop-blur-xl border border-indigo-100 shadow-xl hover:shadow-indigo-300/30 rounded-3xl overflow-visible w-full max-w-md mx-auto flex flex-col items-center transition-all duration-300 hover:scale-[1.025] hover:bg-white/90 cursor-pointer min-h-[480px] pt-20 px-2 md:px-0 ${selected ? 'ring-4 ring-indigo-400' : ''}`}
        style={{ background: 'linear-gradient(135deg, rgba(236,239,255,0.92) 60%, rgba(199,210,254,0.8) 100%)', marginBottom: '2.5rem' }}
        onClick={onVerDetalle}
      >
        {/* Imagen grande con overlay */}
        <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-28 h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden shadow-lg border-4 border-indigo-200 z-10 group-hover:scale-110 transition-transform bg-white">
          <img src={torneo.imagen || torneo.fotoCancha} alt={torneo.nombre} className="w-full h-full object-cover" />
          <div className={`absolute bottom-2 left-2 px-2 py-0.5 rounded-full text-xs font-bold shadow bg-opacity-90 ${torneo.estado==='Abierto' ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'}`} style={{fontSize:'0.75rem', minWidth:'60px', textAlign:'center'}}>{torneo.estado}</div>
        </div>
        {/* Info principal */}
        <div className="flex flex-col items-center mt-20 w-full px-2 md:px-4">
          <div className="flex flex-wrap gap-2 mb-2 justify-center w-full">
            {/* Tooltip premium para tipo */}
            <div className="relative group">
              <span className="bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full shadow-sm cursor-pointer">{torneo.tipo}</span>
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-indigo-700 text-white text-xs rounded px-2 py-1 shadow-lg z-50 whitespace-nowrap">Tipo de torneo</div>
            </div>
            {/* Tooltip premium para ciudad */}
            <div className="relative group">
              <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full shadow-sm cursor-pointer">{torneo.ciudad}</span>
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-blue-700 text-white text-xs rounded px-2 py-1 shadow-lg z-50 whitespace-nowrap">Ciudad</div>
            </div>
            {/* Tooltip premium para tipo de cancha */}
            <div className="relative group">
              <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full shadow-sm cursor-pointer">{torneo.tipoCancha}</span>
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-green-700 text-white text-xs rounded px-2 py-1 shadow-lg z-50 whitespace-nowrap">Tipo de cancha</div>
            </div>
          </div>
          <div className="text-lg md:text-xl font-bold text-indigo-700 mb-1 text-center drop-shadow-lg">{torneo.nombre}</div>
          <div className="text-gray-500 text-sm mb-2 text-center">{torneo.fechas}</div>
          <div className="flex flex-wrap gap-2 justify-center mb-2 w-full">
            {/* Tooltip premium para premios */}
            <div className="relative group">
              <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1 cursor-pointer"><svg className="w-4 h-4 inline" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg> {torneo.premio1.toLocaleString()} 1er</span>
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-yellow-700 text-white text-xs rounded px-2 py-1 shadow-lg z-50 whitespace-nowrap">Premio 1er puesto</div>
            </div>
            <div className="relative group">
              <span className="bg-yellow-50 text-yellow-600 text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1 cursor-pointer"><svg className="w-4 h-4 inline" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><text x="12" y="16" textAnchor="middle" fontSize="10" fill="#b45309">2</text></svg> {torneo.premio2.toLocaleString()} 2do</span>
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-yellow-600 text-white text-xs rounded px-2 py-1 shadow-lg z-50 whitespace-nowrap">Premio 2do puesto</div>
            </div>
            <div className="relative group">
              <span className="bg-yellow-50 text-yellow-500 text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1 cursor-pointer"><svg className="w-4 h-4 inline" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><text x="12" y="16" textAnchor="middle" fontSize="10" fill="#ca8a04">3</text></svg> {torneo.premio3.toLocaleString()} 3ro</span>
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-yellow-500 text-white text-xs rounded px-2 py-1 shadow-lg z-50 whitespace-nowrap">Premio 3er puesto</div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-1 mb-2 w-full">
            {/* Tooltip premium para nombre de cancha */}
            <div className="relative group">
              <span className="text-xs text-gray-400 flex items-center gap-1 cursor-pointer"><svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10.5V7a2 2 0 0 0-2-2h-1.5" /><path d="M3 7v3.5a2 2 0 0 0 2 2h1.5" /><path d="M7 21h10a2 2 0 0 0 2-2v-1.5" /><path d="M17 3H7a2 2 0 0 0-2 2v1.5" /></svg> <span className="font-semibold text-indigo-700">{torneo.cancha}</span></span>
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-indigo-700 text-white text-xs rounded px-2 py-1 shadow-lg z-50 whitespace-nowrap">Nombre de la cancha</div>
            </div>
            {/* Tooltip premium para dirección */}
            <div className="relative group">
              <span className="text-xs text-gray-400 flex items-center gap-1 cursor-pointer"><svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 12.414a4 4 0 1 0-1.414 1.414l4.243 4.243a1 1 0 0 0 1.414-1.414z" /></svg> <span className="font-semibold text-indigo-700">{torneo.direccion}</span></span>
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-indigo-700 text-white text-xs rounded px-2 py-1 shadow-lg z-50 whitespace-nowrap">Dirección</div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-1 mb-2 w-full">
            {/* Tooltip premium para inscripción */}
            <div className="relative group">
              <span className="text-xs text-gray-400 flex items-center gap-1 cursor-pointer"><svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg> <span className="font-bold text-green-600">${torneo.inscripcion.toLocaleString()}</span></span>
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-green-700 text-white text-xs rounded px-2 py-1 shadow-lg z-50 whitespace-nowrap">Valor inscripción</div>
            </div>
          </div>
          <div className="flex-1" />
          <button
            className="mt-4 w-full md:w-auto px-6 py-3 bg-gradient-to-r from-indigo-500 to-blue-400 text-white font-bold rounded-xl shadow-lg hover:from-indigo-600 hover:to-blue-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 animate-fade-in hover:scale-105 sticky bottom-2 md:static"
            style={{marginTop:'auto'}}
            onClick={e => { e.stopPropagation(); setModalTorneo(torneo); }}
          >
            Ver detalles
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-24">
      <button onClick={() => navigate('/buscar')} className="mb-8 self-start bg-white border border-indigo-200 text-indigo-700 font-bold px-6 py-2 rounded-xl shadow hover:bg-indigo-50 hover:border-indigo-400 transition flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        Volver
      </button>
      {/* Hero visual */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-4 drop-shadow-lg">Torneos de Fútbol</h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-6">
          Descubre, organiza y participa en torneos de fútbol en canchas profesionales de toda Colombia. Explora el mapa, encuentra torneos activos y vive la pasión del fútbol con una experiencia moderna, intuitiva y profesional.
        </p>
      </div>
      {/* Filtros premium ordenados */}
      <div className="w-full flex justify-center mb-8 z-40 relative" style={{marginBottom:'2.5rem'}}>
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
                  <option key={dep.nombre} value={dep.nombre}>{dep.nombre}</option>
                ))}
              </select>
            </div>
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
                {departamentos.find(dep => dep.nombre === filtroDepartamento)?.ciudades.map(ciudad => (
                  <option key={ciudad} value={ciudad}>{ciudad}</option>
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
              {/* Tipo de cancha */}
              <div className="flex flex-col items-center w-full md:w-48">
                <label className="text-xs font-bold text-indigo-700 mb-1">Tipo de cancha</label>
                <select
                  className="rounded-xl border border-indigo-200 px-4 py-2 text-indigo-700 bg-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full shadow-sm"
                  value={filtroTipoCancha}
                  onChange={e => setFiltroTipoCancha(e.target.value)}
                >
                  <option value="">Todas</option>
                  {tiposCancha.map(tipo => (
                    <option key={tipo} value={tipo}>{tipo}</option>
                  ))}
                </select>
              </div>
              {/* Premio mínimo */}
              <div className="flex flex-col items-center w-full md:w-48">
                <label className="text-xs font-bold text-indigo-700 mb-1">Premio mínimo (1er puesto)</label>
                <input
                  type="number"
                  min={0}
                  className="rounded-xl border border-indigo-200 px-4 py-2 text-indigo-700 bg-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full shadow-sm"
                  value={filtroPremio}
                  onChange={e => setFiltroPremio(e.target.value)}
                  placeholder="Ej: 500000"
                />
              </div>
              {/* Inscripción máxima */}
              <div className="flex flex-col items-center w-full md:w-48">
                <label className="text-xs font-bold text-indigo-700 mb-1">Inscripción máxima</label>
                <input
                  type="number"
                  min={0}
                  className="rounded-xl border border-indigo-200 px-4 py-2 text-indigo-700 bg-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full shadow-sm"
                  value={filtroInscripcion}
                  onChange={e => setFiltroInscripcion(e.target.value)}
                  placeholder="Ej: 200000"
                />
              </div>
            </div>
          )}
          {/* Barra de acciones premium alineada */}
          <div className="w-full flex flex-col md:flex-row gap-4 items-center justify-between mt-4">
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto justify-center md:justify-start items-center">
              <button
                className="flex items-center gap-2 px-6 py-2 rounded-lg font-semibold bg-white border border-indigo-200 shadow hover:bg-indigo-50 text-indigo-700 transition-all duration-200"
                onClick={() => setMostrarFiltros(v => !v)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 5h18M6 10h12M9 15h6" /></svg>
                {mostrarFiltros ? 'Ocultar filtros' : 'Más filtros'}
              </button>
              <button
                className="flex items-center gap-2 px-6 py-2 rounded-lg font-semibold bg-white border border-indigo-200 shadow hover:bg-indigo-50 text-indigo-700 transition-all duration-200"
                onClick={limpiarFiltros}
                disabled={!filtroTipoCancha && !filtroPremio && !filtroInscripcion}
              >
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-24"> {/* Más separación aquí */}
          {torneosFiltrados.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">No se encontraron torneos con esos filtros.</div>
          ) : (
            torneosFiltrados.map(torneo => (
              <TorneoCard
                key={torneo.id}
                torneo={torneo}
                onVerDetalle={() => setModalTorneo(torneo)}
                selected={selectedTorneoId === torneo.id}
              />
            ))
          )}
        </div>
      ) : (
        <div className="flex flex-col md:flex-row items-stretch gap-0 md:gap-0 rounded-2xl overflow-hidden shadow-lg border-2 border-indigo-100 bg-white w-full h-full">
          {/* Mapa */}
          <div className="w-full md:w-2/3 h-[300px] md:h-[600px] relative">
            <MapContainer
              center={center}
              zoom={filtroCiudad ? 12 : 6}
              style={{ height: '100%', width: '100%' }}
              scrollWheelZoom={true}
              whenCreated={mapInstance => { mapRef.current = mapInstance; }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
              />
              {torneosFiltrados.map(torneo => (
                <Marker
                  key={torneo.id}
                  position={[torneo.lat, torneo.lng]}
                  icon={canchaIcon}
                  ref={ref => { markerRefs.current[torneo.id] = ref; }}
                  eventHandlers={{ click: () => handleSelectTorneo(torneo) }}
                >
                  <Popup autoPan>
                    <div className="flex flex-col items-center p-2 min-w-[180px]">
                      <img src={torneo.imagen || torneo.fotoCancha} alt={torneo.nombre} className="w-14 h-14 rounded-full object-cover border-2 border-indigo-200 shadow mb-2" />
                      <div className="font-bold text-indigo-700 text-lg mb-1">{torneo.nombre}</div>
                      <div className="text-sm text-gray-600 mb-1">{torneo.ciudad}</div>
                      <div className="text-indigo-600 font-semibold mb-2">{torneo.tipo}</div>
                      <button
                        onClick={() => setModalTorneo(torneo)}
                        className="mt-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 animate-pulse hover:scale-105"
                      >
                        Ver detalles
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
          {/* Lista de torneos visibles */}
          <div className="w-full md:w-1/3 h-[220px] md:h-[600px] flex-shrink-0 overflow-y-auto max-h-[calc(100vh-300px-64px)] md:max-h-none pb-20 md:pb-0">
            {torneosVisibles.length === 0 ? (
              <div className="text-gray-400 text-center py-4 md:py-8 text-sm md:text-base">No hay torneos en el área visible.</div>
            ) : (
              <ul className="flex flex-col gap-1 md:gap-2">
                {torneosVisibles.map(torneo => (
                  <li
                    key={torneo.id}
                    className={`flex items-center gap-2 md:gap-3 bg-white/90 hover:bg-indigo-50 rounded-xl px-2 md:px-3 py-2 shadow-sm border border-indigo-50 transition cursor-pointer group ${selectedTorneoId === torneo.id ? 'ring-2 ring-indigo-400' : ''}`}
                    onClick={() => handleSelectTorneo(torneo)}
                  >
                    <img src={torneo.imagen || torneo.fotoCancha} alt={torneo.nombre} className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border-2 border-indigo-200 shadow-sm" />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-indigo-700 truncate text-sm md:text-base">{torneo.nombre}</div>
                      <div className="text-xs text-gray-500 flex gap-2 items-center">
                        <span className="inline-flex items-center gap-1"><span className="text-base md:text-lg">🏟️</span> {torneo.cancha}</span>
                        <span className="inline-flex items-center gap-1 text-green-600 font-bold"><svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg> {torneo.tipo}</span>
                      </div>
                    </div>
                    <button
                      onClick={e => { e.stopPropagation(); setModalTorneo(torneo); }}
                      className="ml-1 md:ml-2 px-2 md:px-3 py-1 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-400 text-white font-bold text-xs shadow hover:from-indigo-600 hover:to-blue-500 transition"
                    >
                      Ver detalles
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
      {/* Modal de detalles de torneo */}
      <AnimatePresence>
        {modalTorneo && (
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-40 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative mt-20"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              {/* Cerrar */}
              <button onClick={() => setModalTorneo(null)} className="absolute top-4 right-4 text-gray-400 hover:text-indigo-700 text-2xl font-bold focus:outline-none">×</button>
              {/* Imagen y nombre */}
              <div className="flex flex-col items-center mb-4">
                <img src={modalTorneo.imagen} alt={modalTorneo.nombre} className="w-28 h-28 rounded-xl object-cover border-4 border-indigo-200 shadow mb-2" />
                <h2 className="text-2xl font-bold text-indigo-700 mb-1 text-center">{modalTorneo.nombre}</h2>
                <div className="text-gray-600 text-sm mb-1">{modalTorneo.fechas} • {modalTorneo.tipo}</div>
                <div className="text-xs text-gray-500 mb-2 text-center">Estado: <span className={modalTorneo.estado === 'Abierto' ? 'text-green-600 font-bold' : 'text-gray-400'}>{modalTorneo.estado}</span></div>
              </div>
              {/* Info de cancha */}
              <div className="mb-4 bg-indigo-50 rounded-xl p-3 text-sm text-indigo-800 flex flex-col gap-1">
                <span><b>Cancha:</b> {modalTorneo.cancha}</span>
                <span><b>Tipo:</b> {modalTorneo.tipoCancha}</span>
                <span><b>Ciudad:</b> {modalTorneo.ciudad}</span>
                <span><b>Dirección:</b> {modalTorneo.direccion}</span>
              </div>
              {/* Premios */}
              <div className="mb-4 flex flex-col gap-2">
                <div className="flex gap-2 justify-center">
                  <span className="flex items-center gap-1 bg-yellow-100 text-yellow-800 font-bold px-3 py-1 rounded-full text-sm"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2c.512 0 .935.386.993.883l.007.117V4h2.5a1 1 0 0 1 .993.883L16.5 5v2.5a1 1 0 0 1-.883.993L15.5 8.5h-7a1 1 0 0 1-.993-.883L7.5 7.5V5a1 1 0 0 1 .883-.993L8.5 4H11V3c0-.552.448-1 1-1zm0 2h-2.5v1.5h5V4H12zm-4 5.5h8a1 1 0 0 1 .993.883L17 10.5v7a1 1 0 0 1-.883.993L16 18.5H8a1 1 0 0 1-.993-.883L7 17.5v-7a1 1 0 0 1 .883-.993L8 8.5zm1 2v6h6v-6H9zm3 2a1 1 0 0 1 .993.883L13 13v2a1 1 0 0 1-1.993.117L11 15v-2a1 1 0 0 1 .883-.993L12 12z"/></svg> 1er Puesto: ${modalTorneo.premio1.toLocaleString()}</span>
                  <span className="flex items-center gap-1 bg-gray-100 text-gray-700 font-bold px-3 py-1 rounded-full text-sm"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#d1d5db" /><text x="12" y="16" textAnchor="middle" fontSize="12" fill="#374151">2</text></svg> 2do: ${modalTorneo.premio2.toLocaleString()}</span>
                  <span className="flex items-center gap-1 bg-orange-100 text-orange-800 font-bold px-3 py-1 rounded-full text-sm"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#fdba74" /><text x="12" y="16" textAnchor="middle" fontSize="12" fill="#b45309">3</text></svg> 3ro: ${modalTorneo.premio3.toLocaleString()}</span>
                </div>
              </div>
              {/* Inscripción */}
              <div className="mb-4 text-center">
                <span className="inline-block bg-indigo-100 text-indigo-700 font-semibold px-4 py-2 rounded-lg text-base">Inscripción por equipo: ${modalTorneo.inscripcion.toLocaleString()}</span>
              </div>
              {/* Visualización de equipos inscritos */}
              <div className="mb-4 flex items-center justify-center gap-2">
                <span className={`font-bold text-sm px-3 py-1 rounded-full border shadow-sm
                  ${modalTorneo.equiposInscritos === modalTorneo.maxEquipos ? 'bg-red-100 text-red-700 border-red-200' : 'bg-green-50 text-green-700 border-green-200'}`}
                >
                  Equipos: {modalTorneo.equiposInscritos}/{modalTorneo.maxEquipos}
                </span>
                {modalTorneo.equiposInscritos === modalTorneo.maxEquipos && (
                  <span className="ml-2 text-xs font-bold bg-red-200 text-red-800 px-2 py-1 rounded-full">¡Cupo lleno!</span>
                )}
              </div>
              {/* Contacto y reglas */}
              <div className="mb-4 flex flex-col md:flex-row gap-4">
                <div className="flex-1 bg-white border border-indigo-100 rounded-xl p-3">
                  <div className="font-bold text-indigo-700 mb-1 flex items-center gap-1"><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10.5a8.38 8.38 0 01-.9 3.8c-.5 1-1.1 2-2 2.7-.8.7-1.8 1-2.8 1.1-1.1.1-2.2-.1-3.2-.6-1-.5-1.9-1.2-2.6-2-.7-.8-1.3-1.7-1.7-2.7-.4-1-.6-2.1-.5-3.2.1-1 .4-2 .9-2.9.5-.9 1.2-1.7 2-2.3.8-.6 1.7-1 2.7-1.1 1.1-.1 2.2.1 3.2.6 1 .5 1.9 1.2 2.6 2 .7.8 1.3 1.7 1.7 2.7.4 1 .6 2.1.5 3.2z" /></svg> Contacto</div>
                  <div className="text-gray-600 text-sm">info@cancha.com<br/>+57 300 123 4567</div>
                </div>
                <div className="flex-1 bg-white border border-indigo-100 rounded-xl p-3">
                  <div className="font-bold text-indigo-700 mb-1 flex items-center gap-1"><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20h9" /><path d="M12 4v16m0 0H3" /></svg> Reglas</div>
                  <ul className="text-gray-600 text-sm list-disc pl-5">
                    <li>Máximo 12 equipos.</li>
                    <li>Partidos de 2 tiempos de 25 minutos.</li>
                    <li>Uniforme obligatorio.</li>
                    <li>Respeto y juego limpio.</li>
                  </ul>
                </div>
              </div>
              {/* Botón inscribirse */}
              <div className="flex flex-col sm:flex-row gap-3 mt-2 w-full">
                <button
                  className={`flex-1 px-4 py-2 rounded-lg font-semibold shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 text-lg
                    ${modalTorneo.estado === 'Abierto' && modalTorneo.equiposInscritos < modalTorneo.maxEquipos ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-300'}`}
                  onClick={modalTorneo.estado === 'Abierto' && modalTorneo.equiposInscritos < modalTorneo.maxEquipos ? () => {/* Aquí irá el flujo real de inscripción */} : undefined}
                  disabled={modalTorneo.estado !== 'Abierto' || modalTorneo.equiposInscritos === modalTorneo.maxEquipos}
                >
                  {modalTorneo.estado === 'Abierto' && modalTorneo.equiposInscritos < modalTorneo.maxEquipos ? 'Inscribirse al torneo' : 'Inscripción no disponible'}
                </button>
                <a
                  href={`/torneo/${modalTorneo.id}`}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-indigo-200 text-indigo-700 font-semibold rounded-lg shadow hover:bg-indigo-50 hover:text-indigo-900 transition-all duration-200 text-center"
                  style={{ textDecoration: 'none' }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                  Más información del torneo
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Torneos; 