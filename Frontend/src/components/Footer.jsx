import { Link } from "react-router-dom";
import logo from "../../public/logo.png"

function Footer() {
  return (
    <>
      <footer className="bg-Crema border-t border-gray-300 shadow w-full">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <a className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
              <img src={logo} className="h-8 rounded-md" alt="Flowbite Logo" />
              <span className="self-center text-xl font-bold text-AzulA font-Inter whitespace-nowrap">
                CaminoReal
              </span>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-AzulA sm:mb-0">
              <li>
                <Link to={"/"} className="hover:text-RojoA hover:underline me-4 md:me-6">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to={"/rutas-turisticas"} className="hover:text-RojoA hover:underline me-4 md:me-6">
                  Turismo
                </Link>
              </li>
              <li>
                <Link to={"/ofertas-promociones"} className="hover:text-RojoA hover:underline me-4 md:me-6">
                  Promociones
                </Link>
              </li>
              <li>
                <Link to={"/buscar-hoteles"} className="hover:text-RojoA hover:underline">
                  Buscar
                </Link>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-AzulA sm:mx-auto lg:my-8" />
          <span className="block text-sm text-gray-500 sm:text-center">
            © 2025 <a>CaminoReal™</a>. Todos los derechos reservados.
          </span>
        </div>
      </footer>
    </>
  );
}

export default Footer;
