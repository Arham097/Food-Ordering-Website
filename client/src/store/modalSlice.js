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
    orderModal: {
      open: false,
      orderId: null,
      status: null,
    },
    profileDeleteModal: {
      open: false
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
    openProfileDeleteModal: (state) => {
      state.profileDeleteModal.open = true;
      console.log(state.profileDeleteModal.open)
    },
    closeProfileDeleteModal: (state) => {
      state.profileDeleteModal.open = false;
    },
    openOrderModal: (state, action) => {
      state.orderModal.open = true;
      state.orderModal.orderId = action?.payload?.orderId;
      state.orderModal.status = action?.payload?.status;
      console.log(state.orderModal.open)
    },
    closeOrderModal: (state) => {
      state.orderModal.open = false;
      state.orderModal.orderId = null;
      state.orderModal.status = null;
    },
  }
})

export const modalActions = modalSlice.actions;

export default modalSlice;