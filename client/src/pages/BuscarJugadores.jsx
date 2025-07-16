import React, { useState } from 'react';
import PlayerMap from '../components/PlayerMap';
import PlayerCard from '../components/PlayerCard';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ModalReservaStepper from '../components/ModalReservaStepper';

// Estructura de departamentos y ciudades (muestra, escalable)
const departamentosColombia = [
  {
    nombre: 'Cundinamarca',
    ciudades: [
      { nombre: 'Bogotá', lat: 4.711, lng: -74.0721, bounds: [[4.45, -74.25], [4.85, -73.95]] },
      { nombre: 'Soacha', lat: 4.5794, lng: -74.2168, bounds: [[4.45, -74.35], [4.7, -74.1]] },
      { nombre: 'Zipaquirá', lat: 5.0221, lng: -73.9992, bounds: [[4.95, -74.1], [5.08, -73.95]] },
    ],
  },
  {
    nombre: 'Antioquia',
    ciudades: [
      { nombre: 'Medellín', lat: 6.2442, lng: -75.5812, bounds: [[6.15, -75.7], [6.35, -75.45]] },
      { nombre: 'Envigado', lat: 6.1706, lng: -75.5918, bounds: [[6.13, -75.65], [6.22, -75.54]] },
      { nombre: 'Bello', lat: 6.3389, lng: -75.5626, bounds: [[6.28, -75.62], [6.38, -75.5]] },
    ],
  },
  {
    nombre: 'Valle del Cauca',
    ciudades: [
      { nombre: 'Cali', lat: 3.4516, lng: -76.532, bounds: [[3.35, -76.6], [3.55, -76.45]] },
      { nombre: 'Palmira', lat: 3.5394, lng: -76.3036, bounds: [[3.48, -76.36], [3.6, -76.25]] },
      { nombre: 'Buenaventura', lat: 3.8801, lng: -77.0312, bounds: [[3.8, -77.1], [3.95, -76.95]] },
    ],
  },
  {
    nombre: 'Atlántico',
    ciudades: [
      { nombre: 'Barranquilla', lat: 10.9685, lng: -74.7813, bounds: [[10.85, -74.9], [11.05, -74.65]] },
      { nombre: 'Soledad', lat: 10.9184, lng: -74.7646, bounds: [[10.87, -74.82], [10.97, -74.7]] },
      { nombre: 'Malambo', lat: 10.8592, lng: -74.7739, bounds: [[10.8, -74.82], [10.9, -74.72]] },
    ],
  },
];

const jugadoresEjemplo = [
  {
    id: 1,
    nombre: 'Juan Pérez',
    posicion: 'Delantero',
    experiencia: 'Profesional',
    precio: 50,
    ubicacion: 'Bogotá',
    departamento: 'Cundinamarca',
    disponibilidadDias: ['Lunes', 'Miércoles', 'Viernes'],
    descripcion: 'Rápido, goleador y con gran visión de juego.',
    foto: 'https://randomuser.me/api/portraits/men/32.jpg',
    lat: 4.711,
    lng: -74.0721,
  },
  {
    id: 2,
    nombre: 'Carlos López',
    posicion: 'Portero',
    experiencia: 'Amateur',
    precio: 40,
    ubicacion: 'Medellín',
    departamento: 'Antioquia',
    disponibilidadDias: ['Martes', 'Jueves', 'Sábado'],
    descripcion: 'Seguro bajo palos y gran juego aéreo.',
    foto: 'https://randomuser.me/api/portraits/men/45.jpg',
    lat: 6.2442,
    lng: -75.5812,
  },
  {
    id: 3,
    nombre: 'Miguel Torres',
    posicion: 'Defensa',
    experiencia: 'Semi-profesional',
    precio: 35,
    ubicacion: 'Cali',
    departamento: 'Valle del Cauca',
    disponibilidadDias: ['Lunes', 'Jueves', 'Domingo'],
    descripcion: 'Fuerte, rápido y con gran anticipación.',
    foto: 'https://randomuser.me/api/portraits/men/52.jpg',
    lat: 3.4516,
    lng: -76.532,
  },
];

const posiciones = ['Delantero', 'Mediocampista', 'Defensa', 'Portero'];

// Utilidad para obtener el día de la semana en español
const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
function obtenerDiaSemana(fechaStr) {
  if (!fechaStr) return null;
  const fecha = new Date(fechaStr);
  return diasSemana[fecha.getDay()];
}

