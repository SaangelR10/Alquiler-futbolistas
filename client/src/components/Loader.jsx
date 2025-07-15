import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import ball from '../assets/lottie/ball.json';

const FireBallLoader = () => (
  <img
    src="https://cdn-icons-png.flaticon.com/512/861/861512.png"
    alt="Cargando..."
    className="w-24 h-24 animate-spin-slow mb-6"
    style={{ animation: 'spin 1.2s linear infinite' }}
  />
);

const Loader = () => {
  // Alternar entre el Loader clásico (img balón con fuego) y el Lottie de ball.json
  const [showFire, setShowFire] = useState(() => {
    const last = window.sessionStorage.getItem('lastLoaderType');
    return last !== 'fire';
  });

  useEffect(() => {
    window.sessionStorage.setItem('lastLoaderType', showFire ? 'fire' : 'ball');
  }, [showFire]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-700 via-blue-600 to-sky-400">
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 mb-6">
          {showFire ? (
            <FireBallLoader />
          ) : (
            <Lottie 
              animationData={ball} 
              loop={true} 
              autoplay={true} 
              speed={0.8} 
              style={{ width: 120, height: 120 }} 
            />
          )}
        </div>
        <span className="text-white text-lg font-bold tracking-wide drop-shadow-lg">Cargando...</span>
      </div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin 1.2s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Loader; 