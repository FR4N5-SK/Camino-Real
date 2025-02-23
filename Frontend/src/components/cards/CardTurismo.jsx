import { useContext, useState } from "react";
import isla from "../../assets/margarita.jpg";
import { ModalComprar } from "../modals/ModalComprar";
import { Context } from "../../context/Context";

function CardTurismo({item}) {
  const { token } = useContext(Context);
  const [modalComprar, setModalComprar] = useState(false);

  return (
    <>
      <article className="w-[250px]">
        <img
          src={`http://localhost:3081/api/uploads/${item.image}`}
          alt="Suit"
          className="w-full rounded-md mb-3"
        />
        <div className="px-2">
          <div className="mb-4">
            <h6 className={`text-AzulA text-[10px]`}>{item.location}</h6>
            <h4 className={`text-AzulA font-bold text-sm mb-1`}>{item.name}</h4>
          </div>
          <div className="mb-2">
            <h5 className={`text-AzulA font-bold text-sm`}>${item.price}</h5>
            <div className="flex justify-between">
              <div>
                <p className={`text-[10px] text-AzulA`}>Por Persona</p>
                <p className={`text-[10px] font-semibold text-AzulA`}>
                  Impuestos y cargos incluidos
                </p>
              </div>
              <div className="flex flex-row-reverse">
                {token === "Invalid" ? (
                  <></>
                ) : (
                  <>
                    {" "}
                    <button
                      onClick={(e) => setModalComprar(!modalComprar)}
                      class=" bg-AzulC text-white hover:bg-AzulB transition-all text-[12px] font-semibold me-2 px-4 py-1 rounded-md"
                    >
                      Comprar
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <ModalComprar item={item} openModal={modalComprar} setOpenModal={setModalComprar} />
      </article>
    </>
  );
}

export default CardTurismo;
