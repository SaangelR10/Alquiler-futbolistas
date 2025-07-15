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

const ModalReservaStepper = ({ jugador, abierto, onClose, onSuccess }) => {
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            {/* Cerrar */}
            <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-indigo-700 text-2xl font-bold focus:outline-none">×</button>
            {/* Stepper visual */}
            <div className="flex items-center justify-center gap-2 mb-6">
              {pasos.map((p, i) => (
                <div key={i} className="flex items-center gap-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg ${i === step ? 'bg-indigo-600 text-white shadow-lg' : 'bg-indigo-100 text-indigo-600'}`}>{i+1}</div>
                  {i < pasos.length-1 && <div className={`w-8 h-1 rounded ${i < step ? 'bg-indigo-600' : 'bg-indigo-100'}`}></div>}
                </div>
              ))}
            </div>
            <h2 className="text-xl font-bold text-indigo-700 mb-4 text-center">{pasos[step]}</h2>
            {/* Paso 1 */}
            {step === 0 && (
              <form onSubmit={e => {e.preventDefault(); if(validStep1) setStep(1);}} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Fecha</label>
                  <input type="date" className="border rounded-lg px-4 py-2 w-full" value={fecha} onChange={e => setFecha(e.target.value)} required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Hora</label>
                  <input type="time" className="border rounded-lg px-4 py-2 w-full" value={hora} onChange={e => setHora(e.target.value)} required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Duración (horas)</label>
                  <input type="number" min={1} max={8} className="border rounded-lg px-4 py-2 w-full" value={duracion} onChange={e => setDuracion(Number(e.target.value))} required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Color del uniforme</label>
                  <input type="color" className="w-12 h-8 p-0 border-2 border-indigo-200 rounded-lg" value={colorUniforme} onChange={e => setColorUniforme(e.target.value)} />
                </div>
                <button type="submit" disabled={!validStep1} className={`w-full py-2 rounded-lg font-bold text-white transition ${validStep1 ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-200 cursor-not-allowed'}`}>Siguiente</button>
              </form>
            )}
            {/* Paso 2 */}
            {step === 1 && (
              <form onSubmit={e => {e.preventDefault(); handleReservar();}} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Mensaje para el jugador</label>
                  <textarea className="border rounded-lg px-4 py-2 w-full min-h-[60px]" value={mensaje} onChange={e => setMensaje(e.target.value)} placeholder="Escribe un mensaje..." />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Método de pago</label>
                  <div className="flex gap-3">
                    {metodosPago.map(m => (
                      <label key={m.value} className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition ${metodoPago === m.value ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200'}`}>
                        <input type="radio" name="metodoPago" value={m.value} checked={metodoPago === m.value} onChange={() => setMetodoPago(m.value)} className="accent-indigo-600" />
                        <span>{m.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => setStep(0)} className="flex-1 py-2 rounded-lg font-bold bg-gray-100 text-indigo-700 hover:bg-gray-200 transition">Atrás</button>
                  <button type="submit" className="flex-1 py-2 rounded-lg font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition">Reservar</button>
                </div>
                {loading && <div className="flex justify-center mt-2"><div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div></div>}
                {error && <div className="text-red-600 text-center font-semibold mt-2">{error}</div>}
              </form>
            )}
            {/* Paso 3: Confirmación */}
            {step === 2 && (
              <div className="flex flex-col items-center justify-center py-8">
                {exito ? (
                  <>
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 15 }}>
                      <svg className="w-20 h-20 text-green-500 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="white" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12l2 2 4-4" /></svg>
                    </motion.div>
                    <div className="text-2xl font-bold text-green-600 mb-2">¡Reserva exitosa!</div>
                    <div className="text-gray-700 text-center mb-4">Tu reserva ha sido enviada a <span className="font-semibold text-indigo-700">{jugador?.nombre}</span>. Recibirás una notificación cuando sea confirmada.</div>
                    <button onClick={handleClose} className="mt-2 px-6 py-2 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition">Cerrar</button>
                  </>
                ) : (
                  <>
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 15 }}>
                      <svg className="w-20 h-20 text-red-500 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="white" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 9l-6 6m0-6l6 6" /></svg>
                    </motion.div>
                    <div className="text-2xl font-bold text-red-600 mb-2">¡Error en la reserva!</div>
                    <div className="text-gray-700 text-center mb-4">Ocurrió un problema al procesar tu reserva. Intenta nuevamente.</div>
                    <button onClick={handleClose} className="mt-2 px-6 py-2 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition">Cerrar</button>
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