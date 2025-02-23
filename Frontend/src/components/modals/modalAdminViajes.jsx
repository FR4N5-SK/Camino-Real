import { Modal, Table } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { Pagination } from "../Pagination";
import { AgregarViaje } from "./AgregarViaje";
import { Context } from "../../context/Context";

export function ModalAdminViajes({ openModal, setOpenModal }) {
  const { loader, viajes, deleteViaje } = useContext(Context);

  const [openModal2, setOpenModal2] = useState(false);
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(10);
  const [data, setData] = useState([]);

  const maximo = Math.ceil(data.length / porPagina);

  useEffect(() => {
    const setChange = () => {
      setData(viajes);
    };
    setChange();
  }, [viajes]);

  return (
    <>
      <Modal
        position={"center"}
        size="6xl"
        dismissible
        show={openModal}
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header>
          <h3 className="font-Inter text-AzulA">Tabla de Rutas Turisticas</h3>
        </Modal.Header>
        <Modal.Body>
          <div className="overflow-x-auto mb-5">
            {data.length === 0 ? (
              <h4 className="text-AzulA text-xl mt-6 font-bold">
                No hay Ofertas Agregalas
              </h4>
            ) : (
              <Table className="font-Inter">
                <Table.Head className="bg-AzulA">
                  <Table.HeadCell className="bg-AzulA text-white">
                    Nombre de la Ruta
                  </Table.HeadCell>
                  <Table.HeadCell className="bg-AzulA text-white">
                    Lugar
                  </Table.HeadCell>
                  <Table.HeadCell className="bg-AzulA text-white">
                    Precio
                  </Table.HeadCell>
                  <Table.HeadCell className="bg-AzulA text-white">
                    <span className="sr-only">Edit</span>
                  </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {data
                    .slice(
                      (pagina - 1) * porPagina,
                      (pagina - 1) * porPagina + porPagina
                    )
                    .map((item, key) => (
                      <Table.Row className="bg-gray-300 text-black">
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {item.name}
                        </Table.Cell>
                        <Table.Cell>{item.location}</Table.Cell>
                        <Table.Cell>${item.price}</Table.Cell>
                        <Table.Cell>
                          <a
                            
                            className="hover:cursor-pointer mr-2 font-medium text-green-800 hover:underline"
                          >
                            Mostrar
                          </a>
                          <a
                            onClick={e => (deleteViaje(item._id))}
                            className="hover:cursor-pointer font-medium text-RojoA hover:underline"
                          >
                            Eliminar
                          </a>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                </Table.Body>
              </Table>
            )}
          </div>
          {data.length === 0 ? (
            <></>
          ) : (
            <Pagination pagina={pagina} setPagina={setPagina} maximo={maximo} />
          )}
        </Modal.Body>
        <Modal.Footer>
          <button
            className="px-6 py-2 border-2 bg-RojoA text-white hover:bg-AzulA rounded-md text-sm flex items-center gap-2 transition-all duration-500"
            color="gray"
            onClick={() => setOpenModal(false)}
          >
            Cerrar
          </button>
          <button
            className="px-6 py-2 border-2 bg-AzulC text-white hover:bg-AzulA rounded-md text-sm flex items-center gap-2 transition-all duration-500"
            color="gray"
            onClick={() => setOpenModal2(!openModal2)}
          >
            Agregar
          </button>
        </Modal.Footer>

        <AgregarViaje setOpenModal={setOpenModal2} openModal={openModal2} />
      </Modal>
    </>
  );
}
