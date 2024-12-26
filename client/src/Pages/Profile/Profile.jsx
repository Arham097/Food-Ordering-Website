import React, { useState } from "react";
import textFieldSx from "../Checkout/TestFieldSx";
import { TextField } from "@mui/material";
import { toast } from "react-hot-toast";
import axiosInstance from "../../Config/axios";
import ProfileForm from "./ProfileForm";
import { useSelector } from "react-redux";
import MyOrders from "./MyOrders";
import MyAccount from "./MyAccount";
import { PiBagSimpleBold } from "react-icons/pi";
import { IoPersonOutline } from "react-icons/io5";
import { orange } from "@mui/material/colors";

const Profile = () => {
  const [myOrders, setMyOrders] = useState(true);
  const [myAccount, setMyAccount] = useState(false);
  const user = useSelector((store) => store.user.user);
  return (
    <div className="w-screen md:min-h-screen bg-[#1E2021] pt-16 flex justify-center items-center lg:overflow-hidden pb-10">
      {!user ? (
        <ProfileForm />
      ) : (
        <div className="min-w-full min-h-[88vh] bg-[#1E2021] lg:flex ">
          <div className="w-full  h-16 bg-[#2c2f2f] flex items-center justify-between lg:h-[97vh] lg:flex-col lg:justify-start lg:w-[420px]  ">
            <div
              className={`flex justify-center items-center w-1/2 h-full lg:h-16  lg:w-full gap-x-2 lg:border-b cursor-pointer lg:border-black text-white ${
                myOrders ? "bg-orange-500" : "bg-[#2c2f2f] "
              }
              }`}
              onClick={() => {
                setMyOrders(true);
                setMyAccount(false);
              }}
            >
              <PiBagSimpleBold className="text-xl" />
              <span>My Orders</span>
            </div>
            <div
              className={`flex items-center justify-center w-1/2 h-full gap-x-2 cursor-pointer lg:h-16 lg:w-full lg:border-b lg:border-slate- text-white ,md:border-l-2 border-black ${
                myAccount ? "bg-orange-500" : "bg-[#2c2f2f]"
              }`}
              onClick={() => {
                setMyAccount(true);
                setMyOrders(false);
              }}
            >
              <IoPersonOutline className="text-xl" />
              <span>My Account</span>
            </div>
          </div>
          {myOrders && <MyOrders />}
          {myAccount && <MyAccount />}
        </div>
      )}
    </div>
  );
};

export default Profile;
