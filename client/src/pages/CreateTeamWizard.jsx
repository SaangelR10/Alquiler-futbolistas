import React, { useState } from 'react';
import { FiCheckCircle, FiAlertCircle, FiChevronRight, FiChevronLeft, FiUpload } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const steps = [
  'Datos básicos',
  'Logo del equipo',
  'Integrantes',
  'Confirmación',
];

const initialData = {
  nombre: '',
  ciudad: '',
  descripcion: '',
  logo: null,
  integrantes: [{ nombre: '', rol: '' }],
  contacto: '',
};

const ciudades = ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Otra'];
const rolOptions = [
  'Portero',
  'Técnico',
  'Delantero',
  'Defensa',
  'Central',
  'Extremo',
];
const redesOptions = [
  { label: 'Instagram', value: 'instagram', icon: <svg className="w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 2.75a5.75 5.75 0 1 1 0 11.5a5.75 5.75 0 0 1 0-11.5zm0 1.5a4.25 4.25 0 1 0 0 8.5a4.25 4.25 0 0 0 0-8.5zm5.25 1.25a1 1 0 1 1 0 2a1 1 0 0 1 0-2z"/></svg> },
  { label: 'X', value: 'x', icon: <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M17.53 6.47a.75.75 0 0 1 1.06 1.06l-4.72 4.72 4.72 4.72a.75.75 0 0 1-1.06 1.06l-4.72-4.72-4.72 4.72a.75.75 0 0 1-1.06-1.06l4.72-4.72-4.72-4.72a.75.75 0 0 1 1.06-1.06l4.72 4.72 4.72-4.72z"/></svg> },
  { label: 'Facebook', value: 'facebook', icon: <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M17 2.1A5 5 0 0 1 22 7v10a5 5 0 0 1-5 4.9H7A5 5 0 0 1 2 17V7a5 5 0 0 1 5-4.9h10zm-2.5 4.4h-1.5c-.3 0-.5.2-.5.5v1.5h2l-.3 2h-1.7v5h-2v-5H8v-2h1.5V7.5A2.5 2.5 0 0 1 12 5h2.5v1.5z"/></svg> },
  { label: 'TikTok', value: 'tiktok', icon: <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M12.75 2a.75.75 0 0 1 .75.75v14.5a2.75 2.75 0 1 1-1.5-2.45V3.5a.75.75 0 0 1 .75-.75zm6.5 2.5a.75.75 0 0 1 .75.75v2.5a4.25 4.25 0 0 1-4.25 4.25h-1.5v-1.5h1.5a2.75 2.75 0 0 0 2.75-2.75v-2.5a.75.75 0 0 1 .75-.75z"/></svg> },
];

function CreateTeamWizard() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [logoPreview, setLogoPreview] = useState(null);
  const [success, setSuccess] = useState(false);
  const [redes, setRedes] = useState([]);
  const [nuevaRed, setNuevaRed] = useState({ tipo: '', usuario: '' });
  const navigate = useNavigate();

  // Validaciones por paso
  const validateStep = () => {
    let err = {};
    if (step === 0) {
      if (!data.nombre.trim()) err.nombre = 'El nombre es obligatorio';
      if (!data.ciudad) err.ciudad = 'Selecciona una ciudad';
      if (!data.descripcion.trim()) err.descripcion = 'Agrega una descripción';
    }
    if (step === 1) {
      if (!data.logo) err.logo = 'El logo es obligatorio';
    }
    if (step === 2) {
      data.integrantes.forEach((int, idx) => {
        if (!int.nombre.trim()) err[`integrante-nombre-${idx}`] = 'Nombre requerido';
        if (!int.rol.trim()) err[`integrante-rol-${idx}`] = 'Rol requerido';
      });
    }
    if (step === 3) {
      if (!data.contacto.trim()) err.contacto = 'Agrega un contacto';
      if (!/^\+?\d{7,15}$/.test(data.contacto.trim())) err.contacto = 'Número inválido';
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // Manejo de cambios
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Manejo de logo
  const handleLogo = (e) => {
    const file = e.target.files[0];
    if (file) {
      setData({ ...data, logo: file });
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  // Integrantes
  const handleIntegranteChange = (idx, field, value) => {
    const nuevos = [...data.integrantes];
    nuevos[idx][field] = value;
    setData({ ...data, integrantes: nuevos });
  };
  const addIntegrante = () => {
    setData({ ...data, integrantes: [...data.integrantes, { nombre: '', rol: '' }] });
  };
  const removeIntegrante = (idx) => {
    const nuevos = data.integrantes.filter((_, i) => i !== idx);
    setData({ ...data, integrantes: nuevos });
  };

  // Manejo de redes sociales
  const handleAddRed = () => {
    if (nuevaRed.tipo && nuevaRed.usuario) {
      setRedes([...redes, nuevaRed]);
      setNuevaRed({ tipo: '', usuario: '' });
    }
  };
  const handleRemoveRed = idx => setRedes(redes.filter((_, i) => i !== idx));

  // Navegación
  const next = () => {
    if (validateStep()) setStep(step + 1);
  };
  const prev = () => setStep(step - 1);

  // Simular envío
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      setTimeout(() => setSuccess(true), 1200);
    }
  };

  // Renderizado de pasos
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-blue-50 to-sky-100 py-8 px-2">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl p-8 relative animate-fade-in">
        {/* Botón Volver */}
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 top-4 md:static md:mb-4 flex items-center gap-2 bg-white/80 hover:bg-white text-indigo-700 font-semibold px-4 py-2 rounded-full shadow transition-all duration-200 backdrop-blur z-10 focus:outline-none mt-2 md:mt-0 mb-4 md:mb-0"
          style={{ position: 'relative', top: 0 }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          Volver
        </button>
        {/* Stepper visual */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg border-2 transition-all duration-300
                ${i < step ? 'bg-emerald-500 text-white border-emerald-500' : i === step ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg' : 'bg-indigo-100 text-indigo-600 border-indigo-200'}`}>{i + 1}</div>
              {i < steps.length - 1 && <div className={`w-8 h-1 rounded ${i < step ? 'bg-emerald-500' : 'bg-indigo-100'}`}></div>}
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-extrabold text-indigo-700 mb-6 text-center">{steps[step]}</h2>
        {/* Paso 1: Datos básicos */}
        {step === 0 && (
          <form className="space-y-5" onSubmit={e => { e.preventDefault(); next(); }}>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre del equipo</label>
              <input name="nombre" value={data.nombre} onChange={handleChange} className={`border rounded-lg px-4 py-2 w-full ${errors.nombre ? 'border-red-400' : 'border-indigo-200'}`} />
              {errors.nombre && <span className="text-red-500 text-xs flex items-center gap-1 mt-1"><FiAlertCircle /> {errors.nombre}</span>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Ciudad</label>
              <select name="ciudad" value={data.ciudad} onChange={handleChange} className={`border rounded-lg px-4 py-2 w-full ${errors.ciudad ? 'border-red-400' : 'border-indigo-200'}`}>
                <option value="">Selecciona una ciudad</option>
                {ciudades.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              {errors.ciudad && <span className="text-red-500 text-xs flex items-center gap-1 mt-1"><FiAlertCircle /> {errors.ciudad}</span>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Descripción</label>
              <textarea name="descripcion" value={data.descripcion} onChange={handleChange} className={`border rounded-lg px-4 py-2 w-full min-h-[60px] ${errors.descripcion ? 'border-red-400' : 'border-indigo-200'}`}/>
              {errors.descripcion && <span className="text-red-500 text-xs flex items-center gap-1 mt-1"><FiAlertCircle /> {errors.descripcion}</span>}
            </div>
            <div className="flex justify-end mt-6">
              <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-2 rounded-xl shadow transition-all">Siguiente <FiChevronRight className="inline ml-1" /></button>
            </div>
          </form>
        )}
        {/* Paso 2: Logo */}
        {step === 1 && (
          <form className="space-y-5" onSubmit={e => { e.preventDefault(); next(); }}>
            <div className="flex flex-col items-center gap-3">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Logo del equipo <span className="text-red-500">*</span></label>
              <div className="w-28 h-28 rounded-full border-4 border-indigo-200 flex items-center justify-center bg-indigo-50 overflow-hidden mb-2">
                {logoPreview ? (
                  <img src={logoPreview} alt="Logo preview" className="object-cover w-full h-full" />
                ) : (
                  <FiUpload className="text-indigo-400 text-4xl" />
                )}
              </div>
              <input type="file" accept="image/*" onChange={handleLogo} className="hidden" id="logo-upload" />
              <label htmlFor="logo-upload" className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-2 rounded-xl shadow transition-all">Subir logo</label>
              {errors.logo && <span className="text-red-500 text-xs flex items-center gap-1 mt-1"><FiAlertCircle /> {errors.logo}</span>}
            </div>
            <div className="flex justify-between mt-6">
              <button type="button" onClick={prev} className="bg-gray-100 hover:bg-gray-200 text-indigo-700 font-bold px-8 py-2 rounded-xl shadow transition-all flex items-center"><FiChevronLeft className="inline mr-1" />Atrás</button>
              <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-2 rounded-xl shadow transition-all">Siguiente <FiChevronRight className="inline ml-1" /></button>
            </div>
          </form>
        )}
        {/* Paso 3: Integrantes */}
        {step === 2 && (
          <form className="space-y-5" onSubmit={e => { e.preventDefault(); next(); }}>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Integrantes</label>
              {data.integrantes.map((int, idx) => (
                <div key={idx} className="flex gap-2 mb-2 items-center">
                  <input
                    type="text"
                    placeholder="Nombre"
                    value={int.nombre}
                    onChange={e => handleIntegranteChange(idx, 'nombre', e.target.value)}
                    className={`border rounded-lg px-3 py-2 flex-1 ${errors[`integrante-nombre-${idx}`] ? 'border-red-400' : 'border-indigo-200'}`}
                  />
                  <select
                    value={int.rol}
                    onChange={e => handleIntegranteChange(idx, 'rol', e.target.value)}
                    className={`border rounded-lg px-3 py-2 flex-1 ${errors[`integrante-rol-${idx}`] ? 'border-red-400' : 'border-indigo-200'}`}
                  >
                    <option value="">Rol</option>
                    {rolOptions.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                  {data.integrantes.length > 1 && (
                    <button type="button" onClick={() => removeIntegrante(idx)} className="text-red-500 font-bold text-lg px-2">×</button>
                  )}
                </div>
              ))}
              <button type="button" onClick={addIntegrante} className="mt-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-2 rounded-xl shadow transition-all">+ Agregar integrante</button>
              {/* Errores de integrantes */}
              {Object.keys(errors).filter(k => k.startsWith('integrante')).map(k => (
                <span key={k} className="block text-red-500 text-xs flex items-center gap-1 mt-1"><FiAlertCircle /> {errors[k]}</span>
              ))}
            </div>
            <div className="flex justify-between mt-6">
              <button type="button" onClick={prev} className="bg-gray-100 hover:bg-gray-200 text-indigo-700 font-bold px-8 py-2 rounded-xl shadow transition-all flex items-center"><FiChevronLeft className="inline mr-1" />Atrás</button>
              <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-2 rounded-xl shadow transition-all">Siguiente <FiChevronRight className="inline ml-1" /></button>
            </div>
          </form>
        )}
        {/* Paso 4: Confirmación */}
        {step === 3 && !success && (
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-full border-4 border-indigo-300 bg-white shadow-lg flex items-center justify-center overflow-hidden mb-2">
                {logoPreview && <img src={logoPreview} alt="Logo preview" className="object-cover w-full h-full" />}
              </div>
              <div className="text-2xl font-extrabold text-indigo-800 mb-1">{data.nombre}</div>
              <div className="text-indigo-500 font-semibold mb-2">{data.ciudad}</div>
            </div>
            <div className="bg-indigo-50 rounded-xl p-4 mb-2 shadow-sm">
              <div className="text-gray-700 mb-2"><span className="font-semibold">Descripción:</span> {data.descripcion}</div>
              <div className="mb-2">
                <span className="font-semibold text-gray-700">Integrantes:</span>
                <ul className="mt-1 flex flex-wrap gap-2">
                  {data.integrantes.map((i, idx) => (
                    <li key={idx} className="flex items-center gap-2 bg-white border border-indigo-100 rounded-full px-3 py-1 shadow-sm">
                      <span className="font-semibold text-indigo-700">{i.nombre}</span>
                      {i.rol && <span className="text-xs bg-indigo-100 text-indigo-600 rounded-full px-2 py-0.5 ml-1">{i.rol}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white border border-indigo-100 rounded-xl px-4 py-3 shadow-sm mb-2">
              <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 0 1 2-2h2.28a2 2 0 0 1 1.7.89l1.42 2.13a2 2 0 0 0 1.7.89h3.8a2 2 0 0 0 1.7-.89l1.42-2.13A2 2 0 0 1 16.72 3H19a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" /></svg>
              <span className="font-semibold text-gray-700">Teléfono:</span>
              <span className="text-indigo-700 font-bold">{data.contacto}</span>
            </div>
            {/* Redes sociales */}
            {redes.length > 0 && (
              <div className="bg-white border border-indigo-100 rounded-xl px-4 py-3 shadow-sm mb-2">
                <div className="font-semibold text-gray-700 mb-1 flex items-center gap-2">Redes sociales:</div>
                <ul className="flex flex-wrap gap-3">
                  {redes.map((r, idx) => {
                    const red = redesOptions.find(opt => opt.value === r.tipo);
                    return (
                      <li key={idx} className="flex items-center gap-2 bg-indigo-50 rounded-full px-3 py-1 shadow-sm">
                        {red?.icon}
                        <span className="text-indigo-700 font-semibold">{red?.label}:</span>
                        <a href={r.usuario.startsWith('http') ? r.usuario : `https://${r.tipo === 'instagram' ? 'instagram.com/' : r.tipo === 'facebook' ? 'facebook.com/' : r.tipo === 'tiktok' ? 'tiktok.com/@' : 'x.com/'}${r.usuario}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{r.usuario}</a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            {/* Añadir redes sociales */}
            <div className="flex flex-col md:flex-row gap-2 items-center mb-2">
              <select value={nuevaRed.tipo} onChange={e => setNuevaRed({ ...nuevaRed, tipo: e.target.value })} className="border rounded-lg px-3 py-2">
                <option value="">Red social</option>
                {redesOptions.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
              </select>
              <input type="text" placeholder="Usuario o enlace" value={nuevaRed.usuario} onChange={e => setNuevaRed({ ...nuevaRed, usuario: e.target.value })} className="border rounded-lg px-3 py-2 flex-1" />
              <button type="button" onClick={handleAddRed} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-xl shadow transition-all">Agregar</button>
            </div>
            {redes.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {redes.map((r, idx) => (
                  <button key={idx} type="button" onClick={() => handleRemoveRed(idx)} className="text-xs bg-red-100 text-red-600 rounded-full px-2 py-0.5">Quitar {redesOptions.find(opt => opt.value === r.tipo)?.label}</button>
                ))}
              </div>
            )}
            <div className="flex justify-between mt-6">
              <button type="button" onClick={prev} className="bg-gray-100 hover:bg-gray-200 text-indigo-700 font-bold px-8 py-2 rounded-xl shadow transition-all flex items-center"><FiChevronLeft className="inline mr-1" />Atrás</button>
              <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-2 rounded-xl shadow transition-all flex items-center">Finalizar <FiCheckCircle className="inline ml-1" /></button>
            </div>
          </form>
        )}
        {/* Éxito */}
        {success && (
          <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
            <FiCheckCircle className="text-emerald-500 text-6xl mb-4" />
            <div className="text-2xl font-bold text-emerald-600 mb-2">¡Equipo creado exitosamente!</div>
            <div className="text-gray-700 text-center mb-4">Tu equipo ha sido registrado. Pronto podrás gestionarlo desde tu perfil.</div>
            <a href="/" className="mt-2 px-8 py-2 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition">Volver al inicio</a>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateTeamWizard; 