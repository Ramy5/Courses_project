import { configureStore } from "@reduxjs/toolkit";
import globalSlice from "./features/global/globalSlice";
import userSlice from "./features/user/userSlice";

const store = configureStore({
  reducer: {
    global: globalSlice,
    user: userSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