const BuscarJugadores = () => {
  const navigate = useNavigate();
  const [filtroDepartamento, setFiltroDepartamento] = useState('');
  const [filtroCiudad, setFiltroCiudad] = useState('');
  const [busquedaCiudad, setBusquedaCiudad] = useState('');
  const [filtroPosicion, setFiltroPosicion] = useState('');
  const [filtroFecha, setFiltroFecha] = useState('');
  const [filtroPrecio, setFiltroPrecio] = useState([0, 100000]);
  const [filtroNombre, setFiltroNombre] = useState('');
  const [showSugerencias, setShowSugerencias] = useState(false);
  const [vista, setVista] = useState('tarjetas'); // 'tarjetas' o 'mapa'
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [modalReservaAbierto, setModalReservaAbierto] = useState(false);
  const [jugadorReserva, setJugadorReserva] = useState(null);

  const abrirModalReserva = (jugador) => {
    setJugadorReserva(jugador);
    setModalReservaAbierto(true);
  };
  const cerrarModalReserva = () => {
    setModalReservaAbierto(false);
    setTimeout(() => setJugadorReserva(null), 300);
  };

  // Función para limpiar filtros
  const limpiarFiltros = () => {
    setFiltroDepartamento('');
    setFiltroCiudad('');
    setBusquedaCiudad('');
    setFiltroPosicion('');
    setFiltroFecha('');
    setFiltroPrecio([0, 100000]);
    setFiltroNombre('');
  };

  // Filtrar ciudades según departamento y búsqueda
  const ciudadesFiltradas = filtroDepartamento
    ? departamentosColombia.find(dep => dep.nombre === filtroDepartamento)?.ciudades.filter(ciudad => ciudad.nombre.toLowerCase().includes(busquedaCiudad.toLowerCase())) || []
    : [];

  // Filtrar jugadores
  const jugadoresFiltrados = jugadoresEjemplo.filter(j =>
    (!filtroNombre || j.nombre.toLowerCase().includes(filtroNombre.toLowerCase())) &&
    (!filtroDepartamento || j.departamento === filtroDepartamento) &&
    (!filtroCiudad || j.ubicacion === filtroCiudad) &&
    (!filtroPosicion || j.posicion === filtroPosicion) &&
    (!filtroFecha || (j.disponibilidadDias && j.disponibilidadDias.includes(obtenerDiaSemana(filtroFecha)))) &&
    (j.precio >= filtroPrecio[0] && j.precio <= filtroPrecio[1])
  );

  // Obtener ciudad seleccionada para centrar/limitar el mapa
  const ciudadSeleccionada = ciudadesFiltradas.find(c => c.nombre === filtroCiudad);

  // Determinar si hay filtros aplicados
  const filtrosAplicados =
    filtroNombre || filtroDepartamento || filtroCiudad || busquedaCiudad || filtroPosicion || filtroFecha || filtroPrecio[0] !== 0 || filtroPrecio[1] !== 100000;

  // Sugerencias de nombres de jugadores
  const sugerenciasNombres = filtroNombre
    ? jugadoresEjemplo
        .map(j => j.nombre)
        .filter(nombre => nombre.toLowerCase().includes(filtroNombre.toLowerCase()))
        .slice(0, 6)
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-24">
      <button onClick={() => navigate('/buscar')} className="mb-8 self-start bg-white border border-indigo-200 text-indigo-700 font-bold px-6 py-2 rounded-xl shadow hover:bg-indigo-50 hover:border-indigo-400 transition flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        Volver
      </button>
      <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">Buscar jugadores</h1>
      {/* Panel de filtros premium y ordenado */}
      <div className="w-full flex justify-center mb-8">
        <div className="backdrop-blur-xl bg-white/70 border border-indigo-100 shadow-2xl rounded-3xl px-6 py-8 flex flex-col gap-6 items-center w-full max-w-4xl relative">
          <div className="w-full flex flex-col md:flex-row gap-4 md:gap-8 items-center justify-center">
            {/* Departamento */}
            <div className="flex flex-col items-center w-full md:w-56">
              <label className="text-xs font-bold text-indigo-700 mb-1 flex items-center gap-1"><svg className='w-4 h-4 text-indigo-400' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'><path d='M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10C22 6.48 17.52 2 12 2z' /><circle cx='12' cy='12' r='5' /></svg> Departamento</label>
              <select
                className="rounded-xl border border-indigo-200 px-4 py-2 text-indigo-700 bg-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full shadow-sm"
                value={filtroDepartamento}
                onChange={e => {
                  setFiltroDepartamento(e.target.value);
                  setFiltroCiudad('');
                  setBusquedaCiudad('');
                }}
              >
                <option value="">Selecciona un departamento</option>
                {departamentosColombia.map(dep => (
                  <option key={dep.nombre} value={dep.nombre}>{dep.nombre}</option>
                ))}
              </select>
            </div>
            {/* Ciudad */}
            <div className="flex flex-col items-center w-full md:w-56 relative">
              <label className="text-xs font-bold text-indigo-700 mb-1 flex items-center gap-1"><svg className='w-4 h-4 text-indigo-400' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'><path d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z' /><circle cx='12' cy='9' r='2.5' /></svg> Ciudad</label>
              <input
                type="text"
                className="rounded-xl border border-indigo-200 px-4 py-2 w-full text-indigo-700 bg-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
                placeholder={filtroCiudad ? filtroCiudad : "Buscar ciudad..."}
                value={busquedaCiudad}
                onChange={e => setBusquedaCiudad(e.target.value)}
                disabled={!filtroDepartamento}
                style={filtroCiudad ? { fontWeight: 'bold', color: '#3730a3', background: '#eef2ff' } : {}}
              />
              <select
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                value={filtroCiudad}
                onChange={e => {
                  setFiltroCiudad(e.target.value);
                  setBusquedaCiudad('');
                }}
                disabled={!filtroDepartamento}
              >
                <option value="">Selecciona una ciudad</option>
                {ciudadesFiltradas.map(ciudad => (
                  <option key={ciudad.nombre} value={ciudad.nombre}>{ciudad.nombre}</option>
                ))}
              </select>
              {/* Lista visible de ciudades filtradas */}
              {filtroDepartamento && busquedaCiudad && (
                <div className="absolute z-20 bg-white border rounded-xl shadow w-full mt-1 max-h-40 overflow-y-auto">
                  {ciudadesFiltradas.length === 0 ? (
                    <div className="px-4 py-2 text-gray-400">No hay ciudades</div>
                  ) : (
                    ciudadesFiltradas.map(ciudad => (
                      <div
                        key={ciudad.nombre}
                        className={`px-4 py-2 hover:bg-indigo-50 cursor-pointer ${filtroCiudad === ciudad.nombre ? 'bg-indigo-100 font-bold' : ''}`}
                        onClick={() => {
                          setFiltroCiudad(ciudad.nombre);
                          setBusquedaCiudad('');
                        }}
                      >
                        {ciudad.nombre}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
            {/* Nombre */}
            <div className="flex flex-col items-center w-full md:w-48 relative">
              <label className="text-xs font-bold text-indigo-700 mb-1 flex items-center gap-1"><svg className='w-4 h-4 text-indigo-400' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' /></svg> Nombre</label>
              <input
                type="text"
                className="rounded-xl border border-indigo-200 px-4 py-2 w-full text-indigo-700 bg-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
                placeholder="Buscar por nombre..."
                value={filtroNombre}
                onChange={e => {
                  setFiltroNombre(e.target.value);
                  setShowSugerencias(true);
                }}
                onFocus={() => setShowSugerencias(true)}
                onBlur={() => setTimeout(() => setShowSugerencias(false), 120)}
                autoComplete="off"
              />
              {/* Dropdown de sugerencias */}
              {showSugerencias && sugerenciasNombres.length > 0 && (
                <div className="absolute left-0 top-full z-30 bg-white border border-indigo-100 rounded-xl shadow w-full mt-1 max-h-40 overflow-y-auto animate-fade-in" style={{minWidth: '100%'}}>
                  {sugerenciasNombres.map(nombre => (
                    <div
                      key={nombre}
                      className="px-4 py-2 hover:bg-indigo-50 cursor-pointer text-indigo-700"
                      onMouseDown={() => {
                        setFiltroNombre(nombre);
                        setShowSugerencias(false);
                      }}
                    >
                      {nombre}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* Filtros avanzados */}
          <AnimatePresence initial={false}>
            {mostrarFiltros && (
              <motion.div
                key="filtros-avanzados"
                initial={{ opacity: 0, y: -16, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -16, height: 0 }}
                transition={{ duration: 0.32, ease: 'easeInOut' }}
                className="w-full flex flex-col md:flex-row gap-4 md:gap-8 items-center justify-center mt-2 overflow-hidden"
              >
                {/* Posición */}
                <div className="flex flex-col items-center w-full md:w-48">
                  <label className="text-xs font-bold text-indigo-700 mb-1 flex items-center gap-1"><svg className='w-4 h-4 text-indigo-400' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'><path d='M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm-1-13h2v6h-2zm0 8h2v2h-2z' /></svg> Posición</label>
                  <select
                    className="rounded-xl border border-indigo-200 px-4 py-2 text-indigo-700 bg-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full shadow-sm"
                    value={filtroPosicion}
                    onChange={e => setFiltroPosicion(e.target.value)}
                  >
                    <option value="">Todas las posiciones</option>
                    {posiciones.map(pos => (
                      <option key={pos} value={pos}>{pos}</option>
                    ))}
                  </select>
                </div>
                {/* Fecha */}
                <div className="flex flex-col items-center w-full md:w-48">
                  <label className="text-xs font-bold text-indigo-700 mb-1 flex items-center gap-1"><svg className='w-4 h-4 text-indigo-400' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'><path d='M7 10V6a5 5 0 0110 0v4M5 20h14a2 2 0 002-2V10a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' /></svg> Fecha</label>
                  <input
                    type="date"
                    className="rounded-xl border border-indigo-200 px-4 py-2 w-full text-indigo-700 bg-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
                    value={filtroFecha}
                    onChange={e => setFiltroFecha(e.target.value)}
                  />
                </div>
                {/* Precio */}
                <div className="flex flex-col items-center w-full md:w-48">
                  <label className="text-xs font-bold text-indigo-700 mb-1 flex items-center gap-1"><svg className='w-4 h-4 text-indigo-400' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'><path d='M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' /></svg> Precio (€)</label>
                  <div className="flex items-center gap-2 w-full">
                    <input
                      type="number"
                      min={0}
                      max={filtroPrecio[1]}
                      value={filtroPrecio[0]}
                      onChange={e => {
                        const val = Math.max(0, Math.min(Number(e.target.value), filtroPrecio[1]));
                        setFiltroPrecio([val, filtroPrecio[1]]);
                      }}
                      className="w-16 border rounded px-2 py-1 text-center text-indigo-700 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white/80 shadow-sm"
                      placeholder="Mín"
                    />
                    <input
                      type="range"
                      min={0}
                      max={100000}
                      value={filtroPrecio[0]}
                      onChange={e => setFiltroPrecio([+e.target.value, filtroPrecio[1]])}
                      className="accent-indigo-600 w-24"
                    />
                    <span className="text-gray-600">-</span>
                    <input
                      type="number"
                      min={filtroPrecio[0]}
                      max={100000}
                      value={filtroPrecio[1]}
                      onChange={e => {
                        const val = Math.max(filtroPrecio[0], Math.min(Number(e.target.value), 100000));
                        setFiltroPrecio([filtroPrecio[0], val]);
                      }}
                      className="w-16 border rounded px-2 py-1 text-center text-indigo-700 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white/80 shadow-sm"
                      placeholder="Máx"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {/* Botones de acción */}
          <div className="w-full flex flex-col md:flex-row gap-4 items-center justify-between mt-4">
            <div className="flex gap-2 w-full md:w-auto justify-center md:justify-start">
              <button
                className="flex items-center gap-2 px-6 py-2 rounded-xl font-semibold bg-gradient-to-r from-indigo-500 to-blue-400 text-white shadow-lg hover:from-indigo-600 hover:to-blue-500 transition-all duration-200"
                onClick={() => setMostrarFiltros(v => !v)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 5h18M6 10h12M9 15h6" /></svg>
                {mostrarFiltros ? 'Ocultar filtros' : 'Más filtros'}
              </button>
              <button
                className="flex items-center gap-2 px-6 py-2 rounded-xl font-semibold bg-white border border-indigo-200 text-indigo-700 shadow hover:bg-indigo-50 hover:border-indigo-400 transition"
                onClick={limpiarFiltros}
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
            {/* Toggle tarjetas/mapa */}
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
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 20l-5.447-2.724A2 2 0 013 15.382V6.618a2 2 0 011.553-1.894l5.447-1.724a2 2 0 011.262 0l5.447 1.724A2 2 0 0121 6.618v8.764a2 2 0 01-1.553 1.894L14 20a2 2 0 01-1.262 0z" /></svg>
                  Mapa
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Vista seleccionada */}
      {vista === 'tarjetas' ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {jugadoresFiltrados.length === 0 ? (
              <div className="col-span-full text-center text-gray-500">No se encontraron jugadores con esos filtros.</div>
            ) : (
              jugadoresFiltrados.map(j => <PlayerCard key={j.id} jugador={j} onReservar={abrirModalReserva} />)
            )}
          </div>
          {/* Modal de reserva global */}
          <ModalReservaStepper
            jugador={jugadorReserva}
            abierto={modalReservaAbierto}
            onClose={cerrarModalReserva}
            volverAtras={cerrarModalReserva}
          />
        </>
      ) : (
        <div className="max-w-4xl mx-auto">
          <PlayerMap jugadores={jugadoresFiltrados} ciudadSeleccionada={ciudadSeleccionada} />
        </div>
      )}
    </div>
  );
};

export default BuscarJugadores; 