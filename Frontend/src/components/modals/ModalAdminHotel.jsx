import { Modal, Table } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { Pagination } from "../Pagination";
import { AgregarHotel } from "./AgregarHotel";
import { Context } from "../../context/Context";
import CardHotel from "../cards/CardHotel";

export function ModalAdminHotel({ openModal, setOpenModal }) {
  const { loader, hoteles, deleteHotel } = useContext(Context);

  const [openModal2, setOpenModal2] = useState(false);
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(10);
  const [data, setData] = useState([]);
  const [active, setActive] = useState("");
  const [edit, setEdit] = useState(false);
  const [mostrar, setMostrar] = useState(false);
  const [element, setElement] = useState({})

  const maximo = Math.ceil(data.length / porPagina);

  useEffect(() => {
    const setChange = () => {
      setData(hoteles);
    };
    setChange();
  }, [hoteles]);

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
          <h3 className="font-Inter text-AzulA">Tabla de Hoteles</h3>
        </Modal.Header>
        <Modal.Body>
          <div className="overflow-x-auto mb-4">
            {data.length === 0 ? (
              <h4 className="text-AzulA text-xl mt-6 font-bold">
                No hay Hoteles Agregalos
              </h4>
            ) : (
              <Table className="font-Inter">
                <Table.Head className="bg-AzulA">
                  <Table.HeadCell className="bg-AzulA text-white">
                    Nombre del Hotel
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
                        <Table.Cell>{item.price}</Table.Cell>
                        <Table.Cell>
                          <a
                            onClick={(e) => {
                              setOpenModal2(!openModal2);
                              setEdit(true);
                              setActive(item);
                            }}
                            className="hover:cursor-pointer mr-2 font-medium text-AzulC hover:underline"
                          >
                            Editar
                          </a>
                          <a
                            onClick={(e) => {
                              setElement(item)
                              setMostrar(!mostrar);
                            }}
                            className="hover:cursor-pointer mr-2 font-medium text-green-800 hover:underline"
                          >
                            Mostrar
                          </a>
                          <a
                            onClick={(e) => deleteHotel(item._id)}
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
          <div className="w-full flex justify-center mt-8 mb-6">
          {mostrar ? <CardHotel item={element} textColor={"AzulA"} /> : <></>}
          </div>
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
            onClick={() => {
              setOpenModal2(!openModal2);
              setEdit(false);
              setActive("");
            }}
          >
            Agregar
          </button>
        </Modal.Footer>

        <AgregarHotel
          setOpenModal={setOpenModal2}
          openModal={openModal2}
          item={active}
          edit={edit}
        />
      </Modal>
    </>
  );
}