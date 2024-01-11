"use client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setCookie, deleteCookie } from "cookies-next";

// 로그인 되지 않은 초기상태
const initialState = {
  isLoding: false, //로딩중
  isLogin: false, //로그인 유무
  isLoginError: false, //로그인 에러
  isClearing: false, //로그아웃중
  isClear: false, //로그아웃 유무
  isClearError: "", //로그아웃 에러
  data: {
    message: "", //서버에서 오는 상태 메세지
    token: "", //엑세스 토큰
    refreshToken: "", //리프레시 토큰
    memberInfo: null, //서버에서 받아오는 유저정보
  },
};

// 로그인 실행 함수
//createAsyncThunk에서는 반환값 then을 쓰면 안됨 post를 직접 await해야함
export const loginUser = createAsyncThunk(
  "user/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/auth/login",
        {
          id: userData.id,
          password: userData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  }
);
// 로그인 확인 함수
export const loginCheck = createAsyncThunk(
  "login/check",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/auth/login-check", {
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

//토큰 웹스토리지 저장
export const setToken = (pid, refreshToken) => {
  // localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem("pid", pid);
  setCookie("refreshToken", refreshToken);
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    //로그아웃 함수
    clearUser(state, action) {
      state.isLogin = false;
      state.data.memberInfo = null;
      localStorage.removeItem("pid");
      deleteCookie("refreshToken");
    },
  },
  extraReducers: (builder) => {
    //pending: 대기중, fulfilled: 성공 , rejected: 실패
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.isLoding = true;
        state.isLogin = false;
        state.isLoginError = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isLoginError = false;
        if (action.payload.data.message === "success") {
          state.isLogin = true;
          setToken(
            action.payload.data.memberInfo.pid,
            // action.payload.data.token,
            action.payload.data.refreshToken
          );
          loginCheck(
            // action.payload.data.memberInfo.pid,
            action.payload.data.token
          );
          state.data.memberInfo = action.payload.data.memberInfo;
        } else if (action.payload.data.message === "id error!") {
          state.isLogin = false;
          state.data.memberInfo = null;
        } else if (action.payload.data.message === "password error!") {
          state.isLogin = false;
          state.data.memberInfo = null;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoding = false;
        state.isLogin = false;
        state.isLoginError = true;
      });
    builder.addCase(loginCheck.fulfilled, (state, action) => {
      if (action.payload.data.message === "success") {
        state.isLogin = true;
        state.data.memberInfo = action.payload.data.memberInfo;
      } else if (action.payload.data.message === "expired token") {
        state.isLogin = false;
        state.data.memberInfo = null;
      } else if (action.payload.data.message === "does not login") {
        state.isLogin = false;
        state.data.memberInfo = null;
      }
    });
  },
});
export let { clearUser } = user.actions;

export default user;
