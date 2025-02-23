import { useContext, useState } from "react";
import plaza from "../../assets/plaza.jpg"
import { ModalDetailsHotel } from "../modals/ModalDetailsHotel";
import { IoStarSharp } from "react-icons/io5";
import { ModalReseñas } from "../modals/ModalReseñas";
import { ModalReserva } from "../modals/ModalReserva";
import { Context } from "../../context/Context";

function CardHotel({ item }) {
  const { token } = useContext(Context);
  const [modalDetails, setModalDetails] = useState(false);
  const [modalReseña, setModalReseña] = useState(false);
  const [modalReserva, setModalReserva] = useState(false);

  return (
    <>
      <article className="w-[275px]">
        <img
          src={`http://localhost:3081/api/uploads/${item.image}`}
          alt="Suit"
          className="w-full rounded-md mb-3"
        />
        <div className="px-2">
          <div className="mb-4">
            <h4 className={`text-AzulA font-bold text-sm mb-1`}>{item.name}</h4>
            <h6 className={`text-AzulA text-[10px] font-semibold`}>
              {item.location}
            </h6>
          </div>
          <div className="mb-3">
            <ul className="text-AzulC text-[12px] font-semibold flex flex-wrap gap-2 mb-2">
              {item.services.map((element, key) => (
                <li key={key}>{element}</li>
              ))}
            </ul>
            <ul className=" flex gap-1 text-lg text-AzulA">
              <li>
                <IoStarSharp
                  className={item.stars > 0 ? "text-amber-600" : ""}
                />
              </li>
              <li>
                <IoStarSharp
                  className={item.stars > 1 ? "text-amber-600" : ""}
                />
              </li>
              <li>
                <IoStarSharp
                  className={item.stars > 2 ? "text-amber-600" : ""}
                />
              </li>
              <li>
                <IoStarSharp
                  className={item.stars > 3 ? "text-amber-600" : ""}
                />
              </li>
              <li>
                <IoStarSharp
                  className={item.stars > 4 ? "text-amber-600" : ""}
                />
              </li>
            </ul>
          </div>
          <div className="mb-2">
            <div className="flex gap-2 items-center">
              <h5 className={`text-AzulA font-bold text-sm`}>${item.price}</h5>
              <p className={`text-[10px] text-AzulA font-semibold`}>
                Por Persona
              </p>
              <span className={`${item.review < 5 ? "bg-red-500" : (item.review < 7 ? "bg-amber-400" : "bg-Verde")} text-AzulA text-[10px] font-semibold me-2 px-2 py-1 rounded-sm`}>
                {item.review}
              </span>
            </div>
          </div>
          <div className="flex flex-row-reverse">
            <button
              onClick={(e) => setModalDetails(!modalDetails)}
              className=" bg-AzulC text-white hover:bg-AzulB transition-all text-[10px] font-semibold me-2 px-2 py-1 rounded-md"
            >
              Ver mas...
            </button>
            {token === "Invalid" ? (
              <></>
            ) : (
              <>
                {" "}
                <button
                  onClick={(e) => setModalReseña(!modalReseña)}
                  className=" bg-AzulC text-white hover:bg-AzulB transition-all text-[10px] font-semibold me-2 px-2 py-1 rounded-md"
                >
                  Reseñas
                </button>
                <button
                  onClick={(e) => setModalReserva(!modalReserva)}
                  className=" bg-AzulA text-white hover:bg-AzulB transition-all text-[10px] font-semibold me-2 px-2 py-1 rounded-md"
                >
                  Reservar
                </button>
              </>
            )}
          </div>
        </div>

        <ModalDetailsHotel
          item={item}
          openModal={modalDetails}
          setOpenModal={setModalDetails}
        />
        <ModalReseñas
          hotel={item}
          openModal={modalReseña}
          setOpenModal={setModalReseña}
        />
        <ModalReserva
          item={item}
          oferta={"Ninguna"}
          openModal={modalReserva}
          setOpenModal={setModalReserva}
        />
      </article>
    </>
  );
}

export default CardHotel;
  