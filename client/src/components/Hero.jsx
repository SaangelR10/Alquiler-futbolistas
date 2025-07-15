import React from 'react';

const Hero = () => {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-indigo-700 via-blue-600 to-sky-400 overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/60 via-indigo-200/40 to-transparent pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center text-center px-4 py-16">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-4 animate-fade-in">
          ¡Encuentra futbolistas para tu equipo!
        </h1>
        <p className="text-lg md:text-2xl text-white/90 mb-8 max-w-2xl animate-fade-in delay-100">
          Reserva jugadores profesionales y amateurs en tu ciudad de forma fácil, segura y rápida.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in delay-200">
          <button className="bg-white text-indigo-700 font-bold px-8 py-3 rounded-lg shadow-lg hover:bg-indigo-50 hover:scale-105 transition transform duration-200">
            Buscar jugadores
          </button>
          <button className="bg-indigo-700 text-white font-bold px-8 py-3 rounded-lg shadow-lg border-2 border-white hover:bg-white hover:text-indigo-700 hover:scale-105 transition transform duration-200">
            ¿Cómo funciona?
          </button>
        </div>
      </div>
      {/* Elemento visual decorativo */}
      <svg className="absolute bottom-0 left-0 w-full h-32 text-white opacity-60" viewBox="0 0 1440 320"><path fill="currentColor" fillOpacity="1" d="M0,224L48,197.3C96,171,192,117,288,117.3C384,117,480,171,576,197.3C672,224,768,224,864,197.3C960,171,1056,117,1152,122.7C1248,128,1344,192,1392,224L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
    </section>
  );
};

export default Hero; 