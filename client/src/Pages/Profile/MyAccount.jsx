import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import textFieldSx from "../Checkout/TestFieldSx";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import axiosInstance from "../../Config/axios";
import { userActions } from "../../store/userSlice";
import DeleteModal from "./ProfileDeleteModal";
import { modalActions } from "../../store/modalSlice";
import ProfileDeleteModal from "./ProfileDeleteModal";

const MyAccount = () => {
  const user = useSelector((store) => store.user.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullname: user.fullname,
        email: user.email,
        phone: user.phone,
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    data.id = user._id;
    try {
      const response = await axiosInstance.put("/user/update-account", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        toast.success("Account Updated Succesfully");
        dispatch(userActions.setUser(response?.data?.data?.user));
      }
    } catch (error) {
      console.log(error);
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

  const handleDeleteAccount = async () => {
    dispatch(modalActions.openProfileDeleteModal());
  };

  return (
    <div className="w-full min-h-[90vh] flex flex-col ">
      <div className="w-11/12 h-16 bg-[#2c2f2fce] flex items-center justify-center my-4 rounded-lg mx-auto ">
        <h1 className="text-2xl font-semibold text-white ">
          Personal Information
        </h1>
      </div>
      <div className="w-11/12 rounded-xl mx-auto min-h-96 pt-5 bg-[#2c2f2f] ">
        <form
          className="max-sm:w-[85%] sm:w-[85%] h-full flex flex-col  mx-auto"
          onSubmit={handleSubmit}
        >
          <TextField
            required
            id="outlined-basic"
            value={formData.fullname}
            onChange={handleInputChange}
            type="text"
            label="Full Name"
            name="fullname"
            variant="outlined"
            sx={textFieldSx}
          />
          <TextField
            required
            id="outlined-basic"
            value={formData.email}
            onChange={handleInputChange}
            type="email"
            label="Email"
            name="email"
            variant="outlined"
            sx={textFieldSx}
          />
          <TextField
            required
            id="outlined-basic"
            value={formData.phone}
            onChange={handleInputChange}
            type="tel"
            label="Phone Number (03xxxxxxxxx)"
            name="phone"
            variant="outlined"
            sx={textFieldSx}
          />
          <button
            className="bg-orange-500 w-full h-full font-bold text-white hover:scale-105 transition-all duration-300 rounded-md mt-2 py-3 text-[1.1rem] cursor-pointer"
            type="submit"
          >
            Update Your Information
          </button>
          <button
            className="bg-red-600 w-full h-full font-bold text-white hover:scale-105 transition-all duration-300 rounded-md my-2 py-3 text-[1.1rem] cursor-pointer"
            type="button"
            onClick={handleDeleteAccount}
          >
            Delete Your Account
          </button>
        </form>
        <ProfileDeleteModal />
      </div>
    </div>
  );
};

export default MyAccount;
