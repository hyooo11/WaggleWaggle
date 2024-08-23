import { createSlice } from "@reduxjs/toolkit";
import { StoreListType } from "@/types";

const initialState: StoreListType = {
  region: "서울시 강남구",
  storeData: undefined,
  pagination: undefined,
  mapCoords: { x: "", y: "" },
  markers: {}, // 마커 객체를 ID로 매핑
  infoWindows: {}, // 정보창 객체를 ID로 매핑
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
    setMapCoords: (state, action) => {
      const { x, y } = action.payload;
      state.mapCoords = { x, y };
    },
    setMarkers(state, action) {
      state.markers = action.payload;
    },
    setInfoWindows(state, action) {
      state.infoWindows = action.payload;
    },
  },
});

export const {
  setLocation,
  setResults,
  setPagination,
  setMapCoords,
  setMarkers,
  setInfoWindows,
} = store.actions;
export default store;
