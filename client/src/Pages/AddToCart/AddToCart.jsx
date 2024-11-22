import React from "react";
import Card from "../../Components/Cart/Card";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const AddToCart = () => {
  const items = useSelector((store) => store.bag.items);
  const totalAmount = useSelector((store) => store.bag.totalAmount);
  const GST = parseInt(totalAmount * 0.15);
  const total = totalAmount + GST;
  return (
    <div className="w-screen min-h-[88vh] bg-[#1E2021]">
      {items.length !== 0 ? (
        <div className="grid max-sm:grid-cols-1 md:grid-cols-[2fr_1fr] w-full min-h-[70vh]">
          <div className="w-full min-h-[40vh] ">
            <h1 className="text-center text-white font-bold text-3xl py-5">
              Your Cart
            </h1>
            <div className="flex flex-col items-center">
              {items.map((item) => (
                <Card item={item} key={item._id} />
              ))}
              <div className="bg-black w-56 h-12 my-4 hover:scale-105 transition-all duration-300">
                <Link to="/#explore-section">
                  <button className="bg-orange-500 w-full h-full font-bold text-white hover:scale-105 transition-all duration-300">
                    Add More Items
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full h-64 flex flex-col items-center text-white font-semibold max-sm:my-4 sm:my-4 md:mt-20 ">
            <div className="w-[90%] h-1/3 border-b border-slate-900 bg-[#2C2F2F] flex justify-between items-center px-4 rounded-t-md">
              <span>Subtotal:</span>
              <span>RS. {totalAmount}</span>
            </div>
            <div className="w-[90%] h-1/3 border-b border-slate-900 bg-[#2C2F2F] flex justify-between items-center px-4">
              <span>GST (15%):</span>
              <span>RS. {GST}</span>
            </div>
            <div className="w-[90%] h-1/3 border-b border-slate-900 bg-[#2C2F2F] flex justify-between items-center px-4 rounded-b-md">
              <span>Total:</span>
              <span>Rs. {total}</span>
            </div>
            <div className="bg-black w-[90%] h-16 my-4 hover:scale-105 transition-all duration-300">
              <Link to="/checkout">
                <button className="bg-orange-500 w-full h-full font-bold text-white hover:scale-100 transition-all duration-300 rounded-sm flex items-center justify-center gap-x-2 ">
                  <span>Checkout</span>
                  <img src="./Arrows/right_arrow.png" alt="" className="w-6" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full min-h-[88vh]  flex justify-center items-center ">
          <h1 className="w-[14rem] text-center text-4xl text-white lg:text-5xl lg:w-[18rem]">
            Your Cart is{" "}
            <span className="font-bold text-orange-500">Empty</span>
          </h1>
        </div>
      )}
    </div>
  );
};

export default AddToCart;
