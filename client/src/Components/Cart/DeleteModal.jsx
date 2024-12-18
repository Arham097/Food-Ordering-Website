import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../store/modalSlice";
import toast from "react-hot-toast";
import { bagActions } from "../../store/bagSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 200,
  bgcolor: "#1E2022",
  border: "2px solid orange",
  borderRadius: "10px",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  color: "white",
  textAlign: "center", // Center-align text and buttons
};

export default function DeleteModal() {
  const isOpen = useSelector((store) => store.modal.deleteModal.open);
  const itemId = useSelector((store) => store.modal.deleteModal.itemId);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(modalActions.closeDeleteModal());
  };

  const handleYes = () => {
    dispatch(bagActions.removeItem(itemId));
    toast.success("Item removed successfully!");
    dispatch(modalActions.closeDeleteModal());
  };

  const handleNo = () => {
    // Add your logic for canceling the action here
    toast.error("Item's removal canceled.");
    dispatch(modalActions.closeDeleteModal());
  };

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="confirmation-modal-title"
        aria-describedby="confirmation-modal-description"
      >
        <Box sx={style}>
          <h2 id="confirmation-modal-title" className="font-bold text-2xl ">
            Are you confirm to Delete Item?
          </h2>
          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}
          >
            <Button
              variant="contained"
              sx={{ width: "80px" }}
              color="success"
              onClick={handleYes}
            >
              Yes
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{ width: "80px" }}
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
