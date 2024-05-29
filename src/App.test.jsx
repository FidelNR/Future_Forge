import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from './dashboard'
import Formulario from './formulario'
import * as authApi from './api/api'
import { vi } from 'vitest';

test('renderizar el "Dashboard"', () => {
  render(
    <MemoryRouter>
      <Dashboard />
    </MemoryRouter>
  );

  expect(screen.getByText('Formulario')).toBeInTheDocument();
});

test('Verificar envío del formulario', async () => {
  const mockResponse = {
    nombre: 'fidel',
    edad: '21',
    genero: 'Hombre',
    ciudad: 'colima',
    areaInteres: 'Ciencias',
    nivelEducativo: 'Secundaria',
    tipoTrabajo: 'Freelance',
  };

  // Espiar la función sendFormData
  vi.spyOn(authApi, 'sendFormData').mockResolvedValue(mockResponse);

  render(
    <MemoryRouter>
      <Formulario />
    </MemoryRouter>
  );

  // Simula el llenado del formulario
  fireEvent.change(screen.getByPlaceholderText('Nombre'), { target: { value: 'fidel' } });
  fireEvent.change(screen.getByPlaceholderText('Edad'), { target: { value: '21' } });
  fireEvent.change(screen.getByPlaceholderText('Ciudad'), { target: { value: 'colima' } });

  // Simula el envío del formulario
  fireEvent.submit(screen.getByRole('button', { name: /Enviar/i }));
});



/////////////////////////////////////////////////////////////////////////////////////////////

const mockData = [
  { vocacional: 'Ciencias', resultadovo: 25, aprendizaje: 'Biología', resultadoapre: 30 },
  { vocacional: 'Artes', resultadovo: 15, aprendizaje: 'Música', resultadoapre: 20 },
  { vocacional: 'Tecnología', resultadovo: 35, aprendizaje: 'Informática', resultadoapre: 40 },
  { vocacional: 'Negocios', resultadovo: 25, aprendizaje: 'Economía', resultadoapre: 10 },
];

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockData),
  })
);

test('recuperar y mostrar datos correctamente en las gráficas del Dashboard', async () => {
  render(
    <MemoryRouter>
      <Dashboard />
    </MemoryRouter>
  );

  // Espera a que los datos se carguen y las gráficas se rendericen
  await waitFor(() => {
    expect(screen.getByText('Gráfica Vocacional')).toBeInTheDocument();
    expect(screen.getByText('Gráfica de Aprendizaje')).toBeInTheDocument();
  });

  // Verifica que los textos específicos de las etiquetas están en el documento
  expect(screen.getByText('Ciencias')).toBeInTheDocument();
  expect(screen.getByText('Artes')).toBeInTheDocument();
  expect(screen.getByText('Tecnología')).toBeInTheDocument();
  expect(screen.getByText('Negocios')).toBeInTheDocument();
  expect(screen.getByText('Biología')).toBeInTheDocument();
  expect(screen.getByText('Música')).toBeInTheDocument();
  expect(screen.getByText('Informática')).toBeInTheDocument();
  expect(screen.getByText('Economía')).toBeInTheDocument();
});