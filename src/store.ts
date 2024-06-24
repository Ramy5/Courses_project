import { configureStore } from "@reduxjs/toolkit";
import globalSlice from "./features/global/globalSlice";

const store = configureStore({
  reducer: {
    global: globalSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
