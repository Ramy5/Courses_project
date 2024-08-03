import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import { toast } from "react-toastify";
import {
  addToCookies,
  clearCookies,
  getFromCookies,
} from "../../utils/cookies";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";

export interface User_TP {
  email: string;
  password: string;
  loginType: string;
}

interface initialState_TP {
  isLoading: boolean;
  user: null | User_TP;
  role: null | string;
  token: null | string;
}

const initialState: initialState_TP = {
  isLoading: false,
  user: getFromCookies(),
  role: Cookies.get("role") || null,
  token: Cookies.get("token") || null,
};

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user: User_TP, thunkAPI) => {
    try {
      const response = await customFetch.post("login", user);
      return response.data.data;
    } catch (error) {
      return checkForUnauthorizedResponse(error, thunkAPI);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state, action) => {
      state.user = null;
      clearCookies();
      Cookies.remove("role");
      Cookies.remove("token");

      if (action.payload) {
        toast.success(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const { user, loginType, token } = payload;
        state.user = user;
        state.role = loginType;
        state.token = token;
        addToCookies(user);
        Cookies.set("role", loginType);
        Cookies.set("token", token);
        toast.success(`Welcome back ${user?.name}`);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload as string);
      });
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
