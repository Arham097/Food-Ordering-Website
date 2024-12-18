import { configureStore } from '@reduxjs/toolkit'
import itemsSlice from './itemSlice';
import bagSlice from './bagSlice';
import modalSlice from './modalSlice';


const store = configureStore({
  reducer: {
    items: itemsSlice.reducer,
    bag: bagSlice.reducer,
    modal: modalSlice.reducer,
  }

})

export default store;