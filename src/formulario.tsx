// App.js
import { useState } from 'react';
import './styleForm.css';
import { useNavigate } from 'react-router-dom';
import { sendFormData } from './api/api';

function App() {
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [genero, setGenero] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [areaInteres, setAreaInteres] = useState('');
  const [nivelEducativo, setNivelEducativo] = useState('');
  const [tipoTrabajo, setTipoTrabajo] = useState('');
  const [mensaje, setMensaje] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!nombre || !edad || !genero || !ciudad || !areaInteres || !nivelEducativo || !tipoTrabajo) {
      setMensaje('Por favor, completa todos los campos.');
      return;
    }

    if (edad <= '0') {
      setMensaje('Edad no válida.');
      return;
    }

    const formData = {
      nombre,
      edad,
      genero,
      ciudad,
      areaInteres,
      nivelEducativo,
      tipoTrabajo
    };

    try {
      await sendFormData(formData);
      setMensaje('Datos insertados correctamente.');
    } catch (error) {
      console.error('Error:', error);
      setMensaje('Error al insertar los datos.');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <h2>Formulario de Datos</h2>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="form-input"
        />
        <input
          type="number"
          placeholder="Edad"
          value={edad}
          onChange={(e) => setEdad(e.target.value)}
          className="form-input"
        />
        <select value={genero} onChange={(e) => setGenero(e.target.value)} className="form-select">
          <option value="">Seleccione Género</option>
          <option value="Hombre">Hombre</option>
          <option value="Mujer">Mujer</option>
          <option value="Otro">Otro</option>
        </select>
        <input
          type="text"
          placeholder="Ciudad"
          value={ciudad}
          onChange={(e) => setCiudad(e.target.value)}
          className="form-input"
        />
        <select value={areaInteres} onChange={(e) => setAreaInteres(e.target.value)} className="form-select">
          <option value="">Seleccione Área de Interés</option>
          <option value="Ciencias">Ciencias</option>
          <option value="Artes">Artes</option>
          <option value="Tecnología">Tecnología</option>
          <option value="Negocios">Negocios</option>
          <option value="Humanidades">Humanidades</option>
        </select>
        <select value={nivelEducativo} onChange={(e) => setNivelEducativo(e.target.value)} className="form-select">
          <option value="">Seleccione Nivel Educativo</option>
          <option value="Secundaria">Secundaria</option>
          <option value="Bachillerato">Bachillerato</option>
          <option value="Licenciatura">Licenciatura</option>
          <option value="Maestría">Maestría</option>
          <option value="Doctorado">Doctorado</option>
        </select>
        <select value={tipoTrabajo} onChange={(e) => setTipoTrabajo(e.target.value)} className="form-select">
          <option value="">Seleccione Tipo de Trabajo</option>
          <option value="Tiempo completo">Tiempo completo</option>
          <option value="Medio tiempo">Medio tiempo</option>
          <option value="Freelance">Freelance</option>
        </select>
        <button type="submit" className="form-button">Enviar</button>
        <button type="button" onClick={() => navigate("/")} className="form-button">Principal</button>
        {mensaje && <p className="form-message">{mensaje}</p>}
      </form>
    </div>
  );
}

export default App;
