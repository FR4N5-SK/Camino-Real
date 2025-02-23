import CardLogin from "../components/cards/CardLogin";
import CarrouselServices from "../components/CarrouselServices";
import FormFiltro from "../components/forms/FormFiltro";
import Navbar from "../components/Navbar";
import cardPlata from "../assets/2.png"
import CarrouselOfertas from "../components/CarrouselOfertas";
import Footer from "../components/Footer";
import { useContext } from "react";
import { Context } from "../context/Context";
import { Link } from "react-router-dom";

function Home() {
  const { token } = useContext(Context);
  return (
    <>
      <Navbar />

      <main className="py-12 px-4 flex flex-col gap-8 md:gap-14 lg:gap-24">
        <section className="bg-hotel bg-cover bg-center bg-no-repeat w-full rounded-md ">
          <div className="w-full h-full px-3 py-8 flex flex-col gap-6 items-center rounded-md bg-black bg-opacity-50">
            <h2 className="text-white font-Inter font-bold text-3xl w-4/5">
              Conoce tu destino ideal en Venezuela
            </h2>
            <div className="w-full p-4 bg-white rounded-md">
              <FormFiltro />
            </div>
          </div>
        </section>

        {token != "Invalid" ? <></> : <CardLogin />}

        <section className="w-full flex flex-col gap-4">
          <h3 className="font-Inter font-bold text-AzulA text-xl">
            Descubre tu hospedaje favorito
          </h3>
          <CarrouselServices />
        </section>

        <section className="w-full flex flex-col lg:flex-row gap-12 lg:gap-16 bg-Crema rounded-md font-Inter">
          <div className="p-4 lg:w-full">
            <span class=" bg-black text-white text-xs font-semibold me-2 px-2.5 py-1.5 rounded-md">
              Nuevo
            </span>
            <h4 className="text-AzulA text-sm font-bold mb-4 mt-4">
              Consigue tu tarjeta aumentar tu credito en tu tarjeta hasta 1000$
              “KeyCashPass”
            </h4>
            <div className="text-black font-medium text-[10px] mb-4">
              <p>
                Al realizar compras que califiquen. Se aplican términos y
                condiciones.
              </p>
              <p>El crédito OneKeyCash no se puede canjear por efectivo.</p>
            </div>
            {token != "Invalid" ? (
              <></>
            ) : (
              <button className="flex rounded-full w-full font-medium border border-black text-xs text-AzulC hover:border-AzulB hover:text-white hover:bg-AzulB transition-all duration-300">
                <Link to={"/login"} className="p-1.5 w-full h-full">
                  Iniciar Sesion
                </Link>
              </button>
            )}
          </div>

          <div className="bg-resort bg-center bg-cover relative flex justify-center w-full lg:w-[1/4] h-[250px] rounded-b-md lg:rounded-r-md lg:rounded-bl-none">
            <img
              src={cardPlata}
              alt="Tarjeta Platino"
              className="absolute -top-14 w-28 lg:top-16 lg:-left-14"
            />
          </div>
        </section>

        <section className="bg-hotel bg-cover bg-center bg-no-repeat w-full rounded-md ">
          <div className="w-full h-full rounded-md bg-gradient-to-b from-gray-400 bg-opacity-75">
            <div className="w-full h-full px-3 py-8 rounded-md bg-gradient-to-t from-yellow-900 bg-opacity-5">
              <div className="mb-6">
                <h4 className="text-white text-sm md:text-base font-bold mb-2 mt-2">
                  Las mejores ofertas para una escapada de última hora
                </h4>
                <div className="text-white font-medium text-[10px] md:text-xs mb-3">
                  <p>
                    Todas las ofertas deben minímo estar suscrito a CaminoReal
                  </p>
                </div>
                <button className=" rounded-full w-full font-medium text-xs bg-white text-AzulC hover:text-white hover:bg-AzulB transition-all duration-300">
                  <Link
                    className="w-full h-full flex justify-center p-1.5"
                    to={"/ofertas-promociones"}
                  >
                    Ver todas las ofertas
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Home;
