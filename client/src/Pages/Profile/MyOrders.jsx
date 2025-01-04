import React, { useEffect, useState } from "react";
import axiosInstance from "../../Config/axios";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { bagActions } from "../../store/bagSlice";
import { socket } from "../../Config/socket";

const MyOrders = () => {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const [updatedOrders, setUpdatedOrders] = useState([]);

  const user2 = useSelector((store) => store.user.user) || null;
  // const user2 = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (user2) {
      getOrders();
    }
    socket.on("orderStatusUpdated", (order) => {
      setUpdatedOrders(order);
      console.log("Order Updated:", order);
    });

    // Cleanup to remove the listener on unmount
    return () => {
      socket.off("orderStatusUpdated");
    };
  }, [updatedOrders]);

  const getOrders = async () => {
    try {
      const response = await axiosInstance.get(`order/getOrders/${user2._id}`);
      if (response.status === 200) {
        setOrders(response.data.data.orders);
        dispatch(bagActions.clearBag());
      }
    } catch (error) {
      if (error.response) {
        return;
      } else {
        // No response from server
        toast.error("Server unreachable. Please try again later.");
      }
    }
  };
  return (
    <div className="w-full min-h-[90vh] flex flex-col ">
      <div className="max-sm:w-full sm:w-11/12 max-sm:rounded-none h-16 bg-[#2c2f2fce] flex items-center justify-center my-7 rounded-lg mx-auto lg:w-10/12 ">
        <h1 className="sm:text-3xl max-sm:text-2xl font-semibold text-white ">
          My Orders
        </h1>
      </div>
      <div className="w-11/12 max-sm:w-full max-sm:rounded-none rounded-xl mx-auto lg:h-96 sm:min-h-72 max-sm:min-h-72  sm:py-3 max-sm:mb-4  sm:mb-4 lg:mb-0 bg-[#2c2f2f] lg:py-5 lg:w-10/12 flex  lg:overflow-x-hidden shadow-xl lg-1100:h-80">
        {orders.length > 0 ? (
          <div className="w-full h-full mb-2">
            {orders.map((order, key) => {
              return (
                <div
                  className="w-[90%] min-h-80  bg-[#3d4141] flex flex-col items-center justify-between py-3 my-3 mb-4 rounded-lg mx-auto gap-y-3 px-2 "
                  key={key}
                >
                  <div className=" w-full h-1/2 sm:text-sm">
                    <h1 className="max-sm:text-sm text-white font-semibold">
                      <span className="text-orange-400">Order Id : </span>
                      <span className="italic"> {order._id}</span>
                    </h1>
                    <h1 className="max-sm:text-sm text-white font-semibold">
                      <span className="text-orange-400">Order Date : </span>
                      <span className="italic">
                        {" "}
                        {new Date(order.orderDetails.orderDate).toDateString()}
                      </span>
                    </h1>
                    <h1 className="text-white max-sm:text-sm font-semibold">
                      <span className="text-orange-400">
                        Delivery Address :{" "}
                      </span>
                      <span className="italic">
                        {order.customerDetails.address}
                      </span>
                    </h1>
                    <h1 className="text-white max-sm:text-sm font-semibold">
                      <span className="text-orange-400">Contact : </span>
                      <span className="italic">
                        {order.customerDetails.phone}
                      </span>
                    </h1>
                    <h1 className="text-white max-sm:text-sm font-semibold">
                      <span className="text-orange-400">Payment Method : </span>
                      <span className="italic">
                        {order.customerDetails.paymentMethod}
                      </span>
                    </h1>
                    <p className="text-white max-sm:text-sm font-semibold">
                      <span className="text-orange-400">Status : </span>
                      <span
                        className={`italic ${
                          order.orderDetails.status === "Pending"
                            ? "text-yellow-400"
                            : "text-green-500"
                        }`}
                      >
                        {order.orderDetails.status}
                      </span>
                    </p>
                  </div>
                  {order.orderDetails.items.map((item, index) => {
                    return (
                      <div
                        className="w-full h-24 flex  gap-3 ring-1  rounded-lg  ring-slate-800 shadow-2xl "
                        key={index}
                      >
                        <div className="text-white text-center w-8 h-cover flex items-center justify-center">
                          {index + 1}.
                        </div>
                        <img
                          src={order.orderDetails.items[index].item.image}
                          alt="Pizza"
                          className="h-cover w-28 rounded-lg"
                        />
                        <div className="flex flex-col justify-center">
                          <h1 className=" text-white font-semibold">
                            {order.orderDetails.items[index].item.name}
                          </h1>
                          <p className="text-white max-sm:text-sm">
                            Price: {order.orderDetails.items[index].item.price}
                          </p>
                          <p className="text-white max-sm:text-sm">
                            Quantity: {order.orderDetails.items[index].quantity}
                          </p>
                        </div>
                      </div>
                    );
                  })}

                  <div className="w-full h-fit-content flex flex-col items-center justify-between gap-2">
                    <p className="text-white max-sm:text-sm font-semibold">
                      <span className="text-orange-400">Total Amount : </span>
                      <span className="italic">
                        RS. {order.orderDetails.totalAmount}
                      </span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
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
