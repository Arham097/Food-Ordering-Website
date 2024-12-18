import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    confirmationModal: {
      open: false,
    },
    deleteModal: {
      itemId: "",
      open: false,
    },
    profileModal: {
      open: false,
    },
  },
  reducers: {
    openConfirmationModal: (state) => {
      console.log(state.confirmationModal.open);
      state.confirmationModal.open = true;
    },
    closeConfirmationModal: (state) => {
      state.confirmationModal.open = false;
    },
    openDeleteModal: (state, action) => {
      const itemId = action.payload;
      state.deleteModal.itemId = itemId;
      state.deleteModal.open = true;
    },
    closeDeleteModal: (state) => {
      state.deleteModal.open = false;
      state.deleteModal.itemId = "";
    },
    openProfileModal: (state) => {
      state.profileModal.open = true;
    },
    closeProfileModal: (state) => {
      state.profileModal.open = false;
    },
  }

})

export const modalActions = modalSlice.actions;

export default modalSlice;