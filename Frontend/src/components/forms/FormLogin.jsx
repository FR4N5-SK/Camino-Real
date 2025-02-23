import { MdEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import formValidation from "../../validations/validations";
import { alertInfo } from "../../alerts/alerts";

function FormLogin() {
  const navigate = useNavigate();
  const { peticionLogin } = useContext(Context);

  const [values, setValues] = useState({
    email: "",
    password: "",
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
    if (validate) return alertInfo(validate);

    const respuesta = await peticionLogin(values)
    if (respuesta) {
      navigate('/')
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
        <div className="mb-4 flex justify-center">
          <p className="text-sm font-semibold">
            ¿No tienes cuenta?{" "}
            <Link className="text-RojoA hover:text-RojoB" to={"/singup"}>
              Registrate
            </Link>
          </p>
        </div>
        <button type="submit" className="p-2 rounded-lg w-full font-medium text-sm bg-AzulC text-white hover:bg-AzulB transition-all duration-300">
          Iniciar Sesión
        </button>
      </form>
    </>
  );
}

export default FormLogin;
