import React, { useEffect, useState } from "react";
import axiosInstance from "../../../Config/axios";
import toast from "react-hot-toast";
import ItemCard from "./ItemCard";

const ItemsManagement = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axiosInstance.get("/items/sortedItems");
      if (response.status === 200) {
        setItems(response?.data?.data?.items);
      }
    } catch (err) {
      if (err.response) {
        toast.error(
          `Error: ${err.response.data.message}` || "Something went wrong!"
        );
      } else {
        toast.error("Server unreachable. Try Again Later.");
      }
    }
  };

  return (
    <div className="w-full min-h-[89.5vh] bg-[#1E2021] py-5">
      <div className="max-sm:w-full  h-16 flex w-[95%] sm:mx-auto max-sm:px-2  gap-x-2">
        <div className="max-sm:w-[65%] sm:w-3/4 lg:w-5/6 flex items-center justify-center font-semibold text-2xl text-white border shadow-2xl border-black  bg-[#2c2f2f] rounded-lg">
          Items
        </div>
        <div className="max-sm:w-[35%] sm:w-1/4 lg:w-1/6 bg-transparent">
          <button className="bg-orange-500 w-full h-[95%] mt-[2px] font-bold text-white hover:bg-orange-600 transition-all duration-300 text-[1.1rem] cursor-pointer rounded-lg">
            Add New Items
          </button>
        </div>
      </div>
      <div className="w-full min-h-96 lg:h-[440px] lg:w-[95%] lg:mx-auto lg:overflow-x-hidden bg-[#2c2f2f] py-3 my-5 grid max-sm:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:rounded-xl lg:border border-black">
        {items.map((item, key) => (
          <ItemCard item={item} key={key} />
        ))}
      </div>
    </div>
  );
};

export default ItemsManagement;
