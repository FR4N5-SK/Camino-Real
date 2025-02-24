import { Carousel } from "flowbite-react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";


function CarrouselServices() {
  return (
    <div className="h-60 sm:h-[300px] md:h-[400px]  lg:h-[500px] w-full">
      <Carousel
        indicators={false}
        leftControl={<FaArrowCircleLeft className="text-xl text-AzulA" />}
        rightControl={<FaArrowCircleRight className="text-xl text-AzulA" />}
      >
        <div className="px-14 w-full h-full">
          <div className="bg-hidromasaje bg-cover bg-center w-full h-full rounded-md flex flex-col-reverse">
            <a className="font-Inter text-sm  text-white font-bold mx-1 my-1 p-2 rounded-md bg-black bg-opacity-65">Hidromasaje</a>
          </div>
        </div>
        <div className="px-14 w-full h-full">
          <div className="bg-hotel bg-cover bg-center w-full h-full rounded-md flex flex-col-reverse">
            <a className="font-Inter text-sm  text-white font-bold mx-1 my-1 p-2 rounded-md bg-black bg-opacity-65">Spa</a>
          </div>
        </div>
        <div className="px-14 w-full h-full">
          <div className="bg-piscina bg-cover bg-center w-full h-full rounded-md flex flex-col-reverse">
            <a className="font-Inter text-sm  text-white font-bold mx-1 my-1 p-2 rounded-md bg-black bg-opacity-65">Piscina</a>
          </div>
        </div>
        <div className="px-14 w-full h-full">
          <div className="bg-deporte bg-cover bg-center w-full h-full rounded-md flex flex-col-reverse">
            <a className="font-Inter text-sm  text-white font-bold mx-1 my-1 p-2 rounded-md bg-black bg-opacity-65">Deporte</a>
          </div>
        </div>
        <div className="px-14 w-full h-full">
          <div className="bg-gim bg-cover bg-center w-full h-full rounded-md flex flex-col-reverse">
            <a className="font-Inter text-sm  text-white font-bold mx-1 my-1 p-2 rounded-md bg-black bg-opacity-65">Gimnasio</a>
          </div>
        </div>
      </Carousel>
    </div>
  );
}


export default CarrouselServices;
