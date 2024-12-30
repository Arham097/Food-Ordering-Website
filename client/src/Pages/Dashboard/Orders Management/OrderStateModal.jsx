import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../../store/modalSlice";
import toast from "react-hot-toast";
import axiosInstance from "../../../Config/axios";
// import axiosInstance from "../../Config/axios";

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
  px: 2,
  pb: 3,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  color: "white",
  textAlign: "center", // Center-align text and buttons
};

export default function OrderStateModal({ fetchOrders }) {
  const { open, orderId, status } = useSelector(
    (store) => store?.modal?.orderModal
  );

  const dispatch = useDispatch();
  const orderState = ["Pending", "In Progress", "Completed", "Delivered"];
  const index = orderState.indexOf(status);
  const updatedStatus = orderState[index + 1];

  const handleClose = () => {
    dispatch(modalActions.closeOrderModal());
  };

  const handleYes = async () => {
    try {
      const response = await axiosInstance.patch(
        `/order/updateStatus/${orderId}/${updatedStatus}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        toast.success("Order State Update successfully!");
        fetchOrders();
      }
    } catch (error) {
      if (error.response) {
        toast.error(
          `Error: ${error.response.data.message}` || "Something went wrong!"
        );
      } else {
        toast.error("Server unreachable. Please try again later.");
      }
    }
    dispatch(modalActions.closeOrderModal());
  };

  const handleNo = () => {
    // Add your logic for canceling the action here

    toast.error("Order's State Updation Has Been Cancelled");
    dispatch(modalActions.closeOrderModal());
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
              xs: 430, // small screens
              sm: 550, // medium screens
              md: 600, // large screens
            },
            height: {
              xs: 220, // small screens
              sm: 240, // medium screens
              md: 250, // large screens
            },
          }}
        >
          <div id="confirmation-modal-title" className="font-bold text-2xl ">
            <div className="mb-2 max-sm:text-xl w-fit">
              {" "}
              Are You Sure To move To Next State?
            </div>
            <div className="mb-2 max-sm:text-xl w-fit">
              {" "}
              Order ID : {orderId}
            </div>
            <div className=" max-sm:text-xl">{`${status} -> ${updatedStatus}`}</div>
          </div>
          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}
          >
            <Button
              variant="contained"
              sx={{
                width: {
                  xs: 100, // small screens
                  sm: 150, // medium screens
                  md: 190, // large screens
                },
                height: {
                  xs: 40, // small screens
                  sm: 50, // medium screens
                  md: 60, // large screens
                },
                fontSize: "1rem",
                bgcolor: "#F97316",
                fontWeight: "500",
                fontFamily: "Poppins",
                "&:hover": {
                  bgcolor: "#F97316",
                },
              }}
              // color="success"
              onClick={handleYes}
            >
              Yes
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{
                width: {
                  xs: 100, // small screens
                  sm: 150, // medium screens
                  md: 190, // large screens
                },
                height: {
                  xs: 40, // small screens
                  sm: 50, // medium screens
                  md: 60, // large screens
                },
                fontSize: "1rem",
                fontWeight: "500",
                fontFamily: "Poppins",
              }}
              onClick={handleNo}
            >
              No
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
