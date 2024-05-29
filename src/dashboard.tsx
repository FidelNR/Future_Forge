import { useNavigate } from "react-router-dom";
import './App.css';
import { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

interface Usuario {
  id: number;
  nombre: string;
  edad: number;
  genero: string;
  ciudad: string;
  areaInteres: string;
  nivelEducativo: string;
  tipoTrabajo: string;
}

const Dashboard = () => {
  const [areasInteresData, setAreasInteresData] = useState([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/dashboard')
      .then(response => response.json())
      .then(data => {
        setAreasInteresData(data);
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      });

      fetch('http://localhost:4000/api/users')
      .then(response => response.json())
      .then(data => {
        setUsuarios(data);
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      });
  }, []);

  const datosVocacional = areasInteresData.map(({ vocacional, resultadovo }) => ({ vocacional, resultadovo }));
  const datosAprendizaje = areasInteresData.map(({ aprendizaje, resultadoapre }) => ({ aprendizaje, resultadoapre }));

  const vocacionalLabels = datosVocacional.map(item => item.vocacional);
  const vocacionalValues = datosVocacional.map(item => item.resultadovo);

  const aprendizajeLabels = datosAprendizaje.map(item => item.aprendizaje);
  const aprendizajeValues = datosAprendizaje.map(item => item.resultadoapre);

  const pieData = {
    labels: vocacionalLabels,
    datasets: [
      {
        data: vocacionalValues,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  const barData = {
    labels: aprendizajeLabels,
    datasets: [
      {
        label: 'Resultados de Aprendizaje',
        data: aprendizajeValues,
        backgroundColor: '#36A2EB',
        borderColor: '#36A2EB',
        borderWidth: 1,
      },
    ],
  };

  try {
    const navigate = useNavigate();
    return (
      <div className="dashboard-container">
        <div className="header">
          <h1>Future Forge</h1>
          <button onClick={() => navigate('/formulario')}>Formulario</button>
        </div>
        <div className="chart-container">
          <div className="chart">
            <h2>Gráfica Vocacional</h2>
            <Pie data={pieData} />
          </div>
          <div className="chart">
            <h2>Gráfica de Aprendizaje</h2>
            <Bar data={barData} />
          </div>
        </div>
        <div className="table-container">
        <h2>Lista de Usuarios</h2>
        <table className="usuarios-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Edad</th>
              <th>Género</th>
              <th>Ciudad</th>
              <th>Área de Interés</th>
              <th>Nivel Educativo</th>
              <th>Tipo de Trabajo</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map(usuario => (
              <tr key={usuario.id}>
                <td>{usuario.nombre}</td>
                <td>{usuario.edad}</td>
                <td>{usuario.genero}</td>
                <td>{usuario.ciudad}</td>
                <td>{usuario.areaInteres}</td>
                <td>{usuario.nivelEducativo}</td>
                <td>{usuario.tipoTrabajo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    );
  } catch (error) {
    console.error('Error al renderizar la gráfica:', error);
    return null;
  }
};

export default Dashboard;
