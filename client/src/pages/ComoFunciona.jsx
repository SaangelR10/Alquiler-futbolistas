import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
// Importar animaciones Lottie para cada paso (luego se completarán los paths)
import step1 from '../assets/lottie/como-funciona/step1.json';
import step2 from '../assets/lottie/como-funciona/step2.json';
import step3 from '../assets/lottie/como-funciona/step3.json';
import step4 from '../assets/lottie/como-funciona/step4.json';
import step5 from '../assets/lottie/como-funciona/step5.json';
import step6 from '../assets/lottie/como-funciona/step6.json';

const pasos = [
  {
    titulo: 'Regístrate gratis',
    descripcion: 'Crea tu cuenta como jugador o equipo en menos de 2 minutos. Elige tu rol y completa tus datos básicos.',
    icono: 'https://cdn-icons-png.flaticon.com/512/747/747376.png',
  },
  {
    titulo: 'Verifica tu identidad',
    descripcion: 'Sube una foto y un video corto para validar tu identidad y aumentar la confianza en la plataforma.',
    icono: 'https://cdn-icons-png.flaticon.com/512/747/747545.png',
  },
  {
    titulo: 'Crea tu perfil',
    descripcion: 'Completa tu perfil como jugador (posición, experiencia, precio, disponibilidad) o como equipo (necesidades, ciudad, logo).',
    icono: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
  },
  {
    titulo: 'Busca y filtra',
    descripcion: 'Utiliza el buscador avanzado para encontrar jugadores o equipos por ubicación, posición, precio y disponibilidad.',
    icono: 'https://cdn-icons-png.flaticon.com/512/751/751381.png',
  },
  {
    titulo: 'Reserva y paga seguro',
    descripcion: 'Reserva jugadores o postúlate a equipos. Realiza pagos seguros con Stripe y recibe notificaciones en tiempo real.',
    icono: 'https://cdn-icons-png.flaticon.com/512/1256/1256650.png',
  },
  {
    titulo: 'Califica y deja tu reseña',
    descripcion: 'Después del partido, califica la experiencia y deja una reseña para ayudar a otros usuarios.',
    icono: 'https://cdn-icons-png.flaticon.com/512/616/616489.png',
  },
];

const lotties = [step1, step2, step3, step4, step5, step6];

const variants = {
  enter: direction => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    position: 'absolute',
  }),
  center: {
    x: 0,
    opacity: 1,
    position: 'relative',
    transition: { duration: 0.5, type: 'spring', bounce: 0.2 },
  },
  exit: direction => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    position: 'absolute',
    transition: { duration: 0.4 }
  })
};

const iconVariants = {
  initial: { scale: 0.95, opacity: 0.7 },
  active: { scale: 1.15, opacity: 1, transition: { type: 'spring', stiffness: 200, damping: 18 } },
  hover: { scale: 1.22, transition: { type: 'spring', stiffness: 300 } },
};

const floatVariants = {
  animate: {
    y: [0, -10, 0, 10, 0],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  },
};

const BLOCK_HEIGHT = 200; // px
const ICON_SIZE = 90; // px

