import { FaLocationDot } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { BsCalendarDate } from "react-icons/bs";

function FormFiltro() {
  return (
    <>
      <form className="w-full flex flex-col gap-2">
        <div class="flex border border-AzulA rounded-md hover:cursor-pointer">
          <span class="inline-flex items-center p-3 text-sm text-gray-900 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
            <FaLocationDot className="w-7 h-7 text-AzulA" />
          </span>
          <div className="w-full flex flex-col gap-1 py-1 justify-center">
            <h6 className="font-Inter text-AzulA font-semibold text-xs">¿A dónde quieres ir?</h6>
            <p className="font-Inter text-AzulA text-sm">Valera, Trujillo</p>
          </div>
        </div>
        <div class="flex border border-AzulA rounded-md hover:cursor-pointer">
          <span class="inline-flex items-center p-3 text-sm text-gray-900 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
            <IoPerson className="w-7 h-7 text-AzulA" />
          </span>
          <div className="w-full flex flex-col gap-1 py-1 justify-center">
            <h6 className="font-Inter text-AzulA font-semibold text-xs">Huéspedes</h6>
            <p className="font-Inter text-AzulA text-sm">8 personas</p>
          </div>
        </div>
        <button className="p-2 rounded-lg w-full font-medium text-sm bg-AzulC text-white hover:bg-AzulB transition-all duration-300">Buscar</button>
      </form>
    </>
  );
}

export default FormFiltro;
