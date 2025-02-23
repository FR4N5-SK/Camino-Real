import { useContext, useEffect, useState } from "react";
import formValidation from "../../validations/validations";
import { alertInfo } from "../../alerts/alerts";
import { Context } from "../../context/Context";

function FormComprar({item}) {
  const { peticionComprar } = useContext(Context);

  const [values, setValues] = useState({
    name: item.name,
    people: "",
    cash: "$0",
    payment: "",
    code: "",
  });

  useEffect(() => {
    setValues((prevState) => ({
      ...prevState,
      cash: "$" + Number(values.people) * Number(item.price),
    }));
  }, [values.people])

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

    await peticionComprar(values);
    setValues({
      name: item.name,
      people: "",
      cash: "$0",
      payment: "",
      code: "",
    });

    setOpenModal(!openModal);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full font-Inter">
        <h5 className="font-bold text-base text-RojoA mb-5">
          Datos de la Ruta:
        </h5>
        <div className="mb-4">
          <label
            for="name"
            className="block mb-2 text-sm font-medium text-AzulA"
          >
            Ruta Turistica:
          </label>
          <div className="flex gap-2 items-center justify-center">
            <input
              type="text"
              id="name"
              disabled
              value={values.name}
              className="shadow-xs bg-gray-200 border border-AzulA text-AzulA text-sm rounded-lg focus:ring-AzulA block w-full p-2"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            for="people"
            className="block mb-2 text-sm font-medium text-AzulA"
          >
            Peronas a viajar:
          </label>
          <div className="flex gap-2 items-center justify-center">
            <input
              type="number"
              min={0}
              id="people"
              name="people"
              value={values.people}
              onChange={handleInputChange}
              placeholder="1"
              className="shadow-xs bg-white border border-AzulA text-AzulA text-sm rounded-lg focus:ring-AzulA block w-full p-2"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            for="email"
            className="block mb-2 text-sm font-medium text-AzulA"
          >
            Método de pago:
          </label>
          <div className="flex gap-2 items-center justify-center">
            <select
              id="payment"
              name="payment"
              value={values.payment}
              onChange={handleInputChange}
              className="shadow-xs bg-white border border-AzulA text-AzulA text-sm rounded-lg focus:ring-AzulA block w-full p-2"
            >
              <option value=""></option>
              <option value="Pago Movil">Pago Movil</option>
              <option value="Efectivo">Efectivo</option>
            </select>
          </div>
        </div>
        <div className="mb-4">
          <label
            for="email"
            className="block mb-2 text-sm font-medium text-AzulA"
          >
            Monto total:
          </label>
          <div className="flex gap-2 items-center justify-center">
            <input
              type="text"
              id="email"
              disabled
              value={values.cash}
              className="shadow-xs bg-gray-200 border border-AzulA text-AzulA text-sm rounded-lg focus:ring-AzulA block w-full p-2"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            for="code"
            className="block mb-2 text-sm font-medium text-AzulA"
          >
            Referencia:
          </label>
          <div className="flex gap-2 items-center justify-center">
            <input
              type="number"
              min={0}
              id="code"
              name="code"
              value={values.code}
              onChange={handleInputChange}
              placeholder="2550987887"
              className="shadow-xs bg-white border border-AzulA text-AzulA text-sm rounded-lg focus:ring-AzulA block w-full p-2"
              required
            />
          </div>
        </div>
        <button className="p-2 rounded-lg w-full font-medium text-sm bg-AzulC text-white hover:bg-AzulB transition-all duration-300">
          Comprar
        </button>
      </form>
    </>
  );
}

export default FormComprar;
