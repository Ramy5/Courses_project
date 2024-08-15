import { createSlice } from "@reduxjs/toolkit";
interface initialState_TP {
  isDirty: boolean;
}

const initialState: initialState_TP = {
  isDirty: false,
};

const dirtySlice = createSlice({
  name: "dirty",
  initialState: initialState,
  reducers: {
    changeSidebarRoute: (state, { payload }) => {
      return { ...state, isDirty: payload };
    },
  },
});

export const { changeSidebarRoute } = dirtySlice.actions;
export default dirtySlice.reducer;
