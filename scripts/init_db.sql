-- Script de ejemplo para crear tablas principales
CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  rol VARCHAR(20) NOT NULL,
  verificado BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE perfiles (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER REFERENCES usuarios(id),
  edad INTEGER,
  posicion VARCHAR(50),
  experiencia VARCHAR(100),
  habilidades TEXT,
  ubicacion GEOGRAPHY(Point, 4326),
  ciudad VARCHAR(100),
  tarifa NUMERIC(10,2),
  foto_url TEXT,
  video_url TEXT
);

CREATE TABLE reservas (
  id SERIAL PRIMARY KEY,
  cliente_id INTEGER REFERENCES usuarios(id),
  jugador_id INTEGER REFERENCES usuarios(id),
  fecha TIMESTAMP NOT NULL,
  estado VARCHAR(20) DEFAULT 'pendiente',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 