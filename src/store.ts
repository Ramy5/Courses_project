import { configureStore } from "@reduxjs/toolkit";
import globalSlice from "./features/global/globalSlice";
import userSlice from "./features/user/userSlice";
import programSlice from "./features/programs/programSlice";

const store = configureStore({
  reducer: {
    global: globalSlice,
    user: userSlice,
    program: programSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
