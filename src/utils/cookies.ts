import { User_TP } from "../features/user/userSlice";
import Cookies from "js-cookie";

// ADD TO COOKIES
export const addToCookies = (user: User_TP) => {
  if (typeof window !== "undefined") {
    Cookies.set("user", JSON.stringify(user), { expires: 1 });
  }
};

// GET FROM COOKIES
export const getFromCookies = () => {
  if (typeof window !== "undefined") {
    const user = Cookies.get("user");
    const userResult = user ? JSON.parse(user) : null;
    return userResult;
  }
};

// CLEAR FROM COOKIES
export const clearCookies = () => {
  if (typeof window !== "undefined") {
    Cookies.remove("user");
    Cookies.remove("role");
    Cookies.remove("token");
    Cookies.remove("setting");
  }
};
