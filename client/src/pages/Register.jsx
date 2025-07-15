import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: '',
    password2: '',
    tipo: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    setError('');
    if (step === 1) {
      if (!form.nombre || !form.email || !form.password || !form.password2) {
        setError('Completa todos los campos.');
        return;
      }
      if (form.password !== form.password2) {
        setError('Las contraseñas no coinciden.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!form.tipo) {
        setError('Selecciona un tipo de cuenta.');
        return;
      }
      navigate('/login');
    }
  };

  const handleSocialRegister = () => {
    navigate('/login');
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
        {/* Stepper visual */}
        <div className="flex justify-center gap-2 mb-6">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${step===1 ? 'bg-indigo-700' : 'bg-indigo-300'}`}>1</div>
          <div className={`w-20 h-1 ${step===2 ? 'bg-indigo-700' : 'bg-indigo-300'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${step===2 ? 'bg-indigo-700' : 'bg-indigo-300'}`}>2</div>
        </div>
        {step === 1 && (
          <form className="w-full" onSubmit={e => {e.preventDefault(); handleNext();}}>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre completo"
              className="w-full mb-4 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
              value={form.nombre}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              className="w-full mb-4 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
              value={form.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              className="w-full mb-4 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
              value={form.password}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password2"
              placeholder="Repetir contraseña"
              className="w-full mb-4 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
              value={form.password2}
              onChange={handleChange}
            />
            {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
            <button
              type="submit"
              className="w-full bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-3 rounded-lg shadow transition mb-4 text-lg"
            >
              Siguiente
            </button>
          </form>
        )}
        {step === 2 && (
          <div className="w-full flex flex-col items-center">
            <div className="mb-6 w-full">
              <div className="text-lg font-semibold text-indigo-700 mb-2 text-center">¿Qué tipo de cuenta quieres crear?</div>
              <div className="flex gap-4 justify-center">
                <button
                  className={`flex flex-col items-center gap-2 px-6 py-4 rounded-xl border-2 ${form.tipo==='jugador' ? 'border-indigo-700 bg-indigo-50' : 'border-gray-200 bg-white'} hover:border-indigo-700 transition`}
                  onClick={() => setForm({ ...form, tipo: 'jugador' })}
                >
                  <img src="https://cdn-icons-png.flaticon.com/512/1041/1041916.png" alt="Jugador" className="w-10 h-10" />
                  <span className="font-bold text-indigo-700">Jugador</span>
                </button>
                <button
                  className={`flex flex-col items-center gap-2 px-6 py-4 rounded-xl border-2 ${form.tipo==='equipo' ? 'border-indigo-700 bg-indigo-50' : 'border-gray-200 bg-white'} hover:border-indigo-700 transition`}
                  onClick={() => setForm({ ...form, tipo: 'equipo' })}
                >
                  <img src="https://cdn-icons-png.flaticon.com/512/616/616494.png" alt="Equipo" className="w-10 h-10" />
                  <span className="font-bold text-indigo-700">Equipo</span>
                </button>
              </div>
            </div>
            {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
            <button
              className="w-full bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-3 rounded-lg shadow transition mb-4 text-lg"
              onClick={handleNext}
            >
              Crear cuenta
            </button>
          </div>
        )}
        {/* Botones sociales */}
        <div className="flex flex-col gap-2 w-full mb-4 mt-2">
          <button onClick={handleSocialRegister} className="w-full bg-white border border-gray-300 text-gray-700 font-semibold py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition">
            <img src="https://cdn-icons-png.flaticon.com/512/281/281764.png" alt="Google" className="w-5 h-5" /> Registrarse con Google
          </button>
          <button onClick={handleSocialRegister} className="w-full bg-white border border-gray-300 text-gray-700 font-semibold py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition">
            <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" className="w-5 h-5" /> Registrarse con Facebook
          </button>
          <button onClick={handleSocialRegister} className="w-full bg-white border border-gray-300 text-gray-700 font-semibold py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition">
            <img src="https://cdn-icons-png.flaticon.com/512/5968/5968830.png" alt="X" className="w-5 h-5" /> Registrarse con X
          </button>
          <button onClick={handleSocialRegister} className="w-full bg-white border border-gray-300 text-gray-700 font-semibold py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition">
            <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" className="w-5 h-5" /> Registrarse con Instagram
          </button>
        </div>
        <div className="w-full text-center text-sm text-gray-500 mt-2">
          <Link to="/login" className="hover:text-indigo-700 font-semibold">¿Ya tienes cuenta? Inicia sesión</Link>
        </div>
      </div>
    </div>
  );
};

export default Register; 