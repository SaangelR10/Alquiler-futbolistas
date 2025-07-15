import React, { useState } from 'react';
import PlayerMap from '../components/PlayerMap';
import PlayerCard from '../components/PlayerCard';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

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
      {/* Filtro profesional departamento/ciudad siempre visible */}
      <div className="flex flex-col md:flex-row gap-4 mb-2 items-center justify-center w-full">
        <select
          className="border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-56 md:w-60"
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
        <div className="relative w-56 md:w-60">
          <input
            type="text"
            className="border rounded-lg px-4 py-2 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
            <div className="absolute z-20 bg-white border rounded-lg shadow w-full mt-1 max-h-40 overflow-y-auto">
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
                  <label className="text-sm font-semibold text-indigo-700 mb-1">Posición</label>
                  <select
                    className="border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={filtroPosicion}
                    onChange={e => setFiltroPosicion(e.target.value)}
                  >
                    <option value="">Todas las posiciones</option>
                    {posiciones.map(pos => (
                      <option key={pos} value={pos}>{pos}</option>
                    ))}
                  </select>
                  <span className="text-xs text-gray-500 mt-1">Filtra por la posición.</span>
                </div>
                {/* Filtro de fecha del partido */}
                <div className="flex-1 flex flex-col min-w-[140px] max-w-[220px]">
                  <label className="text-sm font-semibold text-indigo-700 mb-1">Fecha del partido</label>
                  <input
                    type="date"
                    className="border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={filtroFecha}
                    onChange={e => setFiltroFecha(e.target.value)}
                  />
                  <span className="text-xs text-gray-500 mt-1">Selecciona la fecha del partido.</span>
                </div>
                {/* Filtro de precio y botón limpiar filtros siguen igual */}
                <div className="flex-1 flex flex-col min-w-[220px] max-w-[320px]">
                  <label className="text-sm font-semibold text-indigo-700 mb-1">Precio por hora (€)</label>
                  <div className="flex items-center gap-2 flex-wrap md:flex-nowrap">
                    <input
                      type="number"
                      min={0}
                      max={filtroPrecio[1]}
                      value={filtroPrecio[0]}
                      onChange={e => {
                        const val = Math.max(0, Math.min(Number(e.target.value), filtroPrecio[1]));
                        setFiltroPrecio([val, filtroPrecio[1]]);
                      }}
                      className="w-16 border rounded px-2 py-1 text-center text-indigo-700 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-400"
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
                      className="w-16 border rounded px-2 py-1 text-center text-indigo-700 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      placeholder="Máx"
                    />
                    <input
                      type="range"
                      min={0}
                      max={100000}
                      value={filtroPrecio[1]}
                      onChange={e => setFiltroPrecio([filtroPrecio[0], +e.target.value])}
                      className="accent-indigo-600 w-24"
                    />
                  </div>
                  <span className="text-xs text-gray-500 mt-1">Puedes escribir los valores o usar las barras.</span>
                </div>
                {/* Botón limpiar filtros */}
                <div className="flex items-center justify-end min-w-[140px] md:ml-8 mt-0">
                  <button
                    onClick={limpiarFiltros}
                    className={`bg-white border border-indigo-200 text-indigo-700 font-semibold w-44 py-2 rounded-lg shadow hover:bg-indigo-50 hover:border-indigo-400 transition-all duration-200 flex items-center justify-center gap-2 relative ${filtrosAplicados ? 'pl-2' : ''}`}
                    title="Limpiar todos los filtros"
                    style={{ alignSelf: 'flex-end' }}
                  >
                    <AnimatePresence>
                      {filtrosAplicados && (
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
      <div className="text-center text-indigo-700 font-medium mb-2">Elige cómo quieres ver los resultados: en tarjetas o en el mapa.</div>
      {/* Toggle de vista */}
      <div className="flex justify-center mb-8">
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
      {/* Vista seleccionada */}
      {vista === 'tarjetas' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {jugadoresFiltrados.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">No se encontraron jugadores con esos filtros.</div>
          ) : (
            jugadoresFiltrados.map(j => <PlayerCard key={j.id} jugador={j} />)
          )}
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          <PlayerMap jugadores={jugadoresFiltrados} ciudadSeleccionada={ciudadSeleccionada} />
        </div>
      )}
    </div>
  );
};

export default BuscarJugadores; 