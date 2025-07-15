import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const pasos = [
  {
    titulo: '1. Regístrate gratis',
    descripcion: 'Crea tu cuenta como jugador o equipo en menos de 2 minutos. Elige tu rol y completa tus datos básicos.',
    icono: 'https://cdn-icons-png.flaticon.com/512/747/747376.png',
  },
  {
    titulo: '2. Verifica tu identidad',
    descripcion: 'Sube una foto y un video corto para validar tu identidad y aumentar la confianza en la plataforma.',
    icono: 'https://cdn-icons-png.flaticon.com/512/747/747545.png',
  },
  {
    titulo: '3. Crea tu perfil',
    descripcion: 'Completa tu perfil como jugador (posición, experiencia, precio, disponibilidad) o como equipo (necesidades, ciudad, logo).',
    icono: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
  },
  {
    titulo: '4. Busca y filtra',
    descripcion: 'Utiliza el buscador avanzado para encontrar jugadores o equipos por ubicación, posición, precio y disponibilidad.',
    icono: 'https://cdn-icons-png.flaticon.com/512/751/751381.png',
  },
  {
    titulo: '5. Reserva y paga seguro',
    descripcion: 'Reserva jugadores o postúlate a equipos. Realiza pagos seguros con Stripe y recibe notificaciones en tiempo real.',
    icono: 'https://cdn-icons-png.flaticon.com/512/1256/1256650.png',
  },
  {
    titulo: '6. Califica y deja tu reseña',
    descripcion: 'Después del partido, califica la experiencia y deja una reseña para ayudar a otros usuarios.',
    icono: 'https://cdn-icons-png.flaticon.com/512/616/616489.png',
  },
];

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
  const [activeIndex, setActiveIndex] = useState(0);
  const pasosRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      const viewportCenter = window.scrollY + window.innerHeight / 2;
      let minDist = Infinity;
      let closestIdx = 0;
      pasosRefs.current.forEach((ref, idx) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const blockCenter = rect.top + window.scrollY + rect.height / 2;
          const dist = Math.abs(viewportCenter - blockCenter);
          if (dist < minDist) {
            minDist = dist;
            closestIdx = idx;
          }
        }
      });
      setActiveIndex(closestIdx);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // inicial
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-x-hidden bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
      {/* Formas geométricas decorativas */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <svg width="100%" height="100%" className="absolute opacity-20" style={{zIndex:0}}>
          <circle cx="10%" cy="20%" r="80" fill="#6366f1" fillOpacity="0.15" />
          <rect x="80%" y="70%" width="120" height="120" rx="40" fill="#818cf8" fillOpacity="0.12" />
          <circle cx="90%" cy="10%" r="40" fill="#a5b4fc" fillOpacity="0.18" />
        </svg>
      </div>
      <div className="relative z-10 max-w-4xl w-full px-4 py-24">
        <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-16 text-center drop-shadow-lg">¿Cómo funciona?</h1>
        <div className="flex flex-col gap-0 relative">
          {pasos.map((paso, i) => (
            <motion.div
              key={i}
              ref={el => pasosRefs.current[i] = el}
              className={`relative flex items-center justify-center min-h-[${BLOCK_HEIGHT}px]`}
              style={{ minHeight: BLOCK_HEIGHT, marginTop: i === 0 ? 0 : 0 }}
              initial="initial"
              animate={activeIndex === i ? 'active' : 'initial'}
              whileHover="hover"
              transition={{ type: 'spring', duration: 0.5 }}
            >
              {/* Icono animado */}
              <motion.div
                className={`flex-shrink-0 flex items-center justify-center rounded-full shadow-xl border-4 z-10 absolute left-1/2 -translate-x-1/2 transition-colors duration-500 ${activeIndex === i ? 'bg-gradient-to-br from-indigo-500 via-blue-400 to-indigo-700 border-blue-400' : 'bg-white border-indigo-100'}`}
                style={{ width: ICON_SIZE, height: ICON_SIZE, top: BLOCK_HEIGHT / 2 - ICON_SIZE / 2 }}
                variants={iconVariants}
              >
                <motion.img
                  src={paso.icono}
                  alt={paso.titulo}
                  className={`select-none transition-all duration-500 ${activeIndex === i ? 'grayscale-0 brightness-110' : 'grayscale'}`}
                  style={{ width: ICON_SIZE * 0.7, height: ICON_SIZE * 0.7 }}
                  variants={floatVariants}
                  animate="animate"
                  draggable="false"
                />
              </motion.div>
              {/* Contenido */}
              <div
                className={`flex-1 max-w-[45%] ${i % 2 === 1 ? 'text-right pr-2 md:pr-8' : 'text-left pl-2 md:pl-8'}`}
                style={{ alignSelf: 'center', marginLeft: i % 2 === 1 ? '55%' : 0, marginRight: i % 2 === 0 ? '55%' : 0 }}
              >
                <motion.h2
                  className={`text-2xl md:text-3xl font-bold mb-2 drop-shadow-sm transition-colors duration-500 ${activeIndex === i ? 'text-blue-700' : 'text-indigo-700'}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  {paso.titulo}
                </motion.h2>
                <motion.p
                  className="text-gray-700 text-lg md:text-xl"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {paso.descripcion}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-24 text-center">
          <motion.span
            className="inline-block bg-indigo-700 text-white font-bold px-10 py-5 rounded-2xl shadow-2xl text-2xl animate-bounce cursor-pointer hover:scale-105 hover:bg-indigo-800 transition"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.08 }}
          >
            ¡Empieza ahora y vive la experiencia!
          </motion.span>
        </div>
      </div>
    </div>
  );
};

export default ComoFunciona; 