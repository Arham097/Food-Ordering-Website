import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../store/modalSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 230,
  bgcolor: "#1E2022",
  border: "2px solid #F97316",
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

export default function ProfileDeleteModal() {
  const isOpen = useSelector((store) => store.modal.profileDeleteModal.open);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    dispatch(modalActions.closeProfileDeleteModal());
  };

  const handleYes = () => {
    // Add your logic for deleting the account here
    dispatch(modalActions.closeProfileDeleteModal());
  };

  const handleNo = () => {
    // Add your logic for canceling the action here
    toast.error(
      "Account deletion has been canceled. Your account is safe with us."
    );
    dispatch(modalActions.closeProfileDeleteModal());
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
            Are you sure you want to delete your account?
          </h2>
          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}
          >
            <Button
              variant="contained"
              color="error"
              sx={{
                width: "190px",
                height: "60px",
                fontSize: "1rem",
                // bgcolor: "#F97316",
                fontWeight: "500",
                fontFamily: "Poppins",
                // "&:hover": {
                //   bgcolor: "#F97316",
                // },
              }}
              // color="success"
              onClick={handleYes}
            >
              Yes
            </Button>
            <Button
              variant="contained"
              color="success"
              sx={{
                width: "190px",
                height: "60px",
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
