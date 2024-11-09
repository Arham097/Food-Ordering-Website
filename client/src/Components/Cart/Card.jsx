import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { bagActions } from "../../store/bagSlice";

const Card = ({ item }) => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);

  const increment = () => {
    dispatch(bagActions.incrementItem(item));
    setCount(count + 1);
  };

  const decrement = () => {
    if (count === 1) {
      dispatch(bagActions.removeItem(item));
      return;
    }
    setCount(count - 1);
    dispatch(bagActions.decrementItem(item));
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
        <p className="line-clamp-2 ">{item.description}</p>
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
    </div>
  );
};

export default Card;
