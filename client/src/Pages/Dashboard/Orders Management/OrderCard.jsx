import React from "react";
import OrderStateModal from "./OrderStateModal";
import { useDispatch } from "react-redux";
import { modalActions } from "../../../store/modalSlice";

const OrderCard = ({ order, fetchOrders }) => {
  const dispatch = useDispatch();
  return (
    <div className="w-[90%] min-h-80  bg-[#3d4141] flex flex-col items-center justify-between pt-3 my-3 mb-4 rounded-lg mx-auto gap-y-3 px-4 ">
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
          <span className="text-orange-400">Delivery Address : </span>
          <span className="italic">{order.customerDetails.address}</span>
        </h1>
        <h1 className="text-white max-sm:text-sm font-semibold">
          <span className="text-orange-400">Contact : </span>
          <span className="italic">{order.customerDetails.phone}</span>
        </h1>
        <h1 className="text-white max-sm:text-sm font-semibold">
          <span className="text-orange-400">Payment Method : </span>
          <span className="italic">{order.customerDetails.paymentMethod}</span>
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
        {order.orderDetails.status !== "Delivered" && (
          <button
            className="bg-orange-500 w-32 h-full font-semibold text-white hover:bg-orange-600 transition-all duration-300 rounded-md mt-2 py-2 text-[1.1rem] cursor-pointer text-sm"
            onClick={() =>
              dispatch(
                modalActions.openOrderModal({
                  orderId: order._id,
                  status: order.orderDetails.status,
                })
              )
            }
          >
            Update Status
          </button>
        )}
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
          <span className="italic">RS. {order.orderDetails.totalAmount}</span>
        </p>
      </div>
      <OrderStateModal fetchOrders={fetchOrders} />
    </div>
  );
};

export default OrderCard;
