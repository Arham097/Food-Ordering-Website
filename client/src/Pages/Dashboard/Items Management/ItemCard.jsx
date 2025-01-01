import React from "react";

const ItemCard = ({ item }) => {
  const handleEdit = () => {
    console.log("Edit");
  };
  const handleDelete = () => {
    console.log("Delete");
  };

  return (
    <div className="max-sm:w-56 sm:w-60 max-sm:h-80 sm:h-96 bg-[#333638] mx-auto my-2 relative z-0 group shadow-2xl rounded-lg ">
      <div className="w-full h-1/2 sm:h-[55%] bg-slate-300 ">
        <img src={item.image} alt="" className="w-full h-full" />
      </div>
      <div className="w-full h-1/2 sm:h-[45%] flex flex-col text-white mx-auto px-2 py-3 gap-y-2">
        <span className="text-lg font-semibold">{item.name}</span>
        <span className="text-sm max-sm:line-clamp-3 sm:line-clamp-4">
          {item.description}
        </span>
        <span className="text-lg">Rs. {item.price}</span>
      </div>
      <div className="w-full h-0  group-hover:h-44  transition-all duration-500 ease-in-out  bg-[#1e2021] absolute bottom-0 z-10 flex flex-col justify-center items-center ">
        <button
          className="bg-orange-500 w-9/12  h-1/4 font-bold text-white hover:scale-105 transition-all duration-300 rounded-md mt-2 text-[1.1rem] cursor-pointer hidden group-hover:block"
          onClick={handleEdit}
        >
          Edit
        </button>
        <button
          className="bg-red-600 w-9/12 h-1/4 font-bold text-white hover:scale-105 transition-all duration-300 rounded-md mt-2  text-[1.1rem] cursor-pointer hidden group-hover:block"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
