// "use client";

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie, setCookie } from "cookies-next";

// 로그인 되지 않은 초기상태
const initialState = {
  isLogin: false,
  data: {
    message: "",
    token: "",
    refreshToken: "",
    memberInfo: {
      pid: null,
      id: "",
      name: "",
      nickName: "",
      email: "",
      address: "",
      phone: "",
      regiDate: "",
      role: "",
      profileImg: "",
    },
  },
};

// 로그인 실행
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
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  }
);

//토큰 저장
const setToken = (pid, token, refreshToken) => {
  // console.log(pid, token, refreshToken);
  if (token === null) {
    console.log("토큰없음");
  } else {
    setCookie("token", token);
  }
  localStorage.setItem("refreshToken", refreshToken);
};
// 로그인 체크(Header.js에 전달)
// success - 성공,
// expired token - 유효기간 만료,
// does not login - authorization 값이 없음
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
      console.log(response);
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const user = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    clearUser() {
      return initialState;
    },
    // loginUser(state, action) {},
  },
  extraReducers: (builder) => {
    //pending: 대기중, fulfilled: 성공 , rejected: 실패
    builder
      .addCase(loginUser.pending, (state, action) => {
        // state.entities.push(action.payload);
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        if (action.payload.data.message === "success") {
          state.isLogin = true;
        } else if (action.payload.data.message === "id error!") {
          return "존재하지 않는 아이디 입니다.";
        } else if (action.payload.data.message === "password error!") {
          return "비밀번호를 확인해 주세요.";
        }
        setToken(
          action.payload.data.memberInfo.pid,
          action.payload.data.token,
          action.payload.data.refreshToken
        );
        // loginCheck(action.payload.data.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        // state.entities.push(action.payload);
      });
    builder.addCase(() => {});
  },
});
export let { clearUser } = user.actions;

export default user;
