function CardReseña() {
  return (
    <>
      <div className="font-Inter text-AzulA bg-gray-300 mb-6 rounded-md p-3">
        <div className="flex flex-col gap-2 mb-1">
          <h5 className="font-semibold text-xs text-RojoA">Jorge Suarez</h5>
          <h4 className="font-semibold text-sm">Reseña:</h4>
          <p className="font-medium text-xs">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore,
            magni adipisci! Earum, fuga delectus? Blanditiis voluptate nemo
            consequuntur ducimus, eius, commodi fugiat ratione eos expedita
            asperiores beatae culpa similique assumenda.
          </p>
        </div>
        <span class=" bg-Verde text-AzulA text-[10px] font-semibold me-2 px-2 py-1 rounded-sm">
          7.6
        </span>
      </div>
    </>
  );
}

export default CardReseña;
