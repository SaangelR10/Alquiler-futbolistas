import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }
    navigate('/');
  };

  const handleSocialLogin = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-700 via-blue-600 to-sky-400 relative">
      {/* Botón volver al inicio */}
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center gap-2 bg-white/80 hover:bg-white text-indigo-700 font-semibold px-4 py-2 rounded-full shadow transition-all duration-200 backdrop-blur z-10"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        Volver al inicio
      </Link>
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md flex flex-col items-center animate-fade-in">
        <div className="mb-6">
          <span className="text-3xl font-extrabold text-indigo-700 tracking-tight">AlquilerFutbolistas</span>
        </div>
        <form className="w-full" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full mb-4 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full mb-4 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
          <button
            type="submit"
            className="w-full bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-3 rounded-lg shadow transition mb-4 text-lg"
          >
            Iniciar sesión
          </button>
        </form>
        <div className="flex flex-col gap-2 w-full mb-4">
          <button onClick={handleSocialLogin} className="w-full bg-white border border-gray-300 text-gray-700 font-semibold py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition">
            <img src="https://cdn-icons-png.flaticon.com/512/281/281764.png" alt="Google" className="w-5 h-5" /> Iniciar sesión con Google
          </button>
          <button onClick={handleSocialLogin} className="w-full bg-white border border-gray-300 text-gray-700 font-semibold py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition">
            <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" className="w-5 h-5" /> Iniciar sesión con Facebook
          </button>
          <button onClick={handleSocialLogin} className="w-full bg-white border border-gray-300 text-gray-700 font-semibold py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition">
            <img src="https://cdn-icons-png.flaticon.com/512/5968/5968830.png" alt="X" className="w-5 h-5" /> Iniciar sesión con X
          </button>
          <button onClick={handleSocialLogin} className="w-full bg-white border border-gray-300 text-gray-700 font-semibold py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition">
            <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" className="w-5 h-5" /> Iniciar sesión con Instagram
          </button>
        </div>
        <div className="flex justify-between w-full text-sm text-gray-500">
          <Link to="/register" className="hover:text-indigo-700 font-semibold">Crear cuenta</Link>
          <a href="#" className="hover:text-indigo-700 font-semibold">¿Olvidaste tu contraseña?</a>
        </div>
      </div>
    </div>
  );
};

export default Login; 