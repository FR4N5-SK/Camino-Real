import { useContext, useState } from "react";
import logo from "../../public/logo.png"
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";

function Navbar() {
    const [sidebar, setSidebar] = useState(false)

    const { token, admin, actionLogout } = useContext(Context);

    const logout = e => {
      actionLogout()
      navigate('/')
    };

  return (
    <>
      <header>
        <nav className="bg-white">
          <div className="w-full h-[80px] z-10 shadow-xl flex flex-wrap items-center justify-between mx-auto p-4 border-b-2 border-gray-300 relative">
            <a className="flex items-center space-x-2 rtl:space-x-reverse">
              <img src={logo} className="h-8 rounded-md" alt="Flowbite Logo" />
              <span className="self-center text-xl font-bold text-AzulA font-Inter whitespace-nowrap">
                CaminoReal
              </span>
            </a>
            <button
              data-collapse-toggle="navbar-solid-bg"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="navbar-solid-bg"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <span onClick={(e) => setSidebar(!sidebar)}>
                <FaBars className="w-6 h-6 text-AzulA" />
              </span>
            </button>
            <div
              className={` ${
                sidebar
                  ? "top-[70px] md:top-[90px] lg:top-0"
                  : "-top-[500%] lg:top-0"
              } -z-10 right-0 p-2 absolute lg:relative transition-all duration-1000 w-full lg:block lg:w-auto`}
              id="navbar-solid-bg"
            >
              <ul className="flex flex-col font-medium -z-10 mt-4 rounded-lg border border-gray-200 bg-gray-100 lg:space-x-8 rtl:space-x-reverse lg:flex-row md:mt-0 lg:border-0 lg:bg-transparent">
                <li>
                  <Link
                    to={"/"}
                    className="block py-2 px-3 lg:p-0 text-AzulA hover:bg-RojoA hover:text-white rounded-sm transition-all duration-300 lg:bg-transparent lg:text-AzulA lg:hover:bg-transparent lg:hover:text-RojoA"
                    aria-current="page"
                  >
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/buscar-hoteles"}
                    className="block py-2 px-3 lg:p-0 text-AzulA hover:bg-RojoA hover:text-white rounded-sm transition-all duration-300 lg:hover:bg-transparent lg:border-0 lg:hover:text-RojoA "
                  >
                    Buscar
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/ofertas-promociones"}
                    className="block py-2 px-3 lg:p-0 text-AzulA hover:bg-RojoA hover:text-white rounded-sm transition-all duration-300 lg:hover:bg-transparent lg:border-0 lg:hover:text-RojoA"
                  >
                    Promociones
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/rutas-turisticas"}
                    className="block py-2 px-3 lg:p-0 text-AzulA hover:bg-RojoA hover:text-white rounded-sm transition-all duration-300 lg:hover:bg-transparent lg:border-0 lg:hover:text-RojoA"
                  >
                    Turísmo
                  </Link>
                </li>
                {token != "Invalid" ? (
                  <>
                    <li>
                      <a onClick={logout} className="hover:cursor-pointer block py-2 px-3 lg:p-0 text-AzulA hover:bg-RojoA hover:text-white rounded-sm transition-all duration-300 lg:hover:bg-transparent lg:border-0 lg:hover:text-RojoA">
                        Logout
                      </a>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link
                        to={"/login"}
                        className="block py-2 px-3 lg:p-0 text-AzulA hover:bg-RojoA hover:text-white rounded-sm transition-all duration-300 lg:hover:bg-transparent lg:border-0 lg:hover:text-RojoA"
                      >
                        Login
                      </Link>
                    </li>
                  </>
                )}

                {admin ? (
                  <>
                    {" "}
                    <li>
                      <Link
                        to={"/panel-admin"}
                        className="block py-2 px-3 lg:p-0 text-AzulA hover:bg-RojoA hover:text-white rounded-sm transition-all duration-300 lg:hover:bg-transparent lg:border-0 lg:hover:text-RojoA"
                      >
                        Admin
                      </Link>
                    </li>
                  </>
                ) : (
                  <></>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
