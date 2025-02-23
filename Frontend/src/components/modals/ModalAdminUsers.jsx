import { Modal, Table } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { Pagination } from "../Pagination";
import peticiones from '../../validations/peticiones.js'
import { Context } from "../../context/Context";
import { alertConfirm, alertError } from "../../alerts/alerts.js";

export function ModalAdminUser({ openModal, setOpenModal }) {
  const { token } = useContext(Context);

  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(10);
  const [data, setData] = useState([]);

  const maximo = Math.ceil(data.length / porPagina);

  useEffect(() => {
    const setChange = () => {
      console.log("LLegue")
      fetch(peticiones.allUsers, {
        mode: "cors",
        method: "GET", // or 'PUT'
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((response) => {
          if (response.status < 210 && response.status >= 200) {
            setData(response.result);
            alertConfirm(response.message);
          }
          if (response.status < 410 && response.status >= 400) {
            alertError(response.message);
          }
          if (response.status < 510 && response.status >= 500) {
            alertError(response.message);
          }
        });
    };
    setChange();
  }, []);

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
          <h3 className="font-Inter text-AzulA">Tabla de Usuarios</h3>
        </Modal.Header>
        <Modal.Body>
          <div className="overflow-x-auto mb-5">
            <Table className="font-Inter">
              <Table.Head className="bg-AzulA">
                <Table.HeadCell className="bg-AzulA text-white">
                  Nombre y Apellido
                </Table.HeadCell>
                <Table.HeadCell className="bg-AzulA text-white">
                  Correo
                </Table.HeadCell>
                <Table.HeadCell className="bg-AzulA text-white">
                  Membresia
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
                        {item.name} {item.lastname}
                      </Table.Cell>
                      <Table.Cell>{item.email}</Table.Cell>
                      <Table.Cell>{item.subscription}</Table.Cell>
                      <Table.Cell>
                        <a
                          href="#"
                          className="hover:cursor-pointer font-medium text-RojoA hover:underline"
                        >
                          Eliminar
                        </a>
                      </Table.Cell>
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table>
          </div>
          <Pagination pagina={pagina} setPagina={setPagina} maximo={maximo} />
        </Modal.Body>
        <Modal.Footer>
          <button
            className="px-6 py-2 border-2 bg-RojoA text-white hover:bg-AzulA rounded-md text-sm flex items-center gap-2 transition-all duration-500"
            color="gray"
            onClick={() => setOpenModal(false)}
          >
            Cerrar
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}