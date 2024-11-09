import { createSlice } from "@reduxjs/toolkit";

const bagSlice = createSlice({
  name: 'bag',
  initialState: {
    items: [],
    totalAmount: 0,
  },
  reducers: {
    addItems: (state, action) => {
      let item = action.payload;
      if (!item.quantity) item.quantity = 1;
      state.items.push(item);
      state.totalAmount += item.price * item.quantity;
    },
    removeItem: (state, action) => {
      const itemId = action.payload.id;
      const removeItem = state.items.find(item => item.id === itemId);

      if (removeItem) {
        state.totalAmount -= removeItem.price * removeItem.quantity;
        state.items = state.items.filter(item => item.id !== itemId);
      }
    },
    incrementItem: (state, action) => {
      const itemId = action.payload.id;
      const incrementItem = state.items.find(item => item.id === itemId);

      if (incrementItem) {
        state.totalAmount += incrementItem.price;
        incrementItem.quantity++;
      }
    },
    decrementItem: (state, action) => {
      const itemId = action.payload.id;
      const itemToDecrement = state.items.find(item => item.id === itemId);

      if (itemToDecrement && itemToDecrement.quantity > 1) {
        itemToDecrement.quantity--;
        state.totalAmount -= itemToDecrement.price;
      }
    }

  }
});

export const bagActions = bagSlice.actions;

export default bagSlice;