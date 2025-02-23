import { Modal } from "flowbite-react";
import CardReseña from "../cards/CardReseña";
import { useState } from "react";
import { ModalReseña } from "./ModalReseña";

export function ModalReseñas({ openModal, setOpenModal, hotel }) {
  const [modal, setModal] = useState(false)
  return (
    <>
      <Modal
        position={"center"}
        dismissible
        show={openModal}
        onClose={() => setOpenModal(false)}
      >
        <Modal.Body>
          {hotel.reviews.map((item, key) => (
            <CardReseña item={item} key={key} />
          ))}
          {hotel.reviews.length === 0 ? (
            <h4 className="text-AzulA text-lg mt-6 font-bold">
              No hay reseñas de este hotel
            </h4>
          ) : (
            <></>
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
            onClick={() => setModal(!modal)}
          >
            Reseñar
          </button>
        </Modal.Footer>

        <ModalReseña hotel={hotel} openModal={modal} setOpenModal={setModal} />
      </Modal>
    </>
  );
}