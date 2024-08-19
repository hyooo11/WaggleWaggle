import { createSlice, current } from "@reduxjs/toolkit";
import { StoreListType, StorePaginationType } from "@/types";

declare global {
  interface Window {
    kakao: any;
  }
}

const initialState: StoreListType = {
  region: "서울시 강남구",
  storeData: undefined,
  pagination: undefined,
  status: "",
  error: null,
};

const store = createSlice({
  name: "store",
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.region = action.payload;
    },
    setResults: (state, action) => {
      state.storeData = action.payload;
    },
    setPagination: (state, action) => {
      state.pagination = action.payload;
    },
  },
});

export const { setLocation, setResults, setPagination } = store.actions;
export default store;
