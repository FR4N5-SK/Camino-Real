import { Modal } from "flowbite-react";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import formValidation from "../../validations/validations";
import { alertInfo } from "../../alerts/alerts";

export function AgregarOferta({ openModal, setOpenModal }) {
  const { hoteles, peticionAddOferta } = useContext(Context);

  const [values, setValues] = useState({
    name: "",
    id_hotel: "",
    description: "",
    discount: "",
    requirement: ""
  });

  const handleInputChange = (e) => {
    const { id, value, type, files } = e.target;
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

    await peticionAddOferta(values);
    setValues({
      name: "",
      id_hotel: "",
      description: "",
      discount: "",
      requirement: "",
    });

    setOpenModal(!openModal);
  };

  return (
    <>
      <Modal
        position={"center"}
        size="3xl"
        dismissible
        show={openModal}
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header>
          <h3 className="font-Inter text-AzulA">Agregar Oferta</h3>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} className="w-full font-Inter">
            <h5 className="font-bold text-base text-RojoA mb-5">
              Datos de la oferta:
            </h5>
            <div className="mb-4">
              <label
                for="id_hotel"
                className="block mb-2 text-sm font-medium text-AzulA"
              >
                Hotel de la oferta:
              </label>
              <div className="flex gap-2 items-center justify-center">
                <select
                  name="id_hotel"
                  id="id_hotel"
                  value={values.id_hotel}
                  onChange={handleInputChange}
                  className="shadow-xs bg-white border border-AzulA text-AzulA text-sm rounded-lg focus:ring-AzulA block w-full p-2"
                >
                  <option value="">Selecciona un Hotel</option>
                  {
                    hoteles.map((item, key) => (
                      <option value={item._id}>{item.name}</option>
                    ))
                  }
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label
                for="name"
                className="block mb-2 text-sm font-medium text-AzulA"
              >
                Nombre de la oferta:
              </label>
              <div className="flex gap-2 items-center justify-center">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={values.name}
                  onChange={handleInputChange}
                  className="shadow-xs bg-white border border-AzulA text-AzulA text-sm rounded-lg focus:ring-AzulA block w-full p-2"
                  placeholder="Hotel Plaza"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                for="description"
                className="block mb-2 text-sm font-medium text-AzulA"
              >
                Descripcion:
              </label>
              <div className="flex gap-2 items-center justify-center">
                <input
                  type="text"
                  name="description"
                  id="description"
                  value={values.description}
                  onChange={handleInputChange}
                  className="shadow-xs bg-white border border-AzulA text-AzulA text-sm rounded-lg focus:ring-AzulA block w-full p-2"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                for="discount"
                className="block mb-2 text-sm font-medium text-AzulA"
              >
                Descuento:
              </label>
              <div className="flex gap-2 items-center justify-center">
                <input
                  type="number"
                  min={0}
                  max={100}
                  name="discount"
                  id="discount"
                  value={values.discount}
                  onChange={handleInputChange}
                  className="shadow-xs bg-white border border-AzulA text-AzulA text-sm rounded-lg focus:ring-AzulA block w-full p-2"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                for="requirement"
                className="block mb-2 text-sm font-medium text-AzulA"
              >
                Membresia:
              </label>
              <div className="flex gap-2 items-center justify-center">
                <select
                  name="requirement"
                  id="requirement"
                  value={values.requirement}
                  onChange={handleInputChange}
                  className="shadow-xs bg-white border border-AzulA text-AzulA text-sm rounded-lg focus:ring-AzulA block w-full p-2"
                >
                  <option value="">Selecciona la Membresia requerida</option>
                  <option value="Basica">Basica</option>
                  <option value="Bronce">Bronce</option>
                  <option value="Plata">Plata</option>
                  <option value="Oro">Oro</option>
                </select>
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