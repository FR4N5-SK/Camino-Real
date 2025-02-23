import { Modal } from "flowbite-react";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import formValidation from "../../validations/validations";
import ubicaciones from "../../validations/ubicaciones";

const serviciosHotel = [
    "Recepción",
    "Limpieza",
    "Desayuno",
    "Wi-Fi",
    "Estacionamiento",
    "Habitaciones",
    "Gimnasio",
    "Piscina",
    "Spa",
    "Lavandería",
    "Transporte",
    "Eventos",
    "Restaurante",
    "Bar",
    "Conserjería",
    "Excursiones",
    "Alquiler",
    "Niñera",
    "Supletorias",
    "Accesibilidad"
];

export function AgregarViaje({ openModal, setOpenModal }) {
  const { peticionAddViaje } = useContext(Context);

  const [values, setValues] = useState({
    name: "",
    description: "",
    location: "",
    price: "",
    requirement: "",
    image: "",
  });
  const [fileName, setFileName] = useState("");
  const [services, setServices] = useState([]);

  
  const handleInputChange = (e) => {
    const { id, value, type, files } = e.target;
    if (type === "file") {
      setValues((prevState) => ({
        ...prevState,
        image: files[0],
      }));
      setFileName(files[0].name);
    } else {
      setValues((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    }
  };

  const handleInputChangeArray = (e) => {
    const { id, value, checked } = e.target;
    if (checked) {
      setServices((prevState) => [...prevState, value]);
    } else {
      const newServices = services.filter((item) => item !== value);
      setServices(newServices);
    }
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

    const formDataToSend = new FormData();
    formDataToSend.append("name", values.name);
    formDataToSend.append("description", values.description);
    formDataToSend.append("location", values.location);
    formDataToSend.append("price", values.price);
    formDataToSend.append("requirement", values.requirement);
    formDataToSend.append("services", JSON.stringify(services));
    formDataToSend.append("image", values.image);

    await peticionAddViaje(formDataToSend);
    setValues({
      name: "",
      description: "",
      location: "",
      price: "",
      requirement: "",
      image: "",
    });
    setServices([]);
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
          <h3 className="font-Inter text-AzulA">Agregar Ruta Turistica</h3>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} className="w-full font-Inter">
            <h5 className="font-bold text-base text-RojoA mb-5">
              Datos de la Ruta de Viaje:
            </h5>
            <div className="mb-4">
              <label
                for="name"
                className="block mb-2 text-sm font-medium text-AzulA"
              >
                Nombre de la Ruta:
              </label>
              <div className="flex gap-2 items-center justify-center">
                <input
                  type="text"
                  id="name"
                  name="name"
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
                for="location"
                className="block mb-2 text-sm font-medium text-AzulA"
              >
                Ubicacion:
              </label>
              <div className="flex gap-2 items-center justify-center">
                <select
                  type="text"
                  id="location"
                  name="location"
                  value={values.location}
                  onChange={handleInputChange}
                  className="shadow-xs bg-white border border-AzulA text-AzulA text-sm rounded-lg focus:ring-AzulA block w-full p-2"
                  required
                >
                  <option value="">Selecciona la ubicacion</option>
                  {ubicaciones.map((ubicacion, key) => (
                    <option key={key} value={ubicacion}>
                      {ubicacion}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label
                for="price"
                className="block mb-2 text-sm font-medium text-AzulA"
              >
                Precio:
              </label>
              <div className="flex gap-2 items-center justify-center">
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={values.price}
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
                  id="requirement"
                  name="requirement"
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
            <div className="mb-4">
              <label
                for="email"
                className="block mb-2 text-sm font-medium text-AzulA"
              >
                Servicios:
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 items-center justify-center">
                {serviciosHotel.map((item, key) => (
                  <div key={key} class="flex items-center ps-3">
                    <input
                      onChange={handleInputChangeArray}
                      id={item + "checkbox"}
                      type="checkbox"
                      value={item}
                      class="w-4 h-4 text-blue-600 bg-RojoA border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      for="vue-checkbox"
                      class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      {item}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label
                for="image"
                className="block mb-2 text-sm font-medium text-AzulA"
              >
                Imagen:
              </label>
              <div className="flex gap-2 items-center justify-center">
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleInputChange}
                  className="shadow-xs bg-white border text-AzulA text-sm rounded-lg focus:ring-AzulA block w-full hover:cursor-pointer"
                  placeholder="Hotel Plaza"
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