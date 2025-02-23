import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import FiltroLocation from "../components/forms/FiltroLocation";
import Navbar from "../components/Navbar";
import { Pagination } from "../components/Pagination";
import CardTurismo from "../components/cards/CardTurismo";
import { Context } from "../context/Context";
import CardLogin from "../components/cards/CardLogin";
import { Spinner } from "flowbite-react";

function Turismo() {
    const { token, loader, viajes } = useContext(Context);
    const [pagina, setPagina] = useState(1);
    const [porPagina, setPorPagina] = useState(8);
    const [data, setData] = useState([])

    const maximo = Math.ceil(data.length / porPagina);

    useEffect(() => {
      const setChange = () => {
        setData(viajes);
      };
      setChange();
    }, [viajes]);
  return (
    <>
      <Navbar />

      <main className="w-full min-h-[100vh]">
        <section className="w-full bg-turismo h-[275px] bg-cover bg-center"></section>

        <section className="w-full px-4 md:px-6 py-6 font-Inter mb-6">
          <h3 className="font-bold text-AzulA text-lg mb-4">
            Las mejores rutas para conocer nuestro hermoso país de Venezuela.
          </h3>
          <p className="text-AzulA text-sm mb-4">
            Para comprar estas rutas debes estar registrado a CaminoReal.
          </p>
          {token != "Invalid" ? <></> : <CardLogin />}
        </section>

        <section className="w-full px-4 md:px-6 mb-10">
          <FiltroLocation data={data} setData={setData} type={"viaje"}/>
        </section>

        <section className="w-full px-4 md:px-6 mb-10 flex flex-col gap-8">
          <ul className="w-full flex flex-wrap justify-center gap-8">
            {loader ? (
              <Spinner color="info" aria-label="Extra large spinner example" size="xl" />
            ) : data.length === 0 ? (
              <>
                <h4 className="text-AzulA text-xl mt-6 font-bold">
                  No hay Rutas de Viaje disponibles
                </h4>
              </>
            ) : (
              data
                .slice(
                  (pagina - 1) * porPagina,
                  (pagina - 1) * porPagina + porPagina
                )
                .map((item, key) => (
                  <li>
                    <CardTurismo key={key} textColor={"AzulA"} item={item} />
                  </li>
                ))
            )}
          </ul>
          {
            loader ? (<></>) : (data.length === 0 ? (
              <></>
            ) : (
              <Pagination pagina={pagina} setPagina={setPagina} maximo={maximo} />
            ))
          }
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Turismo;
