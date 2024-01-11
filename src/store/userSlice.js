import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { setCookie, deleteCookie } from "cookies-next";

// 로그인 되지 않은 초기상태
const initialState = {
  isLoding: false,
  isLogin: false,
  isLoginError: "",
  loginMsg: "",
  tokenState: "",
  isClearing: false,
  isClear: false,
  isClearError: "",
  data: {
    message: "",
    token: "",
    refreshToken: "",
    memberInfo: null,
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
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  }
);
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
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

//토큰 저장
export const setToken = (pid, token, refreshToken) => {
  // console.log(pid, token, refreshToken);
  if (token === null) {
    console.log("토큰없음");
  } else {
    setCookie("token", token);
  }
  localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem("pid", pid);
  deleteCookie;
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser(state, action) {
      state.isLogin = false;
      state.data.memberInfo = null;
      deleteCookie("token");
      localStorage.removeItem("pid");
      localStorage.removeItem("refreshToken");
    },
    // loginUser(state, action) {},
  },
  extraReducers: (builder) => {
    //pending: 대기중, fulfilled: 성공 , rejected: 실패
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.isLoding = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoding = false;
        if (action.payload.data.message === "success") {
          state.isLogin = true;
          state.loginMsg = "로그인 성공!";
          setToken(
            action.payload.data.memberInfo.pid,
            action.payload.data.token,
            action.payload.data.refreshToken
          );
          state.data.memberInfo = action.payload.data.memberInfo;
        } else if (action.payload.data.message === "id error!") {
          state.isLogin = false;
          state.data = null;
          state.loginMsg = "존재하지 않는 아이디 입니다.";
        } else if (action.payload.data.message === "password error!") {
          state.isLogin = false;
          state.data = null;
          state.loginMsg = "비밀번호를 확인해 주세요.";
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoginError = true;
      });
    builder
      .addCase(loginCheck.pending, (state, action) => {
        state.isLoding = true;
      })
      .addCase(loginCheck.fulfilled, (state, action) => {
        state.isLoding = false;
        if (action.payload.data.message === "success") {
          state.isLogin = true;
          state.tokenState = "success";
        } else if (action.payload.data.message === "expired token") {
          state.tokenState = "expired token";
        } else if (action.payload.data.message === "does not login") {
          // 리프레시 토큰 만료 로그아웃상태로 전환
          state.isLogin = false;
          state.tokenState = "does not login";
        } else {
          state.tokenState = "";
        }
      })
      .addCase(loginCheck.rejected, (state, action) => {});
  },
});
export let { clearUser } = user.actions;

export default user;
