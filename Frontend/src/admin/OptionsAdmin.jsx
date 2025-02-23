import { IoLogIn } from "react-icons/io5";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { FaBuilding, FaPlaneDeparture, FaUserAlt } from "react-icons/fa";
import { RiDiscountPercentFill } from "react-icons/ri";
import { useState } from "react";
import { ModalAdminUser } from "../components/modals/ModalAdminUsers";
import { ModalAdminViajes } from "../components/modals/modalAdminViajes";
import { ModalAdminOferta } from "../components/modals/ModalAdminOferta";
import { ModalAdminHotel } from "../components/modals/ModalAdminHotel";

function OptionsAdmin() {
    const [modalUser, setModalUser] = useState(false)
    const [modalViaje, setModalViaje] = useState(false)
    const [modalOferta, setModalOferta] = useState(false)
    const [modalHotel, setModalHotel] = useState(false)

  return (
    <>
      <Navbar />

      <main className="min-h-[100vh] p-4 py-12">
        <h2 className="font-Inter font-semibold text-2xl text-AzulA mb-6">
          Opciones de Administrador
        </h2>
        <section className="flex flex-wrap gap-4 items-center justify-center">
          <article className="w-[300px] bg-AzulA rounded-md p-2 py-4 md:flex md:gap-2">
            <div className="flex gap-2 items-center justify-center w-full mb-3 md:mb-0">
              <div>
                <FaBuilding className="text-white text-[40px]" />
              </div>
              <p className="font-Inter font-semibold text-white text-xs">
                Administrador de hoteles de CaminoReal.
              </p>
            </div>
            <div className="w-full md:w-[30%] ">
              <button onClick={e => setModalHotel(!modalHotel)} className="p-2 rounded-lg w-full h-full md:h-[60px]  flex font-medium text-sm bg-AzulC text-white hover:bg-AzulB transition-all duration-300">
                <a className="w-full flex justify-center items-center">
                  Administrar
                </a>
              </button>
            </div>
          </article>

          <article className="w-[300px] bg-RojoA rounded-md p-2 py-4 md:flex md:gap-2">
            <div className="flex flex-row-reverse gap-2 items-center justify-center w-full mb-3 md:mb-0">
              <div>
                <RiDiscountPercentFill className="text-white text-[40px]" />
              </div>
              <p className="font-Inter font-semibold text-white text-xs">
                Administrar ofertas de CaminoReal.
              </p>
            </div>
            <div className="w-full md:w-[30%] ">
              <button onClick={e => setModalOferta(!modalOferta)} className="p-2 rounded-lg w-full h-full md:h-[60px] flex font-medium text-sm bg-AzulA text-white hover:bg-AzulB transition-all duration-300">
                <a className="w-full flex justify-center items-center">
                  Administrar
                </a>
              </button>
            </div>
          </article>

          <article className="w-[300px] bg-AzulA rounded-md p-2 py-4 md:flex md:gap-2">
            <div className="flex gap-2 items-center justify-center w-full mb-3 md:mb-0">
              <div>
                <FaPlaneDeparture className="text-white text-[40px]" />
              </div>
              <p className="font-Inter font-semibold text-white text-xs">
              Administrar rutas de turismo de CaminoReal.
              </p>
            </div>
            <div className="w-full md:w-[30%] ">
              <button onClick={e => setModalViaje(!modalViaje)} className="p-2 rounded-lg w-full h-full md:h-[60px]  flex font-medium text-sm bg-AzulC text-white hover:bg-AzulB transition-all duration-300">
                <a className="w-full flex justify-center items-center">
                  Administrar
                </a>
              </button>
            </div>
          </article>

          <article className="w-[300px] bg-RojoA rounded-md p-2 py-4 md:flex md:gap-2">
            <div className="flex flex-row-reverse gap-2 items-center justify-center w-full mb-3 md:mb-0">
              <div>
                <FaUserAlt className="text-white text-[40px]" />
              </div>
              <p className="font-Inter font-semibold text-white text-xs">
                Administrar de usuarios de CaminoReal.
              </p>
            </div>
            <div className="w-full md:w-[30%] ">
              <button onClick={e => setModalUser(!modalUser)} className="p-2 rounded-lg w-full h-full md:h-[60px] flex font-medium text-sm bg-AzulA text-white hover:bg-AzulB transition-all duration-300">
                <a className="w-full flex justify-center items-center">
                  Administrar
                </a>
              </button>
            </div>
          </article>
        </section>
        
        <ModalAdminHotel setOpenModal={setModalHotel} openModal={modalHotel}/>
        <ModalAdminOferta setOpenModal={setModalOferta} openModal={modalOferta}/>
        <ModalAdminViajes setOpenModal={setModalViaje} openModal={modalViaje}/>
        <ModalAdminUser setOpenModal={setModalUser} openModal={modalUser}/>
      </main>

      <Footer />
    </>
  );
}

export default OptionsAdmin;
