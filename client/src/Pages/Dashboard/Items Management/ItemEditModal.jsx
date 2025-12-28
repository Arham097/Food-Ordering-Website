import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../../store/modalSlice";
import toast from "react-hot-toast";
import axiosInstance from "../../../Config/axios";
import { useEffect } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import textFieldSx from "../../Checkout/testFieldSx";
import { useState } from "react";
import { loaderActions } from "../../../store/loaderSlice";
import zIndex from "@mui/material/styles/zIndex";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#1E2022",
  border: "2px solid #F97316",
  borderRadius: "10px",
  boxShadow: 24,
  pt: 2,
  pb: 3,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  color: "white",
  textAlign: "center", // Center-align text and buttons
};

export default function ItemEditModal({ fetchItems }) {
  const { open, itemId } = useSelector((store) => store.modal.itemEditModal);
  const dispatch = useDispatch();
  const loader = useSelector((state) => state.loader.loading);
  const [itemData, setItemData] = useState({
    itemname: "",
    description: "",
    price: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemData({
      ...itemData,
      [name]: value,
    });
  };

  const handleClose = () => {
    dispatch(modalActions.closeItemEditModal());
  };

  const handleSubmit = async (e) => {
    dispatch(loaderActions.setLoadingTrue());
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const response = await axiosInstance.patch(
        `/items/editItem/${itemId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        fetchItems();
        dispatch(loaderActions.setLoadingFalse());
        dispatch(modalActions.closeItemEditModal());
        toast.success("Item Updated");
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

  const handleNo = () => {
    toast.success("Item's Edit Cancelled");
    dispatch(modalActions.closeItemEditModal());
  };

  useEffect(() => {
    if (itemId) fetchItemData();
  }, [itemId]);

  const fetchItemData = async () => {
    try {
      if (!itemId) return;
      const response = await axiosInstance.get(`/items/getItem/${itemId}`);
      if (response.status === 200) {
        const item = response?.data?.data?.item;
        setItemData({
          itemname: item.name,
          description: item.description,
          price: item.price,
          image: item.image,
        });
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
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="confirmation-modal-title"
        aria-describedby="confirmation-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: {
              xs: 380, // small screens
              sm: 500, // medium screens
              md: 550, // large screens
            },
            height: {
              xs: 500, // small screens
              sm: 500, // medium screens
              md: 500, // large screens
            },
          }}
        >
          <div className="w-10/12 h-full flex flex-col justify-center mx-auto ">
            <h1 className="text-white max-sm:text-3xl sm:text-4xl font-bold text-center my-3">
              Edit Item
            </h1>

            <form
              encType="multipart/form-data"
              onReset={() => {
                setCategory("Select Category");
                toast.success("Form Cleared Succesfully");
              }}
              onSubmit={handleSubmit}
            >
              <div className="w-full h-28 flex justify-center gap-x-3">
                <div className="w-1/3 h-full">
                  <img
                    src={itemData.image}
                    alt="Item Image"
                    className="w-full h-full"
                  />{" "}
                </div>
                <div className="w-2/3 full flex flex-col gap-y-3 ">
                  <span className="italic text-sm">
                    {" "}
                    In Case of Edit Picture! Upload New Picture. Otherwise left
                    it empty.
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    name="item_image"
                    className="border rounded p-2 w-full h-12 text-white font-semibold"
                  />
                </div>
              </div>
              <TextField
                required
                id="outlined-basic"
                type="text"
                label="Item Name"
                name="itemname"
                variant="outlined"
                value={itemData.itemname}
                onChange={handleChange}
                sx={textFieldSx}
              />
              <TextField
                required
                id="outlined-basic"
                type="text"
                label="Description"
                name="description"
                value={itemData.description}
                onChange={handleChange}
                variant="outlined"
                sx={textFieldSx}
              />
              <TextField
                required
                id="outlined-basic"
                type="text"
                label="Price"
                name="price"
                value={itemData.price}
                onChange={handleChange}
                variant="outlined"
                sx={textFieldSx}
              />

              <div className="flex gap-x-2 mt-4">
                <button
                  className="bg-orange-500 max-sm:w-1/2 w-full h-full font-bold text-white hover:scale-105 transition-all duration-300 rounded-md  py-3 text-[1.1rem] cursor-pointer"
                  type="submit"
                >
                  Submit
                </button>
                <button
                  className="bg-red-600 max-sm:w-1/2 w-full h-full font-bold text-white hover:scale-105 transition-all duration-300 rounded-md  py-3 text-[1.1rem] cursor-pointer"
                  onClick={handleNo}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
          {loader && (
            <div className="w-full h-[99%] mt-2 fixed z-10 bg-black flex flex-col  bg-opacity-70 justify-center items-center rounded-md">
              <h1 className="text-white lg:text-5xl max-lg:text-4xl font-semibold">
                Please Wait...{" "}
              </h1>
              <div className="loader animate-spin"></div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
