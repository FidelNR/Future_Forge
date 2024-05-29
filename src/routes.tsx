import Dashboard from "./dashboard";
import Formulario from './formulario'


const routes = [
    {
        path:"/",
        element: <Dashboard/>,
      },
      {
        path: "formulario",
        element: <Formulario/>,
      },
];

export default routes;