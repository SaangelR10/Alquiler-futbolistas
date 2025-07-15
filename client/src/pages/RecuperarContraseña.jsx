import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RecuperarContraseña = () => {
  const [email, setEmail] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    setError('');
    if (!email) {
      setError('Por favor, ingresa tu correo electrónico.');
      return;
    }
    // Aquí iría la lógica real de envío
    setEnviado(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-700 via-blue-600 to-sky-400 relative">
      {/* Botón volver al inicio */}
      <Link
        to="/login"
        className="absolute top-24 left-6 flex items-center gap-2 bg-white/80 hover:bg-white text-indigo-700 font-semibold px-4 py-2 rounded-full shadow transition-all duration-200 backdrop-blur z-10"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        Volver
      </Link>
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md flex flex-col items-center animate-fade-in">
        <div className="mb-6">
          <span className="text-3xl font-extrabold text-indigo-700 tracking-tight">Recuperar contraseña</span>
        </div>
        {enviado ? (
          <div className="flex flex-col items-center gap-4 w-full">
            <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="white" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12l2 2 4-4" /></svg>
            <div className="text-lg font-semibold text-green-600 text-center">¡Listo! Si el correo está registrado, recibirás instrucciones para restablecer tu contraseña.</div>
            <Link to="/login" className="w-full bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-3 rounded-lg shadow transition text-center">Volver a iniciar sesión</Link>
          </div>
        ) : (
          <form className="w-full" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Correo electrónico"
              className="w-full mb-4 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
            <button
              type="submit"
              className="w-full bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-3 rounded-lg shadow transition mb-4 text-lg"
            >
              Enviar instrucciones
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default RecuperarContraseña; 