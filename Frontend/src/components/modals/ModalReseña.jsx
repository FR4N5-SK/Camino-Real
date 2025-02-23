import { Modal } from "flowbite-react";
import formValidation from "../../validations/validations";
import { useContext, useState } from "react";
import { alertInfo } from "../../alerts/alerts";
import { Context } from "../../context/Context";

export function ModalReseña({ openModal, setOpenModal, hotel }) {

  const { peticionReview } = useContext(Context);

  const [values, setValues] = useState({
    id_hotel: hotel._id,
    description: "",
    review: ""
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setValues((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const validation = () => {
    for (let key in values) {
      let error = formValidation.validateText(values[key].toString());
      if (!error) return "Completa todos los datos";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validate = validation();
    if (validate) return alertInfo(validate);

    await peticionReview(values);
    setValues({
        id_hotel: hotel._id,
        description: "",
        review: ""
    });

    setOpenModal(!openModal);
  };
  return (
    <>
      <Modal
        position={"center"}
        dismissible
        show={openModal}
        onClose={() => setOpenModal(false)}
      >
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <h5 className="font-bold text-base text-RojoA mb-5">
              Datos de la reseña:
            </h5>
            <div className="mb-4">
              <label
                for="description"
                className="block mb-2 text-sm font-medium text-AzulA"
              >
                Reseña:
              </label>
              <div className="flex gap-2 items-center justify-center">
                <textarea
                  type="text"
                  id="description"
                  name="description"
                  value={values.description}
                  onChange={handleInputChange}
                  className="shadow-xs bg-white border border-AzulA text-AzulA text-sm rounded-lg focus:ring-AzulA block w-full p-2"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                for="review"
                className="block mb-2 text-sm font-medium text-AzulA"
              >
                Calificacion:
              </label>
              <div className="flex gap-2 items-center justify-center">
                <input
                  type="number"
                  id="review"
                  name="review"
                  min={0}
                  max={10}
                  value={values.review}
                  onChange={handleInputChange}
                  className="shadow-xs bg-white border border-AzulA text-AzulA text-sm rounded-lg focus:ring-AzulA block w-full p-2"
                  required
                />
              </div>
            </div>
            <button className="p-2 rounded-lg w-full font-medium text-sm bg-AzulC text-white hover:bg-AzulB transition-all duration-300">
              Agregar
            </button>
          </form>
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