import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../../store/modalSlice";
import toast from "react-hot-toast";
import axiosInstance from "../../../Config/axios";

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

export default function ItemDeleteModal() {
  const { open, itemId, itemName } = useSelector(
    (store) => store.modal.itemDeleteModal
  );
  console.log(open);
  // const user = useSelector((store) => store.user.user);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(modalActions.closeItemDeleteModal());
  };

  const handleYes = async () => {
    try {
      const response = await axiosInstance.delete(
        `/items/deleteItem/${itemId}`
      );
      if (response.status === 204) {
        toast.error("Item Deleted Successfully");
      }
    } catch (err) {}

    navigate("/Dashboard");

    dispatch(modalActions.closeItemDeleteModal());
  };

  const handleNo = () => {
    // Add your logic for canceling the action here

    toast.success("Item Deletion Cancelled");
    dispatch(modalActions.closeItemDeleteModal());
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
              xs: 360, // small screens
              sm: 500, // medium screens
              md: 550, // large screens
            },
            height: {
              xs: 220, // small screens
              sm: 240, // medium screens
              md: 250, // large screens
            },
          }}
        >
          <h2 id="confirmation-modal-title" className="font-bold text-2xl ">
            <div className="max-sm:text-xl">Are You Sure to Delete Item ?</div>
            <div className="max-sm:text-xl">
              Item : <span className="text-orange-500">{itemName}</span>
            </div>
            <div className="text-red-600 max-sm:text-xl ">
              This action is Irreversible
            </div>
          </h2>
          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}
          >
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
                "&:hover": {
                  bgcolor: "#F97316",
                },
              }}
              // color="success"
              onClick={handleYes}
            >
              Delete
            </Button>
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
              onClick={handleNo}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
