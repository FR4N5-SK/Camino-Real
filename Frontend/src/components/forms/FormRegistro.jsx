import { MdEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { IoPerson } from "react-icons/io5";
import formValidation from "../../validations/validations";
import { alertInfo } from "../../alerts/alerts";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";

function FormRegistro() {
  const navigate = useNavigate();
  const { peticionRegister } = useContext(Context);

  const [values, setValues] = useState({
    password: "",
    passwordConfirm: "",
    name: "",
    lastname: "",
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
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
    const passwordValidate = formValidation.validatePasswords(
      values.password,
      values.passwordConfirm
    );
    if (validate) return alertInfo(validate);
    if (passwordValidate === false)
      return alertInfo("Las claves deben coincidir");

    const respuesta = await peticionRegister(values);
    if (respuesta) {
      navigate("/login");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="mb-4">
          <label
            for="email"
            className="block mb-2 text-sm font-medium text-AzulA"
          >
            Email:
          </label>
          <div className="flex gap-2 items-center justify-center">
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleInputChange}
              className="shadow-xs bg-white border border-AzulA text-AzulA text-sm rounded-lg focus:ring-AzulA block w-full p-2"
              placeholder="example@example.com"
              required
            />
            <MdEmail className="w-9 h-9 text-AzulA" />
          </div>
        </div>
        <div className="mb-4">
          <label
            for="name"
            className="block mb-2 text-sm font-medium text-AzulA"
          >
            Nombre:
          </label>
          <div className="flex gap-2 items-center justify-center">
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleInputChange}
              className="shadow-xs bg-white border border-AzulA text-AzulA text-sm rounded-lg focus:ring-AzulA block w-full p-2"
              placeholder="Gustavo"
              required
            />
            <IoPerson className="w-9 h-9 text-AzulA" />
          </div>
        </div>
        <div className="mb-4">
          <label
            for="lastname"
            className="block mb-2 text-sm font-medium text-AzulA"
          >
            Apellido:
          </label>
          <div className="flex gap-2 items-center justify-center">
            <input
              type="text"
              name="lastname"
              value={values.lastname}
              onChange={handleInputChange}
              className="shadow-xs bg-white border border-AzulA text-AzulA text-sm rounded-lg focus:ring-AzulA block w-full p-2"
              placeholder="Torres"
              required
            />
            <IoPerson className="w-9 h-9 text-AzulA" />
          </div>
        </div>
        <div className="mb-4">
          <label
            for="password"
            className="block mb-2 text-sm font-medium text-AzulA"
          >
            Contraseña:
          </label>
          <div className="flex gap-2 items-center justify-center">
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleInputChange}
              className="shadow-xs bg-white border border-AzulA text-AzulA text-sm rounded-lg focus:ring-AzulA block w-full p-2"
              placeholder="********"
              required
            />
            <IoMdLock className="w-9 h-9 text-AzulA" />
          </div>
        </div>
        <div className="mb-4">
          <label
            for="passwordConfirm"
            className="block mb-2 text-sm font-medium text-AzulA"
          >
            Confirmar Contraseña:
          </label>
          <div className="flex gap-2 items-center justify-center">
            <input
              type="password"
              name="passwordConfirm"
              value={values.passwordConfirm}
              onChange={handleInputChange}
              className="shadow-xs bg-white border border-AzulA text-AzulA text-sm rounded-lg focus:ring-AzulA block w-full p-2"
              placeholder="********"
              required
            />
            <IoMdLock className="w-9 h-9 text-AzulA" />
          </div>
        </div>
        <div className="mb-4 flex justify-center">
          <p className="text-sm font-semibold">
            ¿Ya tienes cuenta?{" "}
            <Link className="text-RojoA hover:text-RojoB" to={"/login"}>
              Inicia Sesión
            </Link>
          </p>
        </div>
        <button className="p-2 rounded-lg w-full font-medium text-sm bg-AzulC text-white hover:bg-AzulB transition-all duration-300">
          Registrarme
        </button>
      </form>
    </>
  );
}

export default FormRegistro;
