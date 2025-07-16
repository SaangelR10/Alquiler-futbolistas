import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BuscarJugadores from './pages/BuscarJugadores';
import BuscarEquipos from './pages/BuscarEquipos';
import PerfilJugador from './pages/PerfilJugador';
import Login from './pages/Login';
import Register from './pages/Register';
import ComoFunciona from './pages/ComoFunciona';
import Torneos from './pages/Torneos';
import TorneoDetalle from './pages/TorneoDetalle';
import Footer from './components/Footer';
import Loader from './components/Loader';
import './index.css';
import CreateTeamWizard from './pages/CreateTeamWizard';
import BuscarCentral from './pages/BuscarCentral';
import { FaSearch, FaUsers, FaTrophy, FaUserPlus, FaStar, FaHandshake } from 'react-icons/fa';
import RecuperarContraseña from './pages/RecuperarContraseña';
import Tribuna from './pages/Tribuna';

function Funcionalidades() {
  const funcionalidades = [
    {
      icon: <FaSearch className="text-indigo-600 text-4xl animate-fade-in" />,
      titulo: 'Buscar jugadores',
      desc: 'Encuentra futbolistas por posición, ciudad, precio y disponibilidad.',
    },
    {
      icon: <FaUsers className="text-indigo-600 text-4xl animate-fade-in" />,
      titulo: 'Buscar equipos',
      desc: 'Descubre equipos que buscan jugadores y únete fácilmente.',
    },
    {
      icon: <FaTrophy className="text-yellow-500 text-4xl animate-fade-in" />,
      titulo: 'Buscar torneos',
      desc: 'Explora torneos y participa con tu equipo o como jugador.',
    },
    {
      icon: <FaUserPlus className="text-emerald-500 text-4xl animate-fade-in" />,
      titulo: 'Crear tu equipo',
      desc: 'Crea y gestiona tu propio equipo, agrega integrantes y personaliza tu perfil.',
    },
    {
      icon: <FaHandshake className="text-blue-500 text-4xl animate-fade-in" />,
      titulo: 'Reservar jugadores',
      desc: 'Reserva futbolistas para tus partidos de forma segura y rápida.',
    },
    {
      icon: <FaStar className="text-pink-500 text-4xl animate-fade-in" />,
      titulo: 'Calificar y dejar reseñas',
      desc: 'Valora la experiencia y ayuda a otros usuarios con tus comentarios.',
    },
  ];
  return (
    <section id="funcionalidades" className="w-full py-20 px-2 bg-[linear-gradient(180deg,#2563eb_0%,#38bdf8_40%,#e0e7ff_100%)] flex flex-col items-center justify-center relative">
      <h2 className="text-3xl md:text-4xl font-extrabold text-indigo-800 mb-6 text-center drop-shadow-lg animate-fade-in">Funcionalidades del aplicativo</h2>
      <p className="text-lg text-indigo-700 mb-12 text-center max-w-2xl animate-fade-in">Descubre todo lo que puedes hacer en la plataforma: conecta, juega, crea equipos, participa en torneos y mucho más, de forma fácil, segura e interactiva.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl animate-fade-in">
        {funcionalidades.map((f, idx) => (
          <div key={idx} className="bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center border-2 border-indigo-100 hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.04] transition-all duration-300 group">
            <div className="mb-4 group-hover:scale-110 transition-transform">{f.icon}</div>
            <div className="text-xl font-bold text-indigo-700 mb-2 text-center">{f.titulo}</div>
            <div className="text-gray-700 text-center">{f.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function AppContent() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 400); // Antes: 1000ms, ahora 400ms
    return () => clearTimeout(timeout);
  }, [location]);

  const hideNavFooter = location.pathname === '/login' || location.pathname === '/register';

  if (loading) return <Loader />;

  return (
    <>
      {!hideNavFooter && <Navbar />}
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <Funcionalidades />
          </>
        } />
        <Route path="/buscar" element={<BuscarCentral />} />
        <Route path="/buscar/jugadores" element={<BuscarJugadores />} />
        <Route path="/buscar/equipos" element={<BuscarEquipos />} />
        <Route path="/buscar/torneos" element={<Torneos />} />
        <Route path="/jugador/:id" element={<PerfilJugador />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/como-funciona" element={<ComoFunciona />} />
        <Route path="/torneos" element={<Torneos />} />
        <Route path="/torneo/:id" element={<TorneoDetalle />} />
        <Route path="/crear-equipo" element={<CreateTeamWizard />} />
        <Route path="/recuperar" element={<RecuperarContraseña />} />
        <Route path="/tribuna" element={<Tribuna />} />
      </Routes>
      {!hideNavFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App; 