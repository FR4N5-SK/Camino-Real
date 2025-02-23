import { useContext, useEffect, useState } from "react";
import suit from "../../assets/suit.jpg"
import { ModalReserva } from "../modals/ModalReserva";
import { Context } from "../../context/Context";

function CardOferta({ textColor, item }) {
  const { hoteles, token } = useContext(Context);

  const [hotel, setHotel] = useState({});

  useEffect(() => {
    const load = async () => {
      hoteles.forEach(element => {
        console.log(element)
        if (element._id === item.id_hotel) {
          setHotel(element)
        }
      })
    };
    load();
  }, [])

  const [modalReserva, setModalReserva] = useState(false);

  return (
    <>
      <article className="w-full sm:w-[225px] md:w-[250px]">
        <img
          src={`http://localhost:3081/api/uploads/${hotel.image}`}
          alt="Suit"
          className="w-full rounded-md mb-3"
        />
        <div className="">
          <div className="mb-4">
            <h6 className={`text-${textColor} text-[10px]`}>
              {hotel.location}
            </h6>
            <h4 className={`text-${textColor} font-bold text-sm mb-1`}>
              {hotel.name}
            </h4>
            <div className="flex items-center">
              <span class=" bg-Verde text-AzulA text-[10px] font-semibold me-2 px-2 py-1 rounded-sm">
                {hotel.review}
              </span>
              <p className={`text-[10px] text-${textColor}`}>
                Calificada la experiencia
              </p>
            </div>
          </div>
          <div className="mb-2">
            <h5 className={`text-${textColor} font-bold text-sm`}>
              ${hotel.price * (item.discount / 100)} -{" "}
              <del className="font-medium">${hotel.price}</del>
            </h5>
            <p className={`text-[10px] text-${textColor}`}>Por noche</p>
            <p className={`text-[10px] font-semibold text-${textColor}`}>
              Impuestos y cargos incluidos
            </p>
          </div>

          <div className="mb-3">
            <span class=" bg-RojoA text-AzulA text-[10px] font-semibold me-2 px-2 py-1 rounded-sm">
              {item.name}
            </span>
          </div>

          {token === "Invalid" ? (
            <></>
          ) : (
            <>
              {" "}
              <button
                onClick={(e) => setModalReserva(!modalReserva)}
                class=" bg-AzulA text-white text-[12px] font-semibold me-2 px-4 py-1 rounded-md"
              >
                Reservar
              </button>
            </>
          )}
        </div>

        <ModalReserva
          item={hotel}
          oferta={item.name}
          openModal={modalReserva}
          setOpenModal={setModalReserva}
        />
      </article>
    </>
  );
}

export default CardOferta;
