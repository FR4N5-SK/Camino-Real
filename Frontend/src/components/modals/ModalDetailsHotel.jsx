import { Modal } from "flowbite-react";

export function ModalDetailsHotel({ openModal, setOpenModal, item }) {
  return (
    <>
      <Modal
        position={"center"}
        dismissible
        show={openModal}
        onClose={() => setOpenModal(false)}
      >
        <Modal.Body>
          <div className="font-Inter flex flex-col gap-2 text-AzulA mb-6">
            <h4 className="font-semibold text-sm">Descripción del Hotel:</h4>
            <p className="font-medium text-xs">{item.description}</p>
          </div>
          <div className="font-Inter flex flex-col gap-2 text-AzulA mb-4">
            <h4 className="font-semibold text-sm">Capacidad de Hospedados:</h4>
            <p className="font-medium text-lg text-RojoA">
              {item.room_capacity}
            </p>
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
        </Modal.Footer>
      </Modal>
    </>
  );
}