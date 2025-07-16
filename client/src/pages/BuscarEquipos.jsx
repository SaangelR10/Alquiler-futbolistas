import React from 'react';
import { useNavigate } from 'react-router-dom';

const equiposEjemplo = [
  {
    id: 1,
    nombre: 'Atlético Bogotá',
    ciudad: 'Bogotá',
    descripcion: 'Equipo competitivo con enfoque en fútbol 7. Buscamos portero y delantero.',
    logo: 'https://cdn-icons-png.flaticon.com/512/616/616494.png',
    integrantes: [
      { nombre: 'Carlos', rol: 'Técnico' },
      { nombre: 'Luis', rol: 'Defensa' },
      { nombre: 'Andrés', rol: 'Delantero' },
    ],
    redes: [
      { tipo: 'instagram', usuario: 'atleticobogota' },
      { tipo: 'facebook', usuario: 'atleticobogota' },
    ],
  },
  {
    id: 2,
    nombre: 'Fútbol Club Medellín',
    ciudad: 'Medellín',
    descripcion: 'Equipo recreativo, entrenamos los sábados. ¡Únete!',
    logo: 'https://cdn-icons-png.flaticon.com/512/616/616494.png',
    integrantes: [
      { nombre: 'Juan', rol: 'Portero' },
      { nombre: 'Pedro', rol: 'Central' },
    ],
    redes: [
      { tipo: 'instagram', usuario: 'fcmedellin' },
    ],
  },
];

const BuscarEquipos = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-indigo-100 via-blue-50 to-sky-100">
      <div className="w-full max-w-5xl mx-auto px-4 pt-28 pb-12 flex-1 flex flex-col">
        <button onClick={() => navigate('/buscar')} className="mb-8 self-start bg-white border border-indigo-200 text-indigo-700 font-bold px-6 py-2 rounded-xl shadow hover:bg-indigo-50 hover:border-indigo-400 transition flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          Volver
        </button>
        <h2 className="text-3xl font-extrabold text-indigo-700 mb-10 text-center drop-shadow-lg">Buscar equipos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 flex-1">
          {equiposEjemplo.map(equipo => (
            <div key={equipo.id} className="bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center border-2 border-indigo-100 hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.03] transition-all duration-300 group">
              <img src={equipo.logo} alt={equipo.nombre} className="w-24 h-24 rounded-full object-cover border-4 border-indigo-200 mb-4 shadow-lg group-hover:scale-110 transition-transform" />
              <div className="text-2xl font-bold text-indigo-700 mb-1 text-center">{equipo.nombre}</div>
              <div className="text-indigo-500 font-semibold mb-2 text-center">{equipo.ciudad}</div>
              <div className="text-gray-700 text-center mb-4">{equipo.descripcion}</div>
              <div className="flex flex-wrap gap-2 mb-3 justify-center">
                {equipo.integrantes.map((int, idx) => (
                  <span key={idx} className="bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">{int.nombre} <span className="font-normal">({int.rol})</span></span>
                ))}
              </div>
              <div className="flex gap-3 mb-4">
                {equipo.redes.map((r, idx) => (
                  <a key={idx} href={`https://${r.tipo === 'instagram' ? 'instagram.com/' : r.tipo === 'facebook' ? 'facebook.com/' : ''}${r.usuario}`} target="_blank" rel="noopener noreferrer" className="text-2xl hover:scale-110 transition-transform">
                    {r.tipo === 'instagram' && <svg className="w-6 h-6 text-pink-500" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 2.75a5.75 5.75 0 1 1 0 11.5a5.75 5.75 0 0 1 0-11.5zm0 1.5a4.25 4.25 0 1 0 0 8.5a4.25 4.25 0 0 0 0-8.5zm5.25 1.25a1 1 0 1 1 0 2a1 1 0 0 1 0-2z"/></svg>}
                    {r.tipo === 'facebook' && <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M17 2.1A5 5 0 0 1 22 7v10a5 5 0 0 1-5 4.9H7A5 5 0 0 1 2 17V7a5 5 0 0 1 5-4.9h10zm-2.5 4.4h-1.5c-.3 0-.5.2-.5.5v1.5h2l-.3 2h-1.7v5h-2v-5H8v-2h1.5V7.5A2.5 2.5 0 0 1 12 5h2.5v1.5z"/></svg>}
                  </a>
                ))}
              </div>
              <button className="mt-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-2 rounded-xl shadow transition-all">Ver más</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuscarEquipos; 