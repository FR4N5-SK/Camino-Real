function CardReseña({item}) {
  return (
    <>
      <div className="font-Inter text-AzulA bg-gray-300 mb-6 rounded-md p-3">
        <div className="flex flex-col gap-2 mb-1">
          <h5 className="font-semibold text-xs text-RojoA">{item.user}</h5>
          <h4 className="font-semibold text-sm">Reseña:</h4>
          <p className="font-medium text-xs">
            {item.description}
          </p>
        </div>
        <span class={`${item.review < 5 ? "bg-red-500" : (item.review < 7 ? "bg-amber-400" : "bg-Verde")} text-AzulA text-[10px] font-semibold me-2 px-2 py-1 rounded-sm`}>
          {item.review}
        </span>
      </div>
    </>
  );
}

export default CardReseña;
