import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./store/userSlice";
import productSlice from "./store/productSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userSlice.reducer,
      product: productSlice.reducer,
    },
  });
};
