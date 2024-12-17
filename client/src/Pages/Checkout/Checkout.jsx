import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { TextField } from "@mui/material";
import toast from "react-hot-toast";

const Checkout = () => {
  const items = useSelector((store) => store.bag.items);
  const totalAmount = useSelector((store) => store.bag.totalAmount);
  const GST = parseInt(totalAmount * 0.15);
  const total = totalAmount + GST;
  const inputArray = [
    "Full Name",
    "Email",
    "Phone Number",
    "Address",
    "Special Instructions",
  ];
  return (
    <div className="w-screen min-h-[88vh]  grid max-sm:grid-cols-1 md:grid-cols-[2fr_1fr] pb-6 bg-[#1E2021]">
      <div className="w-full h-full">
        <div className="w-full h-20 flex items-center ml-7">
          <Link to="/cart">
            <img
              src="./Arrows/left_arrow.png"
              alt=""
              className="w-10 h-10 font-bold"
            />
          </Link>
          <h1 className="text-3xl font-bold text-white my-2 mx-2 md:my-5 md:mx-4 flex-grow">
            Place Your Order
          </h1>
        </div>
        <div className="w-full min-h-96 p-2">
          <form action="" className="w-11/12 h-full">
            <div className="w-full min-h-4/5 rounded-lg  flex flex-col p-4 bg-[#2c2f2fac] ml-5">
              <h1 className="text-white text-2xl font-semibold">
                Contact Information
              </h1>
              {inputArray.map((i) => (
                <TextField
                  id="outlined-basic"
                  label={i}
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "white", // Tailwind's orange-500 color
                      },
                      "&:hover fieldset": {
                        borderColor: "white", // Darker shade for hover effect
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#F97316", // Focused state color
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "white", // Label color
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#F97316", // Label color when focused
                    },
                    "& .MuiInputBase-input": {
                      color: "#ffffff", // Input text color set to white
                    },
                    marginTop: "1rem",
                  }}
                />
              ))}
            </div>
            <div className="w-full h-24 mt-2 rounded-lg bg-[#2c2f2fac] ml-5">
              <div className="w-full h-1/2 flex  items-center gap-x-7 accent-orange-500 px-5">
                <input
                  type="radio"
                  checked
                  name="delivery_type"
                  id=""
                  className="w-5 h-5 bg-orange-500"
                />
                <div className="flex items-center gap-x-3">
                  <h1 className="text-white font-semibold">Cash on Delivery</h1>
                  <img
                    src="./Delivery Icons/cash.png"
                    alt=""
                    className="w-8 h-8"
                  />
                </div>
              </div>
              <div className="w-full h-1/2  flex  items-center gap-x-7 px-5 accent-orange-500">
                <input
                  type="radio"
                  name="delivery_type"
                  id=""
                  className="w-5 h-5 accent-orange-500"
                />
                <div className="flex items-center gap-x-3">
                  <h1 className="text-white font-semibold">
                    Credit/Debit Card
                  </h1>
                  <img
                    src="./Delivery Icons/atm.png"
                    alt=""
                    className="w-8 h-8"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="w-full h-full  mx-auto">
        <div className="sm:w-full md:w-96 max min-h-64 flex flex-col items-center  text-white  max-sm:my-4 sm:my-4 md:mt-20 pt-2">
          {items.map((item) => (
            <div className="w-[90%] h-20 bg-[#2c2f2fac] px-4 mb-2 rounded-md flex flex-col justify-center gap-y-2 ">
              <div className="flex gap-x-3">
                <h1 className="font-semibold text-[1.1rem]">{item.name}</h1>
                <div className="flex items-center justify-center w-7 h-6 bg-orange-500 rounded">
                  <span className="text-sm font-bold">x{item.quantity}</span>
                </div>
              </div>
              <div className=" flex items-center justify-between  ">
                <span>Price</span>
                <span>+ Rs. {item.price}</span>
              </div>
            </div>
          ))}
          <div className="w-[90%] h-16 border-b border-slate-900 bg-[#2C2F2Fac] flex justify-between items-center px-4 rounded-t-md font-semibold">
            <span>Subtotal:</span>
            <span>Rs. {totalAmount} </span>
          </div>
          <div className="w-[90%] h-16 border-b border-slate-900 bg-[#2C2F2Fac] flex justify-between items-center px-4 font-semibold">
            <span>GST (15%):</span>
            <span>RS. {GST} </span>
          </div>
          <div className="w-[90%] h-16 border-b border-slate-900 bg-[#2C2F2Fac] flex justify-between items-center px-4 rounded-b-md font-semibold">
            <span>Total:</span>
            <span>Rs. {total} </span>
          </div>
          <div className="bg-black w-[90%] h-14 my-4 hover:scale-105 transition-all duration-300 rounded-md">
            <Link to="/checkout">
              <button
                className="bg-orange-500 w-full h-full font-bold text-white hover:scale-100 transition-all duration-300 rounded-md"
                onClick={() => {
                  toast.success("Your Order has been Placed");
                }}
              >
                Place Your Order
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
