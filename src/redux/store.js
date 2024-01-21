import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import productSlice from "./features/productSlice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    product: productSlice.reducer,
  },
});
