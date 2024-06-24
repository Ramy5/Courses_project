import { createSlice } from "@reduxjs/toolkit";

interface initialState_TP {
  sidebarColor: string;
}

const initialState: initialState_TP = {
  sidebarColor: "#393D94",
};

const globalSlice = createSlice({
  name: "global",
  initialState: initialState,
  reducers: {
    changeSidebarColor: (state, { payload }) => {
      return { ...state, sidebarColor: payload };
    },
  },
});

export const { changeSidebarColor } = globalSlice.actions;
export default globalSlice.reducer;
