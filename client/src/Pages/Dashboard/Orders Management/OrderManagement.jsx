import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import { selectFieldSx, menuPropsStyles } from "./selectFieldSx";
import axiosInstance from "../../../Config/axios";
import OrderCard from "./OrderCard";
import { socket } from "../../Profile/ProfileForm";

const OrderManagement = () => {
  const [orderState, setOrderState] = useState("All");
  const [allOrders, setAllOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    if (allOrders.length > 0) {
      if (orderState === "All") {
        setFilteredOrders(allOrders);
      } else {
        const filtered = allOrders.filter(
          (order) => order.orderDetails.status === orderState
        );
        setFilteredOrders(filtered);
      }
    }
  }, [allOrders, orderState]);

  const handleChange = (event) => {
    setOrderState(event.target.value);
  };

  const fetchOrders = async () => {
    const orders = await axiosInstance.get("order/getOrder/all");
    if (orders) {
      setAllOrders(orders?.data?.data?.orders);
    }
  };

  useEffect(() => {
    fetchOrders();
    socket.on("newOrder", () => {
      fetchOrders();
    });

    return () => {
      socket.off("newOrder");
    };
  }, []);

  return (
    <div className="w-full min-h-[89.5vh]  py-7 lg:py-3 ">
      <div className="max-sm:w-full h-16 bg-[#2c2f2f]  flex items-center justify-center text-white font-semibold text-3xl lg:w-11/12 mx-auto rounded-xl">
        Orders
      </div>
      <div className=" max-sm:w-10/12 sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 mx-auto mt-5">
        <Box sx={selectFieldSx}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Filters</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={orderState}
              label="Age"
              onChange={handleChange}
              MenuProps={menuPropsStyles}
              defaultValue="All"
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Delivered">Delivered</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      <div
        className={`w-full lg:w-11/12 mx-auto lg:mt-4 lg:rounded-xl lg:h-[22rem] ${
          allOrders.length > 0 && "lg:overflow-x-hidden"
        } mb-2 bg-[#2c2f2f] max-lg:py-2 max-lg:my-4 max:lg:rounded-xl`}
      >
        <div className="w-full h-full my-5 ">
          {allOrders.length > 0 ? (
            (filteredOrders || allOrders).map((order) => {
              return (
                <OrderCard
                  order={order}
                  key={order._id}
                  fetchOrders={fetchOrders}
                />
              );
            })
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-white ">
              <h1 className="sm:text-5xl max-sm:text-4xl font-semibold">
                No <span className="text-orange-500">Orders </span>Yet!
              </h1>
              <p className="sm:text-xl text-center mx-20">
                There is no order to show right now. Please check back later.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
