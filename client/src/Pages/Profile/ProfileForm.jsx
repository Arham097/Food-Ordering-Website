import React, { useState } from "react";
import textFieldSx from "../Checkout/TestFieldSx";
import { TextField } from "@mui/material";
import { toast } from "react-hot-toast";
import axiosInstance from "../../Config/axios";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/userSlice";
import { socket } from "../../Config/socket";

const ProfileForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await axiosInstance.post("/user/create-account", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 201) {
        if (response?.data?.data?.user?.role === "admin") {
          toast.success(
            "Welcome to Admin Account. Now You can go to dashboard to manage items, orders and menus ."
          );
        } else {
          toast.success(
            "Account Created Succesfully. Now You can go to checkout page to place your order."
          );
        }

        socket.emit("userRegistered", response?.data?.data?.user?._id);

        dispatch(userActions.setUser(response?.data?.data?.user));
        localStorage.setItem(
          "user",
          JSON.stringify(response?.data?.data?.user)
        );
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status code other than 2xx
        toast.error(
          `Error: ${error.response.data.message || "Something went wrong!"}`
        );
      } else {
        // No response from server
        toast.error("Server unreachable. Please try again later.");
      }
    }
  };
  // console.log(user);
  // const userSt = JSON.stringify(localStorage.getItem("user"));
  return (
    <div className="w-[400px] max-sm:w-[360px] min-h-96 bg-[#2c2f2fac] rounded-xl flex items-center flex-col py-5 mt-10">
      <h1 className="text-white font-bold max-sm:text-3xl sm:text-3xl ">
        Create Account
      </h1>
      <p className="text-white text-sm text-justify w-[85%] my-3">
        Stay Connected with us for exclusive updates, and seamless ordering.
        Track your orders, access you order history, and enjoy a tailored
        experience at your fingertips.
      </p>
      <form
        className="max-sm:w-[85%] sm:w-[85%] h-full"
        onSubmit={handleSubmit}
      >
        <TextField
          required
          id="outlined-basic"
          type="text"
          label="Full Name"
          name="fullname"
          variant="outlined"
          sx={textFieldSx}
        />
        <TextField
          required
          id="outlined-basic"
          type="email"
          label="Email"
          name="email"
          variant="outlined"
          sx={textFieldSx}
        />
        <TextField
          required
          id="outlined-basic"
          type="tel"
          label="Phone Number (03xxxxxxxxx)"
          name="phone"
          variant="outlined"
          sx={textFieldSx}
        />
        <button
          className="bg-orange-500 w-full h-full font-bold text-white hover:scale-105 transition-all duration-300 rounded-md my-4 py-3 text-[1.1rem]"
          type="submit"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
export { socket };
