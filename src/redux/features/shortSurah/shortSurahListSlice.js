import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getShortSurahList } from "./shortSurahListAPI";

const initialState = {
  isLoading: true,
  shortSurahListData: [],
};

export const getShortSurahListData = createAsyncThunk(
  "shortSurahList/getShortSurahListData",
  async () => {
    const data = await getShortSurahList();
    return data;
  }
);

const shortSurahListSlice = createSlice({
  name: "shortSurahList",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getShortSurahListData.pending, (state) => {
        state.isLoading = true;
        state.shortSurahListData = [];
      })
      .addCase(getShortSurahListData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.shortSurahListData = action.payload;
      })
      .addCase(getShortSurahListData.rejected, (state) => {
        state.isLoading = false;
        state.shortSurahListData = [];
      });
  },
});

export default shortSurahListSlice.reducer;
