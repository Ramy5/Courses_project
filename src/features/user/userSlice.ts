import { createSlice } from "@reduxjs/toolkit";

interface initialState_TP {}

const initialState: initialState_TP = {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export const test = userSlice.actions;
export default userSlice.reducer;
