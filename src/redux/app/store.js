import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";

import persistedThemeReducer from "../features/theme/themeSlice";
import shortSurahReducer from "../features/shortSurah/shortSurahListSlice";
import fullSurahWithTafsirReducer from "../features/fullSurah/fullSurahSlice";
import persistedNobleQuranReducer from "../features/nobleQuran/nobleQuranSlice";
import persistedAppReducer from "../features/app/appSlice";

const store = configureStore({
  reducer: {
    theme: persistedThemeReducer,
    app: persistedAppReducer,
    shortSurahList: shortSurahReducer,
    fullSurahWithTafsir: fullSurahWithTafsirReducer,
    nobleQuran: persistedNobleQuranReducer,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares({ serializableCheck: false }),
});
const persistor = persistStore(store);
export { store, persistor };
