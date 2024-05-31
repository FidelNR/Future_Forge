# Future Forge

### Dashboard

Este proyecto es un sistema constituido por un dashboard que muestra diversas graficas que representan los resultados de dos pruebas:

- Pruebas de orientación vocacional
- Pruebas de estilos de aprendizaje

Ademas permite mostrar los usuarios que sean registrado mostrando datos personales sobre ellos, sus intereses profesionales y laborales en una tabla.

### Formulario

Permite ingresar cierta información sobre los usuarios, para poder tener un registro sobre quien se registro y conocer de cada usuario sus intereses, condiciones laborales y profesionales en general, que despues se despliegan en la tabla que esta en el dashboard.

## Instalación de frontend

Se debe copiar el link del repositorio <https://github.com/FidelNR/Future_Forge.git> y pegarlo en su terminal con la ruta donde se quiera guardar para ejecutar el comando git clone.
```

C:\> git clone https://github.com/FidelNR/Future_Forge.git
```

Luego, se debe navegar hasta la carpeta donde esta el proyecto para instalar las dependencias que el proyecto utiliza para funcionar con el comando:

```
npm install
```

## Ejecución

Por ultimo, para ejecutar el proyecto y ver su contenido y funcionamiento se utiliza el comando:

```
npm run dev
```

## Instalación del backend

Se deben realizar los mismos pasos de instalación del frontend, para desplegarlo sin problemas

Pero como paso extra, si es necesario, dentro de esta constante que se encuentra en App se debe descomentar y cambiar la URL que aparece en *origin* por la url que se usa cuando se ejecuta su frontend, si es la misma que ya se encuentra, no realice la modificación.

```js
const corsOptions = {
    //origin: 'http://localhost:5173', // URL desde la cual se permitirán las solicitudes
    methods: ['GET', 'POST'], // Métodos HTTP permitidos
    optionsSuccessStatus: 200 // Código de estado para respuestas OPTIONS exitosas
  };
```

Para su ejecución es tambien con el comando:

```
npm run dev
```

## Vistas

### Dashboard

![Imagen del dashboard](/images/dashboard.png)

Se ve un encabezado de fondo oscuro, mostrando el titulo de la aplicación y un botón que permite navegar al formulario.

En esta ventana se puede apreciar dos graficas que describen el numero de usuarios de Future Forge que pertenecen a cada area profesional respecto al test vocacional y el numero de usuarios que pertenecen al test de estilos aprendizaje segun sus resultados.

Ademas se despliega una tabla que muestran los usuarios registrados en el formulario que describe la información personal de cada uno, sus intereses profesionales y laborales.

### Formulario

![Imagen del formulario](/images/formulario.png)

En esta ventana se puede apreciar un formulario que permite a los usuarios registrarse y proporcionar información personal, academica y laboral, que es desplegada en una tabla en el dashboard.

El botón de *Enviar* permite almacenar la información agregada en los campos e indica cuando el formulario fue enviado correctamente y el botón de *Principal* navega hacia la vista del dashboard.

El formulario tiene todos los campos validados para tener información adecuada y que los campos esten todos completados.

## Pruebas

### Prueba para verificar renderizado

En esta prueba nos aseguramos de que el componente Dashboard sea renderizado satisfactoriamente para evitar situaciones negativas con el diseño UI.

```js
test('renderizar el "Dashboard"', () => {
  render(
    <MemoryRouter>
      <Dashboard />
    </MemoryRouter>
  );
```

### Prueba de envio de datos en el formulario

Con esta prueba se verifica que se envien correctamente los campos necesarios para la prueba, que se llenen de forma adecuada los campos de texto y que el evento del botón funcione bien, cuando se realiza la inserción.

```js
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
```
