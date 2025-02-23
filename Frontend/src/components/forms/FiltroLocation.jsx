import { FaLocationDot } from "react-icons/fa6";
import ubicaciones from "../../validations/ubicaciones";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";

function FiltroLocation({ data, setData, type }) {
  const { setLoader, hoteles, viajes, ofertas } = useContext(Context);
  const [values, setValues] = useState("");

  useEffect(() => {
    setLoader(true);
    setTimeout(async () => {
      if (values === "") {
        if (type === "viaje") {
          setData(viajes)
        }else if (type === "oferta"){
          setData(ofertas)
        } else {
          setData(hoteles)
        }
      } else {
        if (type === "viaje") {
          const newState = viajes.filter((item) => item.location === values);
          setData(newState);
        }else if (type === "oferta"){
          const newState = data.filter((item) => item.location === values);
          setData(newState);
        } else {
          const newState = hoteles.filter((item) => item.location === values);
          setData(newState);
        }
      }
      setLoader(false);
    }, 1000);
  }, [values]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues(value);
  };
  return (
    <>
      <form className="w-full md:w-1/2">
        <div className="flex border border-AzulA rounded-md hover:cursor-pointer">
          <div className="w-full flex gap-1 py-2 px-3 justify-center">
            <span class="inline-flex items-center p-3 text-sm text-gray-900 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              <FaLocationDot className="w-7 h-7 text-AzulA" />
            </span>
            <div className="w-full flex flex-col gap-1 py-1 justify-center">
              <h6 className="font-Inter text-AzulA font-semibold text-xs px-1">
                ¿A dónde quieres ir?
              </h6>
              <select
                value={values}
                onChange={handleInputChange}
                className="font-Inter text-AzulA text-sm w-full p-1 border-none focus:ring-0 m-0 "
              >
                <option value="">Todas las ubicaciones</option>
                {ubicaciones.map((ubicacion, key) => (
                  <option key={key} value={ubicacion}>
                    {ubicacion}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default FiltroLocation;
