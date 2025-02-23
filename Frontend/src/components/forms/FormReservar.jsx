import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import formValidation from "../../validations/validations";
import { alertInfo } from "../../alerts/alerts";

function FormReservar({ item, oferta }) {
  const { peticionAddReserva } = useContext(Context);

  const [values, setValues] = useState({
    id_hotel: item._id,
    date_start: "",
    date_end: "",
    people: "",
    promo: oferta,
    cash: 0,
    payment: "",
    code: ""
  });

  useEffect(() => {
    setValues((prevState) => ({
      ...prevState,
      cash: Number(values.people) * Number(item.price),
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

    await peticionAddReserva(values);
    setValues({
      id_hotel: item._id,
      date_start: "",
      date_end: "",
      people: "",
      promo: oferta,
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
          Datos de la Reservación:
        </h5>
        <div className="mb-4">
          <label
            for="email"
            className="block mb-2 text-sm font-medium text-AzulA"
          >
            Hotel a reservar:
          </label>
          <div className="flex gap-2 items-center justify-center">
            <input
              type="text"
              id="email"
              disabled
              value={item.name}
              className="shadow-xs bg-gray-200 border border-AzulA text-AzulA text-sm rounded-lg focus:ring-AzulA block w-full p-2"
              placeholder={item.name}
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            for="date_start"
            className="block mb-2 text-sm font-medium text-AzulA"
          >
            Fecha de inicio:
          </label>
          <div className="flex gap-2 items-center justify-center">
            <input
              type="date"
              id="date_start"
              name="date_start"
              value={values.date_start}
              onChange={handleInputChange}
              className="shadow-xs bg-white border border-AzulA text-AzulA text-sm rounded-lg focus:ring-AzulA block w-full p-2"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            for="date_end"
            className="block mb-2 text-sm font-medium text-AzulA"
          >
            Fecha de salida:
          </label>
          <div className="flex gap-2 items-center justify-center">
            <input
              type="date"
              id="date_end"
              name="date_end"
              value={values.date_end}
              onChange={handleInputChange}
              className="shadow-xs bg-white border border-AzulA text-AzulA text-sm rounded-lg focus:ring-AzulA block w-full p-2"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            for="people"
            className="block mb-2 text-sm font-medium text-AzulA"
          >
            Peronas a hospedarse:
          </label>
          <div className="flex gap-2 items-center justify-center">
            <input
              type="number"
              min={0}
              max={item.room_capacity}
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
            for="payment"
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
            for="promo"
            className="block mb-2 text-sm font-medium text-AzulA"
          >
            Promoción / Oferta:
          </label>
          <div className="flex gap-2 items-center justify-center">
            <input
              type="text"
              id="promo"
              disabled
              value={oferta}
              className="shadow-xs bg-gray-200 border border-AzulA text-AzulA text-sm rounded-lg focus:ring-AzulA block w-full p-2"
              placeholder={oferta}
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            for="cash"
            className="block mb-2 text-sm font-medium text-AzulA"
          >
            Monto total:
          </label>
          <div className="flex gap-2 items-center justify-center">
            <input
              type="text"
              id="cash"
              disabled
              value={"$" + values.cash}
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
          Reservar
        </button>
      </form>
    </>
  );
}

export default FormReservar;
