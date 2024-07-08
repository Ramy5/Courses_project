import Cookies from "js-cookie";
import axios from "axios";
import { BASE_URL } from "./constants";
import { toast } from "react-toastify";
import { logoutUser } from "../features/user/userSlice";

const customFetch = axios.create({
  baseURL: BASE_URL,
});

customFetch.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const checkForUnauthorizedResponse = (error: any, thunkAPI: any) => {
  const errorMsg =
    error.response && error.response.data.msg
      ? error.response.data.msg
      : "An error occurred";

  if (error?.response?.status === 401) {
    thunkAPI.dispatch(logoutUser("Unauthorized!"));
    return thunkAPI.rejectWithValue("Unauthorized!");
  }

  toast.error(errorMsg);
  return thunkAPI.rejectWithValue(errorMsg);
};

export default customFetch;
