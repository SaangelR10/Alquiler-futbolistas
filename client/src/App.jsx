import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BuscarJugadores from './pages/BuscarJugadores';
import PerfilJugador from './pages/PerfilJugador';
import Login from './pages/Login';
import Register from './pages/Register';
import ComoFunciona from './pages/ComoFunciona';
import Torneos from './pages/Torneos';
import Footer from './components/Footer';
import Loader from './components/Loader';
import './index.css';

function AppContent() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, [location]);

  const hideNavFooter = location.pathname === '/login' || location.pathname === '/register';

  if (loading) return <Loader />;

  return (
    <>
      {!hideNavFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/buscar" element={<BuscarJugadores />} />
        <Route path="/jugador/:id" element={<PerfilJugador />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/como-funciona" element={<ComoFunciona />} />
        <Route path="/torneos" element={<Torneos />} />
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