const ComoFunciona = () => {
  const [[step, direction], setStep] = useState([0, 0]);
  const total = pasos.length;
  const containerRef = useRef();
  const [animateCreaEquipo, setAnimateCreaEquipo] = useState(true);

  useEffect(() => {
    if (animateCreaEquipo) {
      const timer = setTimeout(() => setAnimateCreaEquipo(false), 1100);
      return () => clearTimeout(timer);
    }
  }, [animateCreaEquipo]);

  const paginate = dir => {
    setStep(([prev, _]) => {
      let next = prev + dir;
      if (next < 0) next = total - 1;
      if (next >= total) next = 0;
      return [next, dir];
    });
  };

  // Swipe/drag handler
  const handleDragEnd = (e, info) => {
    if (info.offset.x < -80) paginate(1);
    else if (info.offset.x > 80) paginate(-1);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-x-hidden" style={{ background: 'linear-gradient(to bottom, #b3d8fd 0%, #60a5fa 60%, #38bdf8 100%)' }}>
      {/* Fondo de césped animado en la mitad inferior */}
      <div className="absolute left-0 right-0 bottom-0 w-full h-1/2 z-0 pointer-events-none overflow-hidden">
        <div className="relative w-[200%] h-full" style={{ minWidth: '200%' }}>
          <svg className="absolute left-0 top-0 h-full w-1/2 grass-svg animate-move-grass" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <defs>
              <linearGradient id="grassGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4ade80" />
                <stop offset="100%" stopColor="#166534" />
              </linearGradient>
            </defs>
            <path d="M0,160 Q180,220 360,160 T720,160 T1080,160 T1440,160 V320 H0Z" fill="url(#grassGradient)" />
            <path d="M0,200 Q180,260 360,200 T720,200 T1080,200 T1440,200 V320 H0Z" fill="#22c55e" fillOpacity="0.7" />
            <path d="M0,240 Q180,300 360,240 T720,240 T1080,240 T1440,240 V320 H0Z" fill="#16a34a" fillOpacity="0.5" />
          </svg>
          <svg className="absolute left-1/2 top-0 h-full w-1/2 grass-svg animate-move-grass" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <defs>
              <linearGradient id="grassGradient2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4ade80" />
                <stop offset="100%" stopColor="#166534" />
              </linearGradient>
            </defs>
            <path d="M0,160 Q180,220 360,160 T720,160 T1080,160 T1440,160 V320 H0Z" fill="url(#grassGradient2)" />
            <path d="M0,200 Q180,260 360,200 T720,200 T1080,200 T1440,200 V320 H0Z" fill="#22c55e" fillOpacity="0.7" />
            <path d="M0,240 Q180,300 360,240 T720,240 T1080,240 T1440,240 V320 H0Z" fill="#16a34a" fillOpacity="0.5" />
          </svg>
        </div>
        <style>{`
          @keyframes move-grass {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-move-grass {
            animation: move-grass 8s linear infinite;
          }
        `}</style>
      </div>
      <div className="relative z-10 max-w-2xl w-full px-2 md:px-8 py-20 md:py-28 flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-12 text-center drop-shadow-lg">¿Cómo funciona?</h1>
        <div className="relative w-full flex items-center justify-center min-h-[420px]">
          {/* Botón retroceder */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-3 md:p-4 text-indigo-700 hover:bg-indigo-100 hover:scale-110 transition-all duration-200 z-20 border-2 border-indigo-100"
            aria-label="Anterior"
            style={{ outline: 'none' }}
          >
            <svg className="w-7 h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>
          {/* Carrousel animado */}
          <div className="w-full flex items-center justify-center select-none" ref={containerRef} style={{ minHeight: 400 }}>
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={step}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.18}
                onDragEnd={handleDragEnd}
                className="w-full flex flex-col items-center justify-center gap-6 px-2"
                style={{ minHeight: 380 }}
              >
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="bg-white rounded-3xl shadow-xl p-6 flex items-center justify-center mb-2" style={{ minWidth: 180, minHeight: 180, maxWidth: 220 }}>
                    <Lottie animationData={lotties[step]} loop={true} autoplay={true} speed={0.2} style={{ width: 160, height: 160, maxWidth: 200 }} rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-2 text-center drop-shadow-sm">{pasos[step].titulo}</h2>
                  <p className="text-gray-700 text-lg md:text-xl text-center max-w-xl">{pasos[step].descripcion}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          {/* Botón avanzar */}
          <button
            onClick={() => paginate(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-3 md:p-4 text-indigo-700 hover:bg-indigo-100 hover:scale-110 transition-all duration-200 z-20 border-2 border-indigo-100"
            aria-label="Siguiente"
            style={{ outline: 'none' }}
          >
            <svg className="w-7 h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
        <div className="mt-16 text-center">
          <button
            className={`inline-block bg-gradient-to-r from-indigo-700 to-blue-600 text-white font-bold px-12 py-4 rounded-2xl shadow-2xl text-2xl hover:scale-105 hover:bg-indigo-800 transition-all duration-200 ${animateCreaEquipo ? 'animate-bounce-once' : ''}`}
          >
            ¡Crea tu equipo ahora!
          </button>
        </div>
      </div>
      <style>{`
        .glow-title {
          text-shadow: 0 0 12px #60a5fa, 0 0 24px #2563eb;
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
  );
};

export default ComoFunciona; 