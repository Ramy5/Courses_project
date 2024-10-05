import Cookies from "js-cookie";
import axios from "axios";
import { BASE_URL } from "./constants";
import { toast } from "react-toastify";
import { logoutUser } from "../features/user/userSlice";
import i18next, { t } from "i18next";
import { clearCookies } from "./cookies";

const customFetch = axios.create({
  baseURL: BASE_URL,
});

// export const axiosPrivate = axios.create({
//   baseURL: BASE_URL,
// });

customFetch.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    const lang = i18next?.language?.startsWith("ar") ? "ar" : "en";

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers["Accept-Language"] = lang;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

customFetch.interceptors.response.use(
  (response) => response,
  (error) => {
    const prevRequest = error?.config;

    if (
      error?.response?.status === 401 &&
      !prevRequest.sent &&
      location.pathname !== "/"
    ) {
      prevRequest.sent = true;
      // clearCookies();
      // Cookies.remove("role");
      // Cookies.remove("token");
      // toast.error(t("your session is end, please login again"));
      // location.href = "/";
    }

    return Promise.reject(error);
  }
);

export const checkForUnauthorizedResponse = (error: any, thunkAPI: any) => {
  const errorMsg =
    error.response && error.response.data.message
      ? error.response.data.message
      : "An error occurred";

  if (error?.response?.status === 401) {
    thunkAPI.dispatch(logoutUser());
    return thunkAPI.rejectWithValue(errorMsg);
  }

  toast.error(errorMsg);
  return thunkAPI.rejectWithValue(errorMsg);
};

export default customFetch;
