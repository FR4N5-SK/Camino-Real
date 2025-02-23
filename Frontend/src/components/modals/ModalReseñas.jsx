import { Modal } from "flowbite-react";
import CardReseña from "../cards/CardReseña";

export function ModalReseñas({ openModal, setOpenModal }) {
  return (
    <>
      <Modal
        position={"center"}
        dismissible
        show={openModal}
        onClose={() => setOpenModal(false)}
      >
        <Modal.Body>
            <CardReseña />
            <CardReseña />
            <CardReseña />
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