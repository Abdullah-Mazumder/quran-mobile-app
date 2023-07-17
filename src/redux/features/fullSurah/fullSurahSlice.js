import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFullSurah } from "./fullSurahAPI";

const initialState = {
  isLoading: true,
  fullSurahData: "",
  tafsirData: "",
};

export const getFullSurahAndTafsir = createAsyncThunk(
  "fullSurah/getFullSurahAndTafsir",
  async (surahNumber) => {
    const data = await getFullSurah(surahNumber);
    return data;
  }
);

const fullSurahSlice = createSlice({
  name: "fullSurahAndTafsir",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getFullSurahAndTafsir.pending, (state) => {
        state.isLoading = true;
        state.fullSurahData = "";
        state.tafsirData = "";
      })
      .addCase(getFullSurahAndTafsir.fulfilled, (state, action) => {
        state.isLoading = false;
        state.fullSurahData = action.payload.surahData;
        state.tafsirData = action.payload.tafsirData;
      })
      .addCase(getFullSurahAndTafsir.rejected, (state) => {
        state.isLoading = false;
        state.fullSurahData = "";
        state.tafsirData = "";
      });
  },
});

export default fullSurahSlice.reducer;
