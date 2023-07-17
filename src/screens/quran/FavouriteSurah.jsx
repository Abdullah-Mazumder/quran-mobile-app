import { View, Text } from "react-native";
import useTheme from "../../hooks/useTheme";
import CustomText from "../../components/CustomText";
import FontAwesomeIcon from "../../components/FontAwesomeIcon";
import { englishFont } from "../../utils/fonts";
import { useSelector } from "react-redux";
import { FlashList } from "@shopify/flash-list";
import ShortSurah from "../../components/quran/ShortSurah";
import useGoToBackHandler from "../../hooks/useGoToBackHandler";

const FavouriteSurah = () => {
  useGoToBackHandler("QuranHome");
  const { color } = useTheme();
  const { favouriteSurahList } = useSelector((state) => state.nobleQuran);
  return (
    <>
      <View
        style={{ backgroundColor: color.bgColor1 }}
        className="py-2 flex justify-center items-center"
      >
        <View className="flex flex-row items-center justify-center">
          <CustomText
            style={[
              { color: color.activeIconColor },
              englishFont.englishRegular,
            ]}
            className="text-lg font-bold"
          >
            প্রিয় সূরা লিস্ট
          </CustomText>
          <FontAwesomeIcon name="heart" solid size={17} className="mt-1 ml-2" />
        </View>
      </View>
      <View
        style={{ flex: 1, backgroundColor: color.bgColor2 }}
        className="container mx-auto p-0.5 px-1 pb-0"
      >
        {Object.keys(favouriteSurahList).length > 0 ? (
          <>
            <FlashList
              data={Object.keys(favouriteSurahList)}
              renderItem={({ item }) => {
                return (
                  <>
                    <ShortSurah
                      surah={favouriteSurahList[item]}
                      fromWichScreen="FavouriteSurah"
                    />
                  </>
                );
              }}
              estimatedItemSize={97}
            />
          </>
        ) : (
          <>
            <View
              className="flex flex-row items-center justify-center"
              style={{
                flex: 1,
              }}
            >
              <Text
                className="text-lg font-semibold text-center"
                style={{ color: color.txtColor }}
              >
                আপনার প্রিয় সূরা লিস্ট খালি।
              </Text>
            </View>
          </>
        )}
      </View>
    </>
  );
};

export default FavouriteSurah;
