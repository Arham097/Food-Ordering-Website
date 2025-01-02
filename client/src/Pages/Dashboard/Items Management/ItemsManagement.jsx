import React, { useEffect, useState } from "react";
import axiosInstance from "../../../Config/axios";
import toast from "react-hot-toast";
import ItemCard from "./ItemCard";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import textFieldSx from "../../Checkout/TestFieldSx";
import {
  menuPropsStyles,
  selectFieldSx,
} from "../Orders Management/selectFieldSx";
import { loaderActions } from "../../../store/loaderSlice";
import { useDispatch, useSelector } from "react-redux";
import ItemDeleteModal from "./ItemDeleteModal";

const ItemsManagement = () => {
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [category, setCategory] = useState("Select Category");
  const dipatch = useDispatch();
  const { setLoadingTrue, setLoadingFalse } = loaderActions;
  const loader = useSelector((state) => state.loader.loading);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axiosInstance.get("/items/sortedItems");
      if (response.status === 200) {
        setItems(response?.data?.data?.items);
      }
    } catch (err) {
      if (err.response) {
        toast.error(
          `Error: ${err.response.data.message}` || "Something went wrong!"
        );
      } else {
        toast.error("Server unreachable. Try Again Later.");
      }
    }
  };

  const handleAddItem = () => {
    console.log("Add Item");
    setIsModalOpen(true);
  };

  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    if (category === "Select Category") {
      e.preventDefault();
      toast.error("Please select a category");
      return;
    }
    dipatch(setLoadingTrue());
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const response = await axiosInstance.post("/items/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 201) {
        toast.success("Item Added Successfully");
        setIsModalOpen(false);
        fetchItems();
        dipatch(setLoadingFalse());
      }
    } catch (err) {
      if (err.response) {
        toast.error(
          `Error: ${err.response.data.message}` || "Something went wrong!"
        );
      } else {
        toast.error("Server unreachable. Try Again Later.");
      }
    }
  };
  return (
    <div className="w-full min-h-[89.5vh] bg-[#1E2021] py-5 relative">
      <div
        className={`max-sm:w-full  h-16 flex w-[95%] sm:mx-auto max-sm:px-2  gap-x-2 ${
          isModalOpen && "opacity-40"
        }`}
      >
        <div className="max-sm:w-[65%] sm:w-3/4 lg:w-5/6 flex items-center justify-center font-semibold text-2xl text-white border shadow-2xl border-black  bg-[#2c2f2f] rounded-lg">
          Items
        </div>
        <div className="max-sm:w-[35%] sm:w-1/4 lg:w-1/6 bg-transparent">
          <button
            className="bg-orange-500 w-full h-[95%] mt-[2px] font-bold text-white hover:bg-orange-600 transition-all duration-300 text-[1.1rem] cursor-pointer rounded-lg"
            onClick={handleAddItem}
          >
            Add New Items
          </button>
        </div>
      </div>
      <div
        className={`w-full min-h-96 lg:h-[440px] lg:w-[95%] lg:mx-auto lg:overflow-x-hidden bg-[#2c2f2f] py-3 my-5 grid max-sm:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:rounded-xl lg:border border-black ${
          isModalOpen && "opacity-40"
        }`}
      >
        {items.map((item, key) => (
          <ItemCard item={item} key={key} />
        ))}
      </div>
      {isModalOpen && (
        <div className="max-sm:w-10/12  h-[540px] pt-10 mx-auto bg-[#2c2f2f] z-10 absolute top-8 left-8 right-8 rounded-xl sm:w-8/12 md:w-7/12 lg:w-6/12 lg:h-[520px] lg:top-8 lg:pt-6">
          <div className="w-10/12 h-full flex flex-col justify-center mx-auto ">
            <h1 className="text-white max-sm:text-3xl sm:text-4xl font-bold text-center">
              Add New Item
            </h1>
            <form
              action="http://localhost:3000/api/v1/items/add"
              method="POST"
              encType="multipart/form-data"
              onReset={() => {
                setCategory("Select Category");
                toast.success("Form Cleared Succesfully");
              }}
              onSubmit={handleSubmit}
            >
              <TextField
                required
                id="outlined-basic"
                type="text"
                label="Item Name"
                name="itemname"
                variant="outlined"
                sx={textFieldSx}
              />
              <TextField
                required
                id="outlined-basic"
                type="text"
                label="Description"
                name="description"
                variant="outlined"
                sx={textFieldSx}
              />
              <TextField
                required
                id="outlined-basic"
                type="text"
                label="Price"
                name="price"
                variant="outlined"
                sx={textFieldSx}
              />

              <FormControl fullWidth sx={selectFieldSx}>
                <InputLabel id="demo-simple-select-label">
                  Select Category
                </InputLabel>
                <Select
                  name="category"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  label="Select Category"
                  required
                  onChange={handleChangeCategory}
                  MenuProps={menuPropsStyles}
                  defaultValue="Select Category"
                >
                  <MenuItem value="Select Category" disabled>
                    Select Category
                  </MenuItem>
                  <MenuItem value="Burgers">Burgers</MenuItem>
                  <MenuItem value="Pizzas">Pizzas</MenuItem>
                  <MenuItem value="Chicken">Chicken</MenuItem>
                  <MenuItem value="Drinks">Drinks</MenuItem>
                </Select>
              </FormControl>

              <input
                type="file"
                accept="image/*"
                required
                name="item_image"
                className="border rounded p-2 w-full my-4 h-14  py-3 text-white font-semibold"
              />
              <div className="flex gap-x-2">
                <button
                  className="bg-orange-500 max-sm:w-1/2 w-full h-full font-bold text-white hover:scale-105 transition-all duration-300 rounded-md  py-3 text-[1.1rem] cursor-pointer"
                  type="submit"
                >
                  Add
                </button>
                <button
                  className="bg-red-600 max-sm:w-1/2 w-full h-full font-bold text-white hover:scale-105 transition-all duration-300 rounded-md  py-3 text-[1.1rem] cursor-pointer"
                  type="reset"
                >
                  Clear
                </button>
              </div>
            </form>
          </div>
          <button
            className="absolute top-3 right-3 text-white bg-black rounded-full px-2 text-2xl"
            onClick={() => setIsModalOpen(false)}
          >
            X
          </button>
        </div>
      )}
      {loader && (
        <div className="w-full h-full fixed z-10 top-16 max-lg:top-24 bg-black flex flex-col mx-auto bg-opacity-70 max-lg:pt-10 justify-center items-center lg:left-40 lg:right-32">
          <h1 className="text-white lg:text-5xl max-lg:text-4xl max-lg: font-semibold">
            Please Wait...{" "}
          </h1>
          <div className="loader animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default ItemsManagement;
