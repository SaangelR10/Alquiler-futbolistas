import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import Wavify from 'react-wavify';
import Lottie from 'lottie-react';
import footballTeamPlayers from '../assets/lottie/football-team-players.json';

const Hero = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [animateCreaEquipo, setAnimateCreaEquipo] = useState(true);

  useEffect(() => {
    if (animateCreaEquipo) {
      const timer = setTimeout(() => setAnimateCreaEquipo(false), 700);
      return () => clearTimeout(timer);
    }
  }, [animateCreaEquipo]);

  const handleBuscar = () => {
    navigate('/buscar');
  };
  const handleComoFunciona = () => {
    navigate('/como-funciona');
  };
  const handleCreaEquipo = () => {
    navigate('/crear-equipo');
  };
  const handleFuncionalidades = () => {
    const section = document.getElementById('funcionalidades');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) return <Loader />;

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen pb-8 overflow-hidden">
      {/* Fondo de gradiente animado */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-700 via-blue-600 to-sky-400 opacity-90 animate-gradient-move" />
        {/* Fondo azul debajo de la ola */}
        <div className="absolute left-0 right-0 bottom-0 w-full h-32 md:h-40 bg-[#2563eb] z-0" style={{ pointerEvents: 'none' }} />
        <style>{`
          @keyframes gradient-move {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient-move {
            background-size: 200% 200%;
            animation: gradient-move 10s ease-in-out infinite;
          }
          @keyframes wave-move {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .wave-anim {
            animation: wave-move 8s linear infinite;
          }
          @keyframes bounce-once {
            0% { transform: scale(1); }
            20% { transform: scale(1.12) translateY(-10px); }
            40% { transform: scale(0.98) translateY(0); }
            60% { transform: scale(1.06) translateY(-6px); }
            80% { transform: scale(0.98) translateY(0); }
            100% { transform: scale(1); }
          }
          .animate-bounce-once {
            animation: bounce-once 1.1s cubic-bezier(.36,1.7,.45,.84) 1;
          }
        `}</style>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-4 py-10 md:py-16">
        <div className="flex justify-center items-center w-full mb-4 md:mb-8">
          <Lottie animationData={footballTeamPlayers} loop={true} autoplay={true} speed={0.35} style={{ width: 340, height: 340, maxWidth: 420 }} rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }} />
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-4 animate-fade-in text-center">
          ¡Encuentra futbolistas para tu equipo!
        </h1>
        <p className="text-base md:text-xl text-white/90 mb-7 max-w-2xl animate-fade-in delay-100 text-center">
          Reserva jugadores profesionales y amateurs en tu ciudad de forma fácil, segura y rápida.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in delay-200 w-full max-w-md mx-auto">
          <button
            className="bg-white text-indigo-700 font-bold px-7 py-1.5 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 hover:scale-105 hover:bg-indigo-50 transition-all duration-200 text-sm md:text-base tracking-wide border border-indigo-100 hover:border-indigo-300 min-w-[140px] focus:outline-none focus:ring-2 focus:ring-indigo-300"
            onClick={handleFuncionalidades}
          >
            ¿Qué puedes hacer aquí?
          </button>
          <button
            className="bg-emerald-600 text-white font-bold px-7 py-1.5 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 hover:scale-105 hover:bg-emerald-700 transition-all duration-200 text-sm md:text-base tracking-wide border border-emerald-200 hover:border-emerald-400 min-w-[140px] focus:outline-none focus:ring-2 focus:ring-emerald-300"
            onClick={handleCreaEquipo}
          >
            ¡Crea tu equipo!
          </button>
          <button
            className="bg-indigo-700 text-white font-bold px-7 py-1.5 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 hover:scale-105 hover:bg-indigo-800 transition-all duration-200 text-sm md:text-base tracking-wide border border-indigo-800 hover:border-indigo-900 min-w-[140px] focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onClick={handleComoFunciona}
          >
            ¿Cómo funciona?
          </button>
        </div>
      </div>
      {/* Ola SVG animada en la mitad inferior */}
      <div className="absolute left-0 right-0 mx-auto w-full max-w-none" style={{ bottom: '18%' }}>
        <svg className="w-[200%] h-24 md:h-32 wave-anim" viewBox="0 0 2880 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,60 Q360,120 720,60 T1440,60 T2160,60 T2880,60 V120 H0Z" fill="#2563eb" />
        </svg>
      </div>
    </section>
  );
};

export default Hero; 