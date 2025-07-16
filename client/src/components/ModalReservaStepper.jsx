import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const metodosPago = [
  { value: 'transferencia', label: 'Transferencia' },
  { value: 'efectivo', label: 'Efectivo' },
  { value: 'app', label: 'Pago por la aplicación' },
];

const pasos = [
  'Detalles de la reserva',
  'Mensaje y pago',
  'Confirmación',
];

const iconos = {
  fecha: <svg className="w-5 h-5 text-indigo-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M7 10V6a5 5 0 0110 0v4M5 20h14a2 2 0 002-2V10a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
  hora: <svg className="w-5 h-5 text-indigo-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>,
  duracion: <svg className="w-5 h-5 text-indigo-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="8" rx="4" /><path d="M7 8V6a5 5 0 0110 0v2" /></svg>,
  color: <svg className="w-5 h-5 text-indigo-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>,
  mensaje: <svg className="w-5 h-5 text-indigo-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>,
  pago: <svg className="w-5 h-5 text-indigo-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 9V7a5 5 0 00-10 0v2M5 20h14a2 2 0 002-2V10a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
};

const ModalReservaStepper = ({ jugador, abierto, onClose, onSuccess, volverAtras }) => {
  const [step, setStep] = useState(0);
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [duracion, setDuracion] = useState(1);
  const [colorUniforme, setColorUniforme] = useState('#3b82f6');
  const [mensaje, setMensaje] = useState('');
  const [metodoPago, setMetodoPago] = useState('transferencia');
  const [loading, setLoading] = useState(false);
  const [exito, setExito] = useState(false);
  const [error, setError] = useState('');

  const reset = () => {
    setStep(0);
    setFecha('');
    setHora('');
    setDuracion(1);
    setColorUniforme('#3b82f6');
    setMensaje('');
    setMetodoPago('transferencia');
    setLoading(false);
    setExito(false);
    setError('');
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleReservar = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setExito(true);
      setStep(2);
      if (onSuccess) onSuccess();
    }, 1800);
  };

  const validStep1 = fecha && hora && duracion > 0;

  return (
    <AnimatePresence>
      {abierto && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white/80 backdrop-blur-2xl border border-indigo-100 shadow-2xl max-w-md w-full p-0 sm:p-0 rounded-3xl relative overflow-hidden"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            {/* Cerrar */}
            <button onClick={onClose} className="absolute top-4 right-4 text-indigo-400 hover:text-indigo-700 text-3xl font-bold focus:outline-none z-20 bg-white/70 rounded-full w-10 h-10 flex items-center justify-center shadow-md transition-all duration-200">
              ×
            </button>
            {/* Stepper visual */}
            <div className="flex items-center justify-center gap-2 pt-8 pb-4">
              {pasos.map((p, i) => (
                <div key={i} className="flex items-center gap-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg shadow ${i === step ? 'bg-indigo-600 text-white shadow-lg scale-110' : 'bg-indigo-100 text-indigo-600'}`}>{i+1}</div>
                  {i < pasos.length-1 && <div className={`w-8 h-1 rounded ${i < step ? 'bg-indigo-600' : 'bg-indigo-100'}`}></div>}
                </div>
              ))}
            </div>
            {/* Botón volver atrás */}
            {volverAtras && (
              <button onClick={volverAtras} className="ml-6 mb-2 text-indigo-500 hover:text-indigo-700 font-semibold text-sm flex items-center gap-1 transition-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                Volver atrás
              </button>
            )}
            <h2 className="text-xl font-extrabold text-indigo-700 mb-4 text-center drop-shadow-sm">{pasos[step]}</h2>
            {/* Paso 1 */}
            {step === 0 && (
              <form onSubmit={e => {e.preventDefault(); if(validStep1) setStep(1);}} className="space-y-4 px-6 pb-6">
                <div className="mb-2">
                  <label className="block text-xs font-bold text-indigo-700 mb-1">Fecha</label>
                  <div className="flex items-center bg-white rounded-xl border border-indigo-200 px-3 py-2 shadow-sm">
                    {iconos.fecha}
                    <input type="date" className="flex-1 bg-transparent border-none outline-none text-indigo-700 font-semibold" value={fecha} onChange={e => setFecha(e.target.value)} required />
                  </div>
                </div>
                <div className="mb-2">
                  <label className="block text-xs font-bold text-indigo-700 mb-1">Hora</label>
                  <div className="flex items-center bg-white rounded-xl border border-indigo-200 px-3 py-2 shadow-sm">
                    {iconos.hora}
                    <input type="time" className="flex-1 bg-transparent border-none outline-none text-indigo-700 font-semibold" value={hora} onChange={e => setHora(e.target.value)} required />
                  </div>
                </div>
                <div className="mb-2">
                  <label className="block text-xs font-bold text-indigo-700 mb-1">Duración (horas)</label>
                  <div className="flex items-center bg-white rounded-xl border border-indigo-200 px-3 py-2 shadow-sm">
                    {iconos.duracion}
                    <input type="number" min={1} max={8} className="flex-1 bg-transparent border-none outline-none text-indigo-700 font-semibold" value={duracion} onChange={e => setDuracion(Number(e.target.value))} required placeholder="Duración (horas)" />
                  </div>
                </div>
                <div className="mb-2">
                  <label className="block text-xs font-bold text-indigo-700 mb-1">Color del uniforme</label>
                  <div className="flex items-center bg-white rounded-xl border border-indigo-200 px-3 py-2 shadow-sm">
                    {iconos.color}
                    <input type="color" className="w-10 h-8 p-0 border-2 border-indigo-200 rounded-lg bg-transparent" value={colorUniforme} onChange={e => setColorUniforme(e.target.value)} />
                    <span className="ml-2 text-xs text-indigo-500 font-semibold">Color uniforme</span>
                  </div>
                </div>
                <button type="submit" disabled={!validStep1} className={`w-full py-3 rounded-xl font-bold text-white text-lg shadow-lg transition ${validStep1 ? 'bg-gradient-to-r from-indigo-500 to-blue-400 hover:from-indigo-600 hover:to-blue-500' : 'bg-indigo-200 cursor-not-allowed'}`}>Siguiente</button>
              </form>
            )}
            {/* Paso 2 */}
            {step === 1 && (
              <form onSubmit={e => {e.preventDefault(); handleReservar();}} className="space-y-4 px-6 pb-6">
                <div className="mb-2">
                  <label className="block text-xs font-bold text-indigo-700 mb-1">Mensaje para el jugador</label>
                  <div className="flex items-start bg-white rounded-xl border border-indigo-200 px-3 py-2 shadow-sm">
                    {iconos.mensaje}
                    <textarea className="flex-1 bg-transparent border-none outline-none text-indigo-700 font-semibold min-h-[60px] resize-none" value={mensaje} onChange={e => setMensaje(e.target.value)} placeholder="Escribe un mensaje..." />
                  </div>
                </div>
                <div className="mb-2">
                  <label className="block text-xs font-bold text-indigo-700 mb-1">Método de pago</label>
                  <div className="flex gap-3 flex-wrap">
                    {metodosPago.map(m => (
                      <label key={m.value} className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 cursor-pointer transition text-indigo-700 font-semibold text-sm ${metodoPago === m.value ? 'border-indigo-600 bg-indigo-50 shadow' : 'border-indigo-100 bg-white/70'}`}>
                        <input type="radio" name="metodoPago" value={m.value} checked={metodoPago === m.value} onChange={() => setMetodoPago(m.value)} className="accent-indigo-600" />
                        <span>{m.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  <button type="button" onClick={() => setStep(0)} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-indigo-700 hover:bg-gray-200 transition text-lg shadow">Atrás</button>
                  <button type="submit" className="flex-1 py-3 rounded-xl font-bold text-white text-lg bg-gradient-to-r from-indigo-500 to-blue-400 hover:from-indigo-600 hover:to-blue-500 shadow-lg transition">Reservar</button>
                </div>
                {loading && <div className="flex justify-center mt-2"><div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div></div>}
                {error && <div className="text-red-600 text-center font-semibold mt-2">{error}</div>}
              </form>
            )}
            {/* Paso 3: Confirmación */}
            {step === 2 && (
              <div className="flex flex-col items-center justify-center py-8 px-4">
                {exito ? (
                  <>
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 15 }}>
                      <svg className="w-20 h-20 text-green-500 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="white" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12l2 2 4-4" /></svg>
                    </motion.div>
                    <div className="text-2xl font-bold text-green-600 mb-2">¡Reserva exitosa!</div>
                    <div className="text-gray-700 text-center mb-4">Tu reserva ha sido enviada a <span className="font-semibold text-indigo-700">{jugador?.nombre}</span>. Recibirás una notificación cuando sea confirmada.</div>
                    <button onClick={onClose} className="mt-2 px-6 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-400 text-white font-bold hover:from-indigo-600 hover:to-blue-500 transition shadow">Cerrar</button>
                  </>
                ) : (
                  <>
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 15 }}>
                      <svg className="w-20 h-20 text-red-500 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="white" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 9l-6 6m0-6l6 6" /></svg>
                    </motion.div>
                    <div className="text-2xl font-bold text-red-600 mb-2">¡Error en la reserva!</div>
                    <div className="text-gray-700 text-center mb-4">Ocurrió un problema al procesar tu reserva. Intenta nuevamente.</div>
                    <button onClick={onClose} className="mt-2 px-6 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-400 text-white font-bold hover:from-indigo-600 hover:to-blue-500 transition shadow">Cerrar</button>
                  </>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalReservaStepper; 