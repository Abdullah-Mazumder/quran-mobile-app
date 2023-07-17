import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";

const initialState = {
  arabicTextSize: 30,
  banglaTextSize: 16,
  englishTextSize: 16,
  isEnableTajweed: true,
  arabicFont: "noorehuda",
  readLater: "",
  lastReadSurah: "",
  isShowBanglaText: true,
  isShowEnglishText: true,
  isShowAudioPlayer: true,
  favouriteSurahList: "",
  bookmarkList: "",
  isPlayFullSurah: true,
  repeatAyahPlaying: 1,
};

const nobleQuranSlice = createSlice({
  name: "nobleQuran",
  initialState,
  reducers: {
    setArabicTextSize: (state, action) => {
      state.arabicTextSize = action.payload;
    },
    setBanglaTextSize: (state, action) => {
      state.banglaTextSize = action.payload;
    },
    setEnglishTextSize: (state, action) => {
      state.englishTextSize = action.payload;
    },
    setIsEnableTajweed: (state, action) => {
      state.isEnableTajweed = action.payload;
      if (action.payload) {
        if (state.arabicFont === "noorehuda") state.arabicFont = "arabicHafezi";
      } else {
        if (state.arabicFont === "arabicHafezi") state.arabicFont = "noorehuda";
      }
    },
    setArabicFont: (state, action) => {
      state.arabicFont = action.payload;
    },
    setReadLater: (state, action) => {
      state.readLater = action.payload;
    },
    setLastReadSurah: (state, action) => {
      state.lastReadSurah = action.payload;
    },
    setIsShowBanglaText: (state, action) => {
      state.isShowBanglaText = action.payload;
    },
    setIsShowEnglishText: (state, action) => {
      state.isShowEnglishText = action.payload;
    },
    setIsShowAudioPlayer: (state, action) => {
      state.isShowAudioPlayer = action.payload;
    },
    setFavouriteSurahList: (state, action) => {
      state.favouriteSurahList = action.payload;
    },
    setBookMarkList: (state, action) => {
      state.bookmarkList = action.payload;
    },
    setIsPlayFullSurah: (state, action) => {
      state.isPlayFullSurah = action.payload;
    },
    setRepeatAyahPlaying: (state, action) => {
      state.repeatAyahPlaying = action.payload;
    },
  },
});

const nobleQuranPersistConfig = {
  key: "quranIslamic/nobleQuran",
  storage: AsyncStorage,
};
const persistedNobleQuranReducer = persistReducer(
  nobleQuranPersistConfig,
  nobleQuranSlice.reducer
);

export default persistedNobleQuranReducer;
export const {
  setArabicTextSize,
  setBanglaTextSize,
  setBookMarkList,
  setEnglishTextSize,
  setFavouriteSurahList,
  setIsEnableTajweed,
  setIsShowAudioPlayer,
  setIsShowBanglaText,
  setIsShowEnglishText,
  setLastReadSurah,
  setReadLater,
  setArabicFont,
  setIsPlayFullSurah,
  setRepeatAyahPlaying,
} = nobleQuranSlice.actions;
