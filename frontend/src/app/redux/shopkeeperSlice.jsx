// src/app/redux/shopkeeperSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  products: [],
  orders: [],
  profile: {},
  totalRevenue: 0
};

const shopkeeperSlice = createSlice({
  name: "shopkeeper",
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.products = [];
      state.orders = [];
      state.totalRevenue = 0;
      state.profile = {};
    },
    getTotalProduct: (state, action) => {
      state.products = action.payload;
    },
    getTotalOrder: (state, action) => {
      state.orders = action.payload;
    },
    getProfile: (state, action) => {
      state.profile = action.payload;
    }
  },
});

export const { login, logout, getTotalProduct, getTotalOrder, getProfile } = shopkeeperSlice.actions;
export default shopkeeperSlice.reducer;
