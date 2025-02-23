import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from "./views/Home";
import Login from './views/Login';
import Singup from './views/Singup';
import Promotion from './views/Promotion';
import Turismo from './views/Turismo';
import Search from './views/Search';
import OptionsAdmin from './admin/OptionsAdmin';

/*Enrutador de la web*/
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/singup",
    element: <Singup />,
  },
  {
    path: "/ofertas-promociones",
    element: <Promotion />,
  },
  {
    path: "/rutas-turisticas",
    element: <Turismo />,
  },
  {
    path: "/buscar-hoteles",
    element: <Search />,
  },
  {
    path: "/panel-admin",
    element: <OptionsAdmin />,
  },
  {
    path: "*",
    element: (
      <h2 className="text-3xl font-bold underline font-barlow-condensed">
        {" "}
        Pagina de Error
      </h2>
    ),
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App
