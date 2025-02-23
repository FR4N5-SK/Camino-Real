import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import FiltroLocation from "../components/forms/FiltroLocation";
import Navbar from "../components/Navbar";
import { Pagination } from "../components/Pagination";
import CardHotel from "../components/cards/CardHotel";
import CardLogin from "../components/cards/CardLogin";
import { Context } from "../context/Context";
import { Spinner } from "flowbite-react";


function Search() {
    const { token, loader, peticionAllHoteles, hoteles } = useContext(Context);

    const [pagina, setPagina] = useState(1);
    const [porPagina, setPorPagina] = useState(12);
    const [data, setData] = useState([])
  
    const maximo = Math.ceil(data.length / porPagina);

    useEffect(() => {
      const setChange = () => {
        setData(hoteles)
      }
      setChange()
    }, [hoteles]);
  return (
    <>
      <Navbar />

      <main className="w-full min-h-[100vh]">
        <section className="w-full bg-hotel h-[275px] bg-cover bg-center"></section>

        <section className="w-full px-4 md:px-6 py-6 font-Inter mb-6">
          <h3 className="font-bold text-AzulA text-lg mb-4">
            Conoce tu destino ideal en Venezuela.
          </h3>
          <div className="mb-4">
            <p className="text-AzulA text-sm">({hoteles.length} Opciones Disponibles)</p>
            <p className="text-AzulA font-bold text-sm">
              Incluye con promociones
            </p>
          </div>
          {token != "Invalid" ? <></> : <CardLogin />}
        </section>

        <section className="w-full px-4 md:px-6 mb-10">
          <FiltroLocation data={data} setData={setData} type={"hotel"}/>
        </section>

        <section className="w-full px-4 md:px-6 mb-10 flex flex-col gap-8">
          <ul className="w-full flex flex-wrap gap-8 justify-center">
            {loader ? (
              <Spinner color="info" aria-label="Extra large spinner example" size="xl" />
            ) : data.length === 0 ? (
              <>
                <h4 className="text-AzulA text-xl mt-6 font-bold">
                  No hay hoteles disponibles
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
                    <CardHotel key={key} item={item} textColor={"AzulA"} />
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

export default Search;
