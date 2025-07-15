import React from 'react';

const PanelCanchas = ({ cancha, onClose }) => {
  if (!cancha) return null;
  return (
    <aside className="fixed top-0 right-0 h-full w-full md:w-[420px] bg-white shadow-2xl z-50 border-l border-indigo-100 animate-slide-in flex flex-col transition-transform duration-300" style={{marginTop: '72px', maxHeight: 'calc(100vh - 72px)'}}>
      {/* Botón de cerrar profesional */}
      <button onClick={onClose} className="absolute top-4 right-4 bg-white rounded-full shadow-md p-2 hover:bg-indigo-50 transition text-indigo-700 text-xl z-10" aria-label="Cerrar panel">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div className="p-6 pt-10 flex-1 overflow-y-auto">
        <div className="flex flex-col items-center mb-6">
          <img src={cancha.foto} alt={cancha.nombre} className="w-32 h-32 rounded-2xl object-cover border-4 border-indigo-200 shadow mb-3" />
          <h2 className="text-2xl font-bold text-indigo-700 mb-2 text-center">{cancha.nombre}</h2>
          <div className="flex flex-col gap-1 text-gray-700 text-sm w-full max-w-xs items-center text-center">
            <span><b>Tipo de cancha:</b> {cancha.tipo}</span>
            <span><b>Ciudad:</b> {cancha.ciudad}</span>
            <span><b>Dirección:</b> {cancha.direccion}</span>
          </div>
        </div>
        <h3 className="text-lg font-bold text-indigo-700 mb-4 text-center">Torneos activos</h3>
        {cancha.torneos.length === 0 ? (
          <div className="text-gray-400 text-center">No hay torneos activos en esta cancha.</div>
        ) : (
          <div className="space-y-8">
            {cancha.torneos.map(torneo => (
              <div key={torneo.id} className="bg-white border border-indigo-100 rounded-2xl p-6 shadow-md hover:shadow-xl transition flex flex-col items-center gap-3 relative">
                <div className="flex flex-col items-center gap-2 w-full">
                  <img src={torneo.imagen} alt={torneo.nombre} className="w-20 h-20 rounded-lg object-cover border-2 border-indigo-200 shadow mb-1" />
                  <div className="font-bold text-indigo-700 text-xl text-center leading-tight">{torneo.nombre}</div>
                  <div className="text-gray-600 text-sm text-center">{torneo.fechas} • {torneo.tipo}</div>
                  <div className="text-xs text-gray-500 text-center">Estado: <span className={torneo.estado === 'Abierto' ? 'text-green-600 font-bold' : 'text-gray-400'}>{torneo.estado}</span></div>
                  <span className="bg-indigo-50 text-indigo-700 font-semibold px-3 py-1 rounded mt-1 text-base">Inscripción por equipo: ${torneo.inscripcion.toLocaleString()}</span>
                  {/* Premio principal debajo de inscripción */}
                  <div className="flex flex-col items-center mt-3">
                    <div className="bg-gradient-to-tr from-yellow-400 to-yellow-200 rounded-full w-14 h-14 flex items-center justify-center shadow-lg border-4 border-white mb-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-yellow-700" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2c.512 0 .935.386.993.883l.007.117V4h2.5a1 1 0 0 1 .993.883L16.5 5v2.5a1 1 0 0 1-.883.993L15.5 8.5h-7a1 1 0 0 1-.993-.883L7.5 7.5V5a1 1 0 0 1 .883-.993L8.5 4H11V3c0-.552.448-1 1-1zm0 2h-2.5v1.5h5V4H12zm-4 5.5h8a1 1 0 0 1 .993.883L17 10.5v7a1 1 0 0 1-.883.993L16 18.5H8a1 1 0 0 1-.993-.883L7 17.5v-7a1 1 0 0 1 .883-.993L8 8.5zm1 2v6h6v-6H9zm3 2a1 1 0 0 1 .993.883L13 13v2a1 1 0 0 1-1.993.117L11 15v-2a1 1 0 0 1 .883-.993L12 12z"/></svg>
                    </div>
                    <span className="text-xs font-bold text-yellow-700">Premio 1er Puesto</span>
                    <span className="text-lg font-extrabold text-yellow-700">${torneo.premio1.toLocaleString()}</span>
                  </div>
                </div>
                <button className="mt-3 w-full px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white rounded-lg font-semibold shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2">Ver detalles / Inscribirse</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};

export default PanelCanchas; 