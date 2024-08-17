import { createSlice, current } from "@reduxjs/toolkit";
import { StoreListType, StorePaginationType } from "@/types";

declare global {
  interface Window {
    kakao: any;
  }
}

const initialState: StoreListType = {
  region: "서울시 강남구",
  coord: undefined,
  storeData: undefined,
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
    setCoord: (state, action) => {
      state.coord = action.payload;
    },
  },
});

export const { setCoord, setLocation, setResults } = store.actions;
export default store;
