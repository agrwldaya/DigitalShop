// src/app/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import shopkeeperReducer from "./shopkeeperSlice";

export const store = configureStore({
  reducer: {
    shopkeeper: shopkeeperReducer,
  },
});
