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
    itemDeleteModal: {
      open: false,
      itemId: null,
      itemName: null
    },
    itemEditModal: {
      open: false,
      itemId: null,
    }
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
    openItemDeleteModal: (state, action) => {
      console.log(action.payload);
      state.itemDeleteModal.open = true;
      state.itemDeleteModal.itemId = action?.payload?.id;
      state.itemDeleteModal.itemName = action?.payload?.name;
    },
    closeItemDeleteModal: (state) => {
      state.itemDeleteModal.open = false;
      state.itemDeleteModal.itemId = null;
      state.itemDeleteModal.itemName = null;
    },
    openItemEditModal: (state, action) => {
      state.itemEditModal.open = true;
      state.itemEditModal.itemId = action.payload;
    },
    closeItemEditModal: (state) => {
      state.itemEditModal.open = false;
      state.itemEditModal.itemId = null;
    }
  }
})

export const modalActions = modalSlice.actions;

export default modalSlice;