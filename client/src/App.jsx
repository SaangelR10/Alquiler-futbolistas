import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BuscarJugadores from './pages/BuscarJugadores';
import Footer from './components/Footer';
import './index.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/buscar" element={<BuscarJugadores />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App; 