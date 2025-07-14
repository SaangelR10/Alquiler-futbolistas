# Alquiler de Futbolistas

Plataforma web para conectar futbolistas con clientes que buscan reservar sus servicios.

## Instalación y uso rápido

### Requisitos
- Node.js >= 18
- Docker y Docker Compose

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu_usuario/Alquiler-futbolistas.git
cd Alquiler-futbolistas
```

### 2. Configurar variables de entorno
Copia `.env.example` a `.env` y ajusta los valores necesarios.

### 3. Levantar entorno de desarrollo
```bash
docker-compose up --build
```

### 4. Acceso
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000/api
- Base de datos: localhost:5432

## Estructura del proyecto
- `/client`: Frontend React
- `/server`: Backend Node.js/Express
- `/docs`: Documentación
- `/scripts`: SQL y datos de ejemplo

## Scripts útiles
- `npm run dev` (backend)
- `npm start` (frontend)

---

## Licencia
MIT 