import { Carousel } from "flowbite-react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import CardOferta from "./cards/CardOferta";


function CarrouselOfertas() {
  return (
    <div className="h-[400px] w-full">
      <Carousel
        slide={false}
        indicators={false}
        leftControl={<FaArrowCircleLeft className="text-xl text-white" />}
        rightControl={<FaArrowCircleRight className="text-xl text-white" />}
      >
        
      </Carousel>
    </div>
  );
}


export default CarrouselOfertas;
