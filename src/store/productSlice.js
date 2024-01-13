import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import LocalStorage from "../util/localstorage";

//아무것도 검색되지 않은 상품리스트 초기상태
const initialState = {
  isLoading: false,
  isSuccess: false,
  isProductListError: "",
  searchCount: 0,
  data: null,
};

//상품리스트 가져오기
export const productItem = createAsyncThunk(
  "product/fetchList",
  async (pageNum, { rejectWithValue }) => {
    const userPid = LocalStorage.getItem("pid");
    try {
      const response = await axios.get(
        `/api/product/wine/${userPid === null ? 0 : userPid}/search?page=${
          pageNum === null || undefined ? 1 : pageNum
        }`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
//상품리스트 갯수 가져오기
export const productItemCount = createAsyncThunk(
  "product/fetchListCount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/product/wine/count`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const product = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(productItem.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isProductListError = false;
      })
      .addCase(productItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isProductListError = false;
        state.data = action.payload.data;
      })
      .addCase(productItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isProductListError = action.error.message;
      });
    builder
      .addCase(productItemCount.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isProductListError = false;
      })
      .addCase(productItemCount.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.searchCount = action.payload.data;
      })
      .addCase(productItemCount.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isProductListError = action.error.message;
      });
  },
});

export default product;
