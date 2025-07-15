import React, { useState } from 'react';
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
  const [canchaSeleccionada, setCanchaSeleccionada] = useState(null);
  const [vista, setVista] = useState('tarjetas');
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  // Filtros avanzados
  const [filtroTipoCancha, setFiltroTipoCancha] = useState('');
  const [filtroPremio, setFiltroPremio] = useState('');
  const [filtroInscripcion, setFiltroInscripcion] = useState('');
  const [modalTorneo, setModalTorneo] = useState(null);

  // Obtener tipos únicos de cancha
  const tiposCancha = Array.from(new Set(canchasEjemplo.map(c => c.tipo)));

  // Filtrar canchas según ciudad/departamento
  const canchasFiltradas = canchasEjemplo.filter(c =>
    (!filtroDepartamento || c.departamento === filtroDepartamento) &&
    (!filtroCiudad || c.ciudad === filtroCiudad)
  );
  // Obtener todos los torneos activos de las canchas filtradas
  let torneosFiltrados = canchasFiltradas.flatMap(c => c.torneos.map(t => ({ ...t, cancha: c.nombre, tipoCancha: c.tipo, ciudad: c.ciudad, direccion: c.direccion, fotoCancha: c.foto })));
  // Aplicar filtros avanzados
  torneosFiltrados = torneosFiltrados.filter(t =>
    (!filtroTipoCancha || t.tipoCancha === filtroTipoCancha) &&
    (!filtroPremio || t.premio1 >= Number(filtroPremio)) &&
    (!filtroInscripcion || t.inscripcion <= Number(filtroInscripcion))
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
      {/* Filtros ciudad/departamento siempre visible */}
      <div className="flex flex-col md:flex-row gap-4 mb-2 items-center justify-center">
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
      {/* Botón más filtros y filtros avanzados debajo del selector de ciudad */}
      <div className="flex flex-col items-center w-full mb-6">
        <div className="flex justify-center mb-2 w-full">
          <button
            className="flex items-center gap-2 px-6 py-2 rounded-lg font-semibold bg-white border border-indigo-200 shadow hover:bg-indigo-50 text-indigo-700 transition-all duration-200"
            onClick={() => setMostrarFiltros(v => !v)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 5h18M6 10h12M9 15h6" /></svg>
            {mostrarFiltros ? 'Ocultar filtros' : 'Más filtros'}
          </button>
        </div>
        <AnimatePresence>
          {mostrarFiltros && (
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow p-4 flex flex-col gap-2 w-full items-center"
            >
              <div className="flex flex-col md:flex-row md:items-center md:gap-4 gap-2 w-full justify-center">
                <div className="flex-1 flex flex-col min-w-[140px] max-w-[220px]">
                  <label className="text-sm font-semibold text-indigo-700 mb-1">Tipo de cancha</label>
                  <select
                    className="border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={filtroTipoCancha}
                    onChange={e => setFiltroTipoCancha(e.target.value)}
                  >
                    <option value="">Todas</option>
                    {tiposCancha.map(tipo => (
                      <option key={tipo} value={tipo}>{tipo}</option>
                    ))}
                  </select>
                  <span className="text-xs text-gray-500 mt-1">Filtra por tipo de superficie.</span>
                </div>
                <div className="flex-1 flex flex-col min-w-[140px] max-w-[220px]">
                  <label className="text-sm font-semibold text-indigo-700 mb-1">Premio mínimo (1er puesto)</label>
                  <input
                    type="number"
                    min={0}
                    className="border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={filtroPremio}
                    onChange={e => setFiltroPremio(e.target.value)}
                    placeholder="Ej: 500000"
                  />
                  <span className="text-xs text-gray-500 mt-1">Torneos con premio igual o mayor.</span>
                </div>
                <div className="flex-1 flex flex-col min-w-[140px] max-w-[220px]">
                  <label className="text-sm font-semibold text-indigo-700 mb-1">Inscripción máxima</label>
                  <input
                    type="number"
                    min={0}
                    className="border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={filtroInscripcion}
                    onChange={e => setFiltroInscripcion(e.target.value)}
                    placeholder="Ej: 200000"
                  />
                  <span className="text-xs text-gray-500 mt-1">Torneos con inscripción igual o menor.</span>
                </div>
                {/* Botón limpiar filtros */}
                <div className="flex items-center justify-end min-w-[140px] md:ml-8 mt-0">
                  <button
                    onClick={limpiarFiltros}
                    className={`bg-white border border-indigo-200 text-indigo-700 font-semibold w-44 py-2 rounded-lg shadow hover:bg-indigo-50 hover:border-indigo-400 transition-all duration-200 flex items-center justify-center gap-2 relative`}
                    title="Limpiar todos los filtros"
                    style={{ alignSelf: 'flex-end' }}
                  >
                    <AnimatePresence>
                      {(filtroTipoCancha || filtroPremio || filtroInscripcion) && (
                        <motion.span
                          key="x-icon"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.25 }}
                          className="flex items-center"
                        >
                          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                        </motion.span>
                      )}
                    </AnimatePresence>
                    <span className="hidden sm:inline">Limpiar filtros</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Mensaje explicativo del toggle */}
      <div className="text-center text-indigo-700 font-medium mb-2">Elige cómo quieres ver los torneos: en tarjetas o en el mapa.</div>
      {/* Toggle de vista */}
      <VistaToggle vista={vista} setVista={setVista} />
      {/* Vista de mapa o tarjetas */}
      {vista === 'mapa' ? (
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
          <PanelCanchas cancha={canchaSeleccionada} onClose={() => setCanchaSeleccionada(null)} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
          {torneosFiltrados.length === 0 ? (
            <div className="col-span-full text-center text-gray-400">No hay torneos activos para los filtros seleccionados.</div>
          ) : (
            torneosFiltrados.map(torneo => (
              <div key={torneo.id} className="bg-white border border-indigo-100 rounded-2xl p-6 shadow-md hover:shadow-xl transition flex flex-col items-center gap-3 relative">
                <div className="flex flex-col items-center gap-2 w-full">
                  <img src={torneo.imagen} alt={torneo.nombre} className="w-20 h-20 rounded-lg object-cover border-2 border-indigo-200 shadow mb-1" />
                  <div className="font-bold text-indigo-700 text-xl text-center leading-tight">{torneo.nombre}</div>
                  <div className="text-gray-600 text-sm text-center">{torneo.fechas} • {torneo.tipo}</div>
                  {/* Badge de estado */}
                  <div className="flex justify-center mb-1">
                    {(() => {
                      let badge;
                      switch (torneo.estado) {
                        case 'Abierto':
                          badge = <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full text-xs shadow-sm border border-green-200">● Abierto</span>; break;
                        case 'Lleno':
                          badge = <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 font-bold px-3 py-1 rounded-full text-xs shadow-sm border border-yellow-200">● Lleno</span>; break;
                        case 'Cerrado':
                          badge = <span className="inline-flex items-center gap-1 bg-gray-200 text-gray-500 font-bold px-3 py-1 rounded-full text-xs shadow-sm border border-gray-300">● Cerrado</span>; break;
                        case 'En curso':
                          badge = <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-full text-xs shadow-sm border border-blue-200">● En curso</span>; break;
                        case 'Finalizado':
                          badge = <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 font-bold px-3 py-1 rounded-full text-xs shadow-sm border border-red-200">● Finalizado</span>; break;
                        default:
                          badge = <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-500 font-bold px-3 py-1 rounded-full text-xs shadow-sm border border-gray-200">● {torneo.estado}</span>;
                      }
                      return badge;
                    })()}
                  </div>
                  <span className="bg-indigo-50 text-indigo-700 font-semibold px-3 py-1 rounded mt-1 text-base">Inscripción por equipo: ${torneo.inscripcion.toLocaleString()}</span>
                  {/* Premio principal debajo de inscripción */}
                  <div className="flex flex-col items-center mt-3">
                    <div className="bg-gradient-to-tr from-yellow-400 to-yellow-200 rounded-full w-14 h-14 flex items-center justify-center shadow-lg border-4 border-white mb-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-yellow-700" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2c.512 0 .935.386.993.883l.007.117V4h2.5a1 1 0 0 1 .993.883L16.5 5v2.5a1 1 0 0 1-.883.993L15.5 8.5h-7a1 1 0 0 1-.993-.883L7.5 7.5V5a1 1 0 0 1 .883-.993L8.5 4H11V3c0-.552.448-1 1-1zm0 2h-2.5v1.5h5V4H12zm-4 5.5h8a1 1 0 0 1 .993.883L17 10.5v7a1 1 0 0 1-.883.993L16 18.5H8a1 1 0 0 1-.993-.883L7 17.5v-7a1 1 0 0 1 .883-.993L8 8.5zm1 2v6h6v-6H9zm3 2a1 1 0 0 1 .993.883L13 13v2a1 1 0 0 1-1.993.117L11 15v-2a1 1 0 0 1 .883-.993L12 12z"/></svg>
                    </div>
                    <span className="text-xs font-bold text-yellow-700">Premio 1er Puesto</span>
                    <span className="text-lg font-extrabold text-yellow-700">${torneo.premio1.toLocaleString()}</span>
                  </div>
                  {/* Info de cancha */}
                  <div className="mt-2 text-xs text-gray-500 text-center">
                    <span className="block"><b>Cancha:</b> {torneo.cancha}</span>
                    <span className="block"><b>Tipo:</b> {torneo.tipoCancha}</span>
                    <span className="block"><b>Ciudad:</b> {torneo.ciudad}</span>
                    <span className="block"><b>Dirección:</b> {torneo.direccion}</span>
                  </div>
                </div>
                <button
                  className={`mt-3 w-full px-4 py-2 rounded-lg font-semibold shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white`}
                  onClick={() => setModalTorneo(torneo)}
                >
                  Ver detalles
                </button>
                {/* Mostrar el enlace solo si el modal NO está abierto para este torneo */}
                {!(modalTorneo && modalTorneo.id === torneo.id) && (
                  <a
                    href={`/torneo/${torneo.id}`}
                    className="mt-2 w-full flex items-center justify-center gap-2 px-4 py-2 border border-indigo-200 text-indigo-700 font-semibold rounded-lg shadow hover:bg-indigo-50 hover:text-indigo-900 transition-all duration-200 text-center"
                    style={{ textDecoration: 'none' }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                    Más información del torneo
                  </a>
                )}
              </div>
            ))
          )}
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