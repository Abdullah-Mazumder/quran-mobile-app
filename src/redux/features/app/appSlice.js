import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";

const initialState = {
  notes: {},
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
});

const appPersistConfig = {
  key: "quranIslamic/app",
  storage: AsyncStorage,
};
const persistedAppReducer = persistReducer(appPersistConfig, appSlice.reducer);

export default persistedAppReducer;
