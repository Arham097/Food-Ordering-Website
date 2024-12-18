import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@mui/material";
import toast from "react-hot-toast";
import { modalActions } from "../../store/modalSlice";
import ConfirmationModal from "./ConfirmationModal";
import textFieldSx from "./TestFieldSx";

const Checkout = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((store) => store.modal.confirmationModal.open);
  console.log(isOpen);
  const items = useSelector((store) => store.bag.items);
  const totalAmount = useSelector((store) => store.bag.totalAmount);
  const GST = parseInt(totalAmount * 0.15);
  const total = totalAmount + GST;
  const formRef = useRef(null);
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const form = formRef.current;
    if (form.checkValidity()) {
      const formData = new FormData(form);
      const formDataObject = Object.fromEntries(formData.entries());

      // Save the form data to localStorage
      localStorage.setItem("formData", JSON.stringify(formDataObject));

      form.submit();
      return true;
    } else {
      toast.error("Please fill all the fields correctly!");
      form.reportValidity();
      return false;
    }
  };
  return (
    <div className="w-screen min-h-screen pt-20  grid max-sm:grid-cols-1 md:grid-cols-[2fr_1fr] pb-6 bg-[#1E2021]">
      <div className="w-full h-full">
        <div className="w-full h-20 flex items-center ml-7">
          <Link to="/cart">
            <img
              src="./Arrows/left_arrow.png"
              alt=""
              className="w-10 h-10 font-bold hover:scale-110 transition-all duration-300"
            />
          </Link>
          <h1 className="text-3xl font-bold text-white my-2 mx-2 md:my-5 md:mx-4 flex-grow">
            Place Your Order
          </h1>
        </div>
        <div className="w-full min-h-96 p-2">
          <form
            className="w-11/12 h-full"
            ref={formRef}
            onSubmit={handleFormSubmit}
          >
            <div className="w-full min-h-4/5 rounded-lg  flex flex-col p-4 bg-[#2c2f2fac] ml-5">
              <h1 className="text-white text-2xl font-semibold">
                Contact Information
              </h1>

              <TextField
                required
                id="outlined-basic"
                type="text"
                label="Full Name"
                name="Full Name"
                variant="outlined"
                sx={textFieldSx}
              />
              <TextField
                required
                id="outlined-basic"
                type="email"
                label="Email"
                name="Email"
                variant="outlined"
                sx={textFieldSx}
              />
              <TextField
                required
                id="outlined-basic"
                type="tel"
                label="Phone Number (03**-*******)"
                name="Phone Number"
                variant="outlined"
                sx={textFieldSx}
              />
              <TextField
                required
                id="outlined-basic"
                type="text"
                label="Address"
                name="Address"
                variant="outlined"
                sx={textFieldSx}
              />
              <TextField
                id="outlined-basic"
                type="text"
                label="Special Instructions"
                name="Special Instructions"
                variant="outlined"
                sx={textFieldSx}
              />
            </div>
            <div className="w-full h-24 mt-2 rounded-lg bg-[#2c2f2fac] ml-5">
              <div className="w-full h-1/2 flex  items-center gap-x-7 accent-orange-500 px-5">
                <input
                  type="radio"
                  required
                  name="payment_type"
                  value="Cash on Delivery"
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
                  name="payment_type"
                  value="Credit/Debit Card"
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
      <div className="w-full h-full mx-auto">
        <div className="sm:w-full md:w-96 max min-h-64 flex flex-col items-center fixed text-white  max-sm:my-4 sm:my-4 md:mt-20 pt-2">
          {items.map((item, key) => (
            <div
              key={key}
              className="w-[90%] h-20 bg-[#2c2f2fac] px-4 mb-2 rounded-md flex flex-col justify-center gap-y-2 "
            >
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
            <button
              className="bg-orange-500 w-full h-full font-bold text-white hover:scale-100 transition-all duration-300 rounded-md"
              onClick={() => {
                dispatch(modalActions.openConfirmationModal());
              }}
            >
              Place Your Order
            </button>
          </div>
        </div>
        <ConfirmationModal handleSubmit={handleFormSubmit} />
      </div>
    </div>
  );
};

export default Checkout;
