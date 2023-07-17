import { createSlice } from "@reduxjs/toolkit";
import { darkColors, lightColors } from "../../../utils/color";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";

const initialState = {
  isDark: true,
  color: darkColors,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleIsDark: (state, action) => {
      state.isDark = action.payload;
      state.color = action.payload ? darkColors : lightColors;
    },
  },
});

const themePersistConfig = {
  key: "quranIslamic/theme",
  storage: AsyncStorage,
};
const persistedThemeReducer = persistReducer(
  themePersistConfig,
  themeSlice.reducer
);

export default persistedThemeReducer;
export const { toggleIsDark } = themeSlice.actions;
