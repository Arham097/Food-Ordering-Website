import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-hot-toast';

const bagSlice = createSlice({
  name: 'bag',
  initialState: {
    items: [],
    totalAmount: 0,
  },
  reducers: {
    addItems: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item._id === newItem._id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {

        state.items.push({ ...newItem, quantity: 1 });
      }
      toast.success('Item added to cart');
      state.totalAmount += newItem.price;
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      const removeItem = state.items.find(item => item._id === itemId);

      if (removeItem) {
        state.totalAmount -= removeItem.price * removeItem.quantity;
        state.items = state.items.filter(item => item._id !== itemId);
      }
    },
    incrementItem: (state, action) => {
      const itemId = action.payload;
      const incrementItem = state.items.find(item => item._id === itemId);

      if (incrementItem) {
        state.totalAmount += incrementItem.price;
        incrementItem.quantity++;
      }
    },
    decrementItem: (state, action) => {
      const itemId = action.payload;
      const itemToDecrement = state.items.find(item => item._id === itemId);

      if (itemToDecrement && itemToDecrement.quantity > 1) {
        itemToDecrement.quantity--;
        state.totalAmount -= itemToDecrement.price;
      }
    },
    clearBag: (state) => {
      state.items = [];
      state.totalAmount = 0
    },
  }
});

export const bagActions = bagSlice.actions;

export default bagSlice;