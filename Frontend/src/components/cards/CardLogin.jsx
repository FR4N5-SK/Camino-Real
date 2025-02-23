import { IoLogIn } from "react-icons/io5";
import { Link } from "react-router-dom";

function CardLogin() {
  return (
    <>
      <article className="w-full bg-AzulA rounded-md p-2 py-4 md:flex md:gap-2">
        <div className="flex gap-2 items-center justify-center mb-2 md:mb-0 w-[70%]">
          <div>
            <IoLogIn className="text-white text-[60px]" />
          </div>
          <p className="font-Inter font-semibold text-white text-xs">
            Inicia Sesión para acceder a las opciones de reservar, descuentos,
            promociones y reseñas
          </p>
        </div>
        <div className="w-full md:w-[30%] ">
          <button className="p-2 rounded-lg w-full h-full md:h-[60px]  flex font-medium text-sm bg-AzulC text-white hover:bg-AzulB transition-all duration-300">
            <Link to={"/login"} className="w-full flex justify-center items-center">
              Iniciar Sesión
            </Link>
          </button>
        </div>
      </article>
    </>
  );
}

export default CardLogin;
