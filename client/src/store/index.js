import { combineReducers, configureStore } from '@reduxjs/toolkit'
import itemsSlice from './itemSlice';
import bagSlice from './bagSlice';
import modalSlice from './modalSlice';
import userSlice from './userSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  items: itemsSlice.reducer,
  bag: bagSlice.reducer,
  modal: modalSlice.reducer,
  user: userSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store
const store = configureStore({
  reducer: persistedReducer,
});

// Persistor for Redux Persist
const persistor = persistStore(store);

export { store, persistor };