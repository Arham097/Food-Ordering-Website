import React, { useEffect } from "react";
import axiosInstance from "../../Config/axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const MyOrders = () => {
  const orders = [];
  const user = useSelector((store) => store.user.user);
  const user2 = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (user2) {
      getOrders();
    }
  }, []);

  const getOrders = async () => {
    try {
      const response = await axiosInstance.get(`orders/getOrders/${user2._id}`);
      if (response.status === 200) {
        orders = response.data.data.orders;
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

  return (
    <div className="w-full min-h-[90vh] flex flex-col ">
      <div className="w-11/12 h-16 bg-[#2c2f2fce] flex items-center justify-center my-7 rounded-lg mx-auto lg:w-10/12   ">
        <h1 className="sm:text-3xl max-sm:text-2xl font-semibold text-white ">
          My Orders
        </h1>
      </div>
      <div className="w-11/12 rounded-xl mx-auto lg:min-h-80 sm:min-h-72 max-sm:min-h-72 md:py-3 bg-[#2c2f2f] lg:py-5 lg:w-10/12 flex ">
        {orders.length > 0 ? (
          <div></div>
        ) : (
          <div className="w-full flex flex-col items-center justify-center text-white ">
            <h1 className="sm:text-5xl max-sm:text-4xl font-semibold">
              No <span className="text-orange-500">Orders </span>Yet!
            </h1>
            <p className="sm:text-xl text-center mx-20">
              You haven't placed any orders yet. Go ahead and place your first
              order.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
