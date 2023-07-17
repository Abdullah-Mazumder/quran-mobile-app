import { View } from "react-native";
import { useEffect } from "react";
import ShortSurah from "./ShortSurah.jsx";
import useTheme from "../../hooks/useTheme.js";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { FlashList } from "@shopify/flash-list";

import Loader from "../Loader";
import { getShortSurahListData } from "../../redux/features/shortSurah/shortSurahListSlice";
import CustomText from "../CustomText";

const ShortSurahListContainer = ({ searchTerm }) => {
  const dispatch = useDispatch();
  const { color } = useTheme();
  const { isLoading, shortSurahListData } = useSelector(
    (state) => state.shortSurahList
  );
  const { lastReadSurah } = useSelector((state) => state.nobleQuran);

  const filterWithSearchTerm = () => {
    return shortSurahListData.filter((surahItem) => {
      const escapedTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(escapedTerm, "i");

      return (
        regex.test(surahItem.englishName) ||
        regex.test(surahItem.enTranslatedName) ||
        regex.test(surahItem.banglaName) ||
        regex.test(surahItem.arabicInBangla) ||
        regex.test(surahItem.arabicName)
      );
    });
  };

  useEffect(() => {
    if (isLoading) {
      dispatch(getShortSurahListData());
    }
  }, []);
  return (
    <View
      style={{ flex: 1, backgroundColor: color.bgColor2 }}
      className="container mx-auto p-0.5 px-1 pb-0"
    >
      {isLoading && (
        <View className="flex items-center justify-center" style={{ flex: 1 }}>
          <Loader />
        </View>
      )}
      {!isLoading && (
        <>
          {filterWithSearchTerm()?.length > 0 ? (
            <View className="w-full h-full">
              <FlashList
                data={filterWithSearchTerm()}
                {...(filterWithSearchTerm().length === 114 && {
                  initialScrollIndex: lastReadSurah - 1,
                })}
                renderItem={({ item }) => {
                  return <ShortSurah surah={item} fromWichScreen="QuranHome" />;
                }}
                estimatedItemSize={100}
              />
            </View>
          ) : (
            <View
              className="flex items-center justify-center"
              style={{ flex: 1 }}
            >
              <CustomText className="text-lg font-semibold text-center">
                কোনো সূরা পাওয়া যায় নি।
              </CustomText>
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default ShortSurahListContainer;
