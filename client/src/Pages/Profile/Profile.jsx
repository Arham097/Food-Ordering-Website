import React from "react";
import textFieldSx from "../Checkout/TestFieldSx";
import { TextField } from "@mui/material";

const Profile = () => {
  return (
    <div className="w-screen min-h-screen bg-[#1E2021] pt-20 flex justify-center items-center py-2 max-sm:pb-10">
      <div className="w-[400px] max-sm:w-[360px] min-h-96 bg-[#2c2f2fac] rounded-xl flex items-center flex-col py-5">
        <h1 className="text-white font-bold max-sm:text-3xl sm:text-3xl ">
          Create Account
        </h1>
        <p className="text-white text-sm text-justify w-[85%] my-3">
          Stay Connected with us for exclusive updates, and seamless ordering.
          Track your orders, access you order history, and enjoy a tailored
          experience at your fingertips.
        </p>
        <form
          method="GET"
          action="/profile"
          className="max-sm:w-[85%] sm:w-[85%] h-full"
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
            label="Phone Number (03xx-xxxxxxx)"
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
    </div>
  );
};

export default Profile;
