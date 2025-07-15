import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Datos de ejemplo (en el futuro vendrán del backend)
const torneoEjemplo = {
  id: 101,
  nombre: 'Torneo Relámpago Fútbol 5',
  fechas: '10-15 Junio 2024',
  tipo: 'Eliminatoria',
  estado: 'En curso',
  inscripcion: 200000,
  premios: [
    { puesto: 1, valor: 1000000 },
    { puesto: 2, valor: 500000 },
    { puesto: 3, valor: 200000 },
  ],
  reglas: [
    'Máximo 12 equipos.',
    'Partidos de 2 tiempos de 25 minutos.',
    'Uniforme obligatorio.',
    'Respeto y juego limpio.',
  ],
  contacto: {
    email: 'info@cancha.com',
    telefono: '+57 300 123 4567',
  },
  cancha: {
    nombre: 'Cancha Sintética El Golazo',
    tipo: 'Sintética',
    ciudad: 'Bogotá',
    direccion: 'Cra 45 #123-45',
  },
  equipos: [
    { id: 1, nombre: 'Tiburones', logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=Tiburones', ciudad: 'Bogotá', capitan: 'Juan Pérez', estado: 'Activo' },
    { id: 2, nombre: 'Leones', logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=Leones', ciudad: 'Bogotá', capitan: 'Carlos López', estado: 'Activo' },
    { id: 3, nombre: 'Águilas', logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=Aguilas', ciudad: 'Medellín', capitan: 'Miguel Torres', estado: 'Eliminado' },
    { id: 4, nombre: 'Panteras', logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=Panteras', ciudad: 'Cali', capitan: 'Luis Gómez', estado: 'Activo' },
  ],
  tabla: [
    { equipo: 'Tiburones', pts: 9, pj: 3, pg: 3, pe: 0, pp: 0, gf: 8, gc: 2 },
    { equipo: 'Leones', pts: 6, pj: 3, pg: 2, pe: 0, pp: 1, gf: 6, gc: 4 },
    { equipo: 'Panteras', pts: 3, pj: 3, pg: 1, pe: 0, pp: 2, gf: 4, gc: 7 },
    { equipo: 'Águilas', pts: 0, pj: 3, pg: 0, pe: 0, pp: 3, gf: 2, gc: 7 },
  ],
  fases: [
    {
      nombre: 'Semifinales',
      partidos: [
        { id: 1, equipoA: 'Tiburones', equipoB: 'Panteras', logoA: 'https://api.dicebear.com/7.x/identicon/svg?seed=Tiburones', logoB: 'https://api.dicebear.com/7.x/identicon/svg?seed=Panteras', marcador: '3-1', estado: 'Finalizado', fecha: '13 Junio' },
        { id: 2, equipoA: 'Leones', equipoB: 'Águilas', logoA: 'https://api.dicebear.com/7.x/identicon/svg?seed=Leones', logoB: 'https://api.dicebear.com/7.x/identicon/svg?seed=Aguilas', marcador: '2-0', estado: 'Finalizado', fecha: '13 Junio' },
      ],
    },
    {
      nombre: 'Final',
      partidos: [
        { id: 3, equipoA: 'Tiburones', equipoB: 'Leones', logoA: 'https://api.dicebear.com/7.x/identicon/svg?seed=Tiburones', logoB: 'https://api.dicebear.com/7.x/identicon/svg?seed=Leones', marcador: '2-1', estado: 'Finalizado', fecha: '15 Junio' },
      ],
    },
  ],
  equiposInscritos: 8, // Nuevo campo para el número de equipos inscritos
  maxEquipos: 10, // Nuevo campo para el máximo de equipos permitidos
};

const tabs = [
  { key: 'info', label: 'Información' },
  { key: 'equipos', label: 'Equipos' },
  { key: 'tabla', label: 'Clasificación' },
  { key: 'fases', label: 'Fases' },
];

function Bracket({ fases }) {
  return (
    <div className="overflow-x-auto py-6">
      <div className="flex gap-12 min-w-[600px] justify-center">
        {fases.map((fase, i) => (
          <div key={fase.nombre} className="flex flex-col items-center">
            <div className="text-lg font-bold text-indigo-700 mb-4">{fase.nombre}</div>
            <div className="flex flex-col gap-8">
              {fase.partidos.map(partido => (
                <motion.div key={partido.id} whileHover={{ scale: 1.04 }} className="bg-white border border-indigo-100 rounded-xl shadow p-4 min-w-[220px] flex flex-col items-center transition">
                  <div className="flex items-center gap-3 mb-2">
                    <img src={partido.logoA} alt={partido.equipoA} className="w-10 h-10 rounded-full border-2 border-indigo-200" />
                    <span className="font-bold text-indigo-700">{partido.equipoA}</span>
                    <span className="text-xl font-extrabold text-indigo-700">{partido.marcador}</span>
                    <span className="font-bold text-indigo-700">{partido.equipoB}</span>
                    <img src={partido.logoB} alt={partido.equipoB} className="w-10 h-10 rounded-full border-2 border-indigo-200" />
                  </div>
                  <div className="flex gap-2 text-xs mb-1">
                    <span className={`px-2 py-1 rounded-full font-bold ${partido.estado === 'Finalizado' ? 'bg-green-100 text-green-700' : partido.estado === 'En curso' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>{partido.estado}</span>
                    <span className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full">{partido.fecha}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const TorneoDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState('info');
  const torneo = torneoEjemplo; // En el futuro: buscar por id

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 mt-24">
      <button onClick={() => navigate(-1)} className="mb-6 text-indigo-600 hover:underline font-semibold">← Volver a torneos</button>
      <div className="flex flex-col md:flex-row md:items-center md:gap-8 gap-4 mb-8">
        <img src={torneo.equipos[0].logo} alt={torneo.nombre} className="w-28 h-28 rounded-2xl object-cover border-4 border-indigo-200 shadow mb-2" />
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-700 mb-2">{torneo.nombre}</h1>
          <div className="text-lg text-gray-600 mb-1">{torneo.fechas} • {torneo.tipo}</div>
          <div className="flex gap-2 mb-2">
            <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-full text-xs shadow-sm border border-blue-200">{torneo.estado}</span>
            <span className="inline-flex items-center gap-1 bg-indigo-100 text-indigo-700 font-bold px-3 py-1 rounded-full text-xs shadow-sm border border-indigo-200">Inscripción: ${torneo.inscripcion.toLocaleString()}</span>
          </div>
          <div className="flex gap-2 mt-2">
            {torneo.premios.map(p => (
              <span key={p.puesto} className={`inline-flex items-center gap-1 px-3 py-1 rounded-full font-bold text-sm ${p.puesto===1?'bg-yellow-100 text-yellow-800':p.puesto===2?'bg-gray-100 text-gray-700':'bg-orange-100 text-orange-800'}`}>{p.puesto===1?'🥇':p.puesto===2?'🥈':'🥉'} {p.puesto}°: ${p.valor.toLocaleString()}</span>
            ))}
          </div>
          {/* Botón de inscripción al torneo */}
          <button
            className={`mt-6 w-full md:w-auto px-6 py-3 rounded-lg font-bold shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 text-lg
              ${torneo.estado === 'Abierto' ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-300'}`}
            onClick={torneo.estado === 'Abierto' ? () => {/* Aquí irá el flujo real de inscripción */} : undefined}
            disabled={torneo.estado !== 'Abierto'}
          >
            {torneo.estado === 'Abierto' ? 'Inscribirse al torneo' : 'Inscripción no disponible'}
          </button>
        </div>
      </div>
      {/* Justo debajo de la información principal (después de los premios): */}
      <div className="mt-3 flex items-center gap-2">
        <span className={`font-bold text-sm px-3 py-1 rounded-full border shadow-sm
          ${torneo.equiposInscritos === torneo.maxEquipos ? 'bg-red-100 text-red-700 border-red-200' : 'bg-green-50 text-green-700 border-green-200'}`}
        >
          Equipos: {torneo.equiposInscritos}/{torneo.maxEquipos}
        </span>
        {torneo.equiposInscritos === torneo.maxEquipos && (
          <span className="ml-2 text-xs font-bold bg-red-200 text-red-800 px-2 py-1 rounded-full">¡Cupo lleno!</span>
        )}
      </div>
      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b pb-2">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} className={`font-semibold pb-1 px-4 transition ${tab===t.key ? 'border-b-2 border-indigo-600 text-indigo-700' : 'text-gray-500 hover:text-indigo-700'}`}>{t.label}</button>
        ))}
      </div>
      {/* Contenido de tabs */}
      {tab === 'info' && (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-indigo-50 rounded-xl p-6">
            <h2 className="text-lg font-bold text-indigo-700 mb-2">Información general</h2>
            <div className="mb-2"><b>Cancha:</b> {torneo.cancha.nombre}</div>
            <div className="mb-2"><b>Tipo:</b> {torneo.cancha.tipo}</div>
            <div className="mb-2"><b>Ciudad:</b> {torneo.cancha.ciudad}</div>
            <div className="mb-2"><b>Dirección:</b> {torneo.cancha.direccion}</div>
            <div className="mb-2"><b>Reglas:</b>
              <ul className="list-disc pl-6 text-sm text-gray-700 mt-1">
                {torneo.reglas.map((r,i) => <li key={i}>{r}</li>)}
              </ul>
            </div>
          </div>
          <div className="bg-white border border-indigo-100 rounded-xl p-6">
            <h2 className="text-lg font-bold text-indigo-700 mb-2">Contacto</h2>
            <div className="mb-1"><b>Email:</b> {torneo.contacto.email}</div>
            <div className="mb-1"><b>Teléfono:</b> {torneo.contacto.telefono}</div>
          </div>
        </div>
      )}
      {tab === 'equipos' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {torneo.equipos.map(eq => (
            <div key={eq.id} className={`flex flex-col items-center bg-white border rounded-xl shadow p-4 gap-2 ${eq.estado==='Eliminado'?'opacity-60':''}`}>
              <img src={eq.logo} alt={eq.nombre} className="w-16 h-16 rounded-full border-2 border-indigo-200" />
              <div className="font-bold text-indigo-700 text-lg">{eq.nombre}</div>
              <div className="text-gray-500 text-sm">{eq.ciudad}</div>
              <div className="text-xs text-gray-500">Capitán: {eq.capitan}</div>
              <span className={`mt-1 px-2 py-1 rounded-full text-xs font-bold ${eq.estado==='Activo'?'bg-green-100 text-green-700':'bg-gray-200 text-gray-500'}`}>{eq.estado}</span>
            </div>
          ))}
        </div>
      )}
      {tab === 'tabla' && (
        <div className="overflow-x-auto">
          <table className="min-w-[600px] w-full bg-white rounded-xl shadow border border-indigo-100">
            <thead>
              <tr className="bg-indigo-50 text-indigo-700 text-sm">
                <th className="py-2 px-3">Pos</th>
                <th className="py-2 px-3 text-left">Equipo</th>
                <th className="py-2 px-3">Pts</th>
                <th className="py-2 px-3">PJ</th>
                <th className="py-2 px-3">PG</th>
                <th className="py-2 px-3">PE</th>
                <th className="py-2 px-3">PP</th>
                <th className="py-2 px-3">GF</th>
                <th className="py-2 px-3">GC</th>
              </tr>
            </thead>
            <tbody>
              {torneo.tabla.map((row, i) => (
                <tr key={row.equipo} className="text-center border-b last:border-b-0">
                  <td className="py-2 px-3 font-bold text-indigo-700">{i+1}</td>
                  <td className="py-2 px-3 text-left font-semibold text-gray-700 flex items-center gap-2"><img src={torneo.equipos.find(e=>e.nombre===row.equipo)?.logo} alt={row.equipo} className="w-6 h-6 rounded-full border" />{row.equipo}</td>
                  <td className="py-2 px-3">{row.pts}</td>
                  <td className="py-2 px-3">{row.pj}</td>
                  <td className="py-2 px-3">{row.pg}</td>
                  <td className="py-2 px-3">{row.pe}</td>
                  <td className="py-2 px-3">{row.pp}</td>
                  <td className="py-2 px-3">{row.gf}</td>
                  <td className="py-2 px-3">{row.gc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {tab === 'fases' && (
        <Bracket fases={torneo.fases} />
      )}
    </div>
  );
};

export default TorneoDetalle; 