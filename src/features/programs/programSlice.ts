import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../../utils/axios";
import { toast } from "react-toastify";
import { t } from "i18next";

interface initialState_TP {
  program_name: string;
  program_type: string;
  program_code: string;
  specialization: string;
  academic_levels: string;
  number_classes: string;
  vision: string;
  message: string;
  excellence: string;
  very_good: string;
  good: string;
  acceptable: string;
  courses: any;
  loading: boolean;
  error: string | null;
}

const initialState: initialState_TP = {
  program_name: "",
  program_type: "",
  program_code: "",
  specialization: "",
  academic_levels: "",
  number_classes: "",
  vision: "",
  message: "",
  excellence: "",
  very_good: "",
  good: "",
  acceptable: "",
  courses: [],

  loading: false,
  error: null,
};

export const postProgramData = createAsyncThunk(
  "program",
  async (programData, { rejectWithValue }) => {
    try {
      const response = await customFetch.post("programs", programData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const programSlice = createSlice({
  name: "program",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    console.log("🚀 ~ builder:", builder);
    builder
      .addCase(postProgramData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postProgramData.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(`${t("operation accomplished successfully")}`);
      })
      .addCase(postProgramData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`${action.payload.message}`);
      });
  },
});

export default programSlice.reducer;
