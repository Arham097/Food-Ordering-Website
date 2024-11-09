import { createSlice } from "@reduxjs/toolkit";

const bagSlice = createSlice({
  name: 'bag',
  initialState: [],
  reducers: {
    addItems: (state, action) => {
      return [...state, action.payload];
    },
    removeItem: (state, action) => {
      return state.filter((item) => item.id !== action.payload.id);
    }
  }
});

export const bagActions = bagSlice.actions;

export default bagSlice;