import { configureStore } from "@reduxjs/toolkit";
import globalSlice from "./features/global/globalSlice";
import programSlice from "./features/programs/programSlice";

const store = configureStore({
  reducer: {
    global: globalSlice,
    program: programSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
