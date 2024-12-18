import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bagActions } from "../../store/bagSlice";
import { RiDeleteBin6Line } from "react-icons/ri";
import { modalActions } from "../../store/modalSlice";
import DeleteModal from "./DeleteModal";

const Card = ({ item }) => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const itemQuantity = useSelector(
    (store) => store.bag.items.find((i) => i._id === item._id)?.quantity
  );
  useEffect(() => {
    if (itemQuantity) {
      setCount(itemQuantity);
    }
  }, [itemQuantity]);

  const increment = () => {
    dispatch(bagActions.incrementItem(item._id));
    setCount(count + 1);
  };

  const decrement = () => {
    console.log(item);
    if (count === 1) {
      dispatch(bagActions.removeItem(item._id));
      return;
    }
    setCount(count - 1);
    dispatch(bagActions.decrementItem(item._id));
  };
  const removeItem = () => {
    dispatch(bagActions.removeItem(item._id));
    // console.log("1212");
  };
  return (
    <div className="w-[95%] bg-[#2C2F2F] rounded-lg h-40 flex mb-2 shadow-lg ">
      <div className="w-48 h-full rounded-l-lg ">
        <img src={item.image} alt="" className="h-full w-full rounded-l-lg" />
      </div>
      <div className="w-full h-full rounded-r-lg py-3 px-3 flex flex-col gap-1 text-white">
        <h1 className="max-sm:text-xl sm:text-2xl font-semibold">
          {item.name}
        </h1>
        <p className="line-clamp-2 w-[95%]">{item.description}</p>
        <p className="font-semibold">
          Rs. {count != 0 ? item.price * count : item.price}
        </p>
        <div className="flex items-center gap-3">
          <button onClick={decrement}>-</button>
          <input
            type="text"
            value={count}
            readOnly
            className="w-10 text-center text-black rounded-xl"
          />
          <button onClick={increment}>+</button>
        </div>
      </div>
      {/* Delete Icon */}
      <div className="w-14 h-full flex justify-center p-2 pt-4 cursor-pointer">
        <RiDeleteBin6Line
          className="text-2xl text-red-500 hover:scale-125 transition-all duration-500"
          onClick={() => {
            dispatch(modalActions.openDeleteModal(item._id));
          }}
          // onClick={removeItem}
        />
      </div>
      <DeleteModal />
    </div>
  );
};

export default Card;
