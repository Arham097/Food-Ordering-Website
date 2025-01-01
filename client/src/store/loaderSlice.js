import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
  name: "loader",
  initialState: {
    loading: false,
  },
  reducers: {
    setLoadingTrue: (state) => {
      state.loading = true;
    },
    setLoadingFalse: (state) => {
      state.loading = false;
    },
  },
})

export const loaderActions = loaderSlice.actions;
export default loaderSlice;