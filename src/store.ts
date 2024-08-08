import { configureStore } from "@reduxjs/toolkit";
import globalSlice from "./features/global/globalSlice";
import userSlice from "./features/user/userSlice";
import dirtySlice from "./features/dirty/dirtySlice";

const store = configureStore({
  reducer: {
    global: globalSlice,
    user: userSlice,
    dirty: dirtySlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
