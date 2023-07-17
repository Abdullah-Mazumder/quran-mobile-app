import { Pressable } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import { ImageBackground, View } from "react-native";
import useTheme from "../../hooks/useTheme";
import vibrate from "../../utils/vibratie";
import convertToBanglaNumber from "engnumber-to-banglanumber";
import CustomText from "../CustomText";
import { useDispatch, useSelector } from "react-redux";
import FontAwesomeIcon from "../FontAwesomeIcon";
import showToast from "../../utils/showToast";
import { setBookMarkList } from "../../redux/features/nobleQuran/nobleQuranSlice";

const BookmarkedAyah = ({ ayah }) => {
  const { color } = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { arabicFont, bookmarkList } = useSelector((state) => state.nobleQuran);
  const { arabicText, banglaTranslation, ayahNumber, surahNumber } = ayah;

  const removeFromBookmark = () => {
    vibrate();
    try {
      const nobleQuranBookmarkLish = JSON.parse(JSON.stringify(bookmarkList));

      const key = `${surahNumber}:${ayahNumber}`;
      delete nobleQuranBookmarkLish[key];
      showToast("Removed From Bookmark");
      dispatch(setBookMarkList(nobleQuranBookmarkLish));
    } catch (error) {
      showToast();
    }
  };

  return (
    <View
      style={[
        {
          overflow: "hidden",
          borderRadius: 5,
          marginBottom: 2,
          backgroundColor: color.bgColor1,
        },
      ]}
    >
      <Pressable
        style={{
          padding: 10,
          paddingRight: 15,
        }}
        onPress={() => {
          vibrate();
          navigation.navigate("SingleSurah", {
            fromWhichScreen: "Bookmark",
            surahNumber,
            ayahNumber,
          });
        }}
      >
        <View className="flex flex-row items-center">
          <View className="w-[15%]">
            <View className="w-12 h-12">
              <ImageBackground
                source={require("../../../assets/image/surahLogo.png")}
                className="w-full h-full flex flex-row items-center justify-center"
              >
                <CustomText>
                  {convertToBanglaNumber(surahNumber.toString())}
                </CustomText>
              </ImageBackground>
            </View>
          </View>
          <View className="w-[70%] mx-2">
            <View>
              <CustomText
                className="text-2xl font-semibold"
                style={{
                  fontFamily: arabicFont,
                }}
              >
                {arabicText.length > 50
                  ? arabicText.substring(0, 50) + "..."
                  : arabicText}
              </CustomText>
            </View>
            <View className="my-0.5">
              <CustomText>
                {banglaTranslation.length > 30
                  ? banglaTranslation.substring(0, 30) + "..."
                  : banglaTranslation}
              </CustomText>
            </View>
            <View className="flex flex-row gap-3">
              <CustomText className="text-xs font-semibold">
                সূরা নংঃ {convertToBanglaNumber(surahNumber.toString())}
              </CustomText>
              <CustomText className="text-xs font-semibold">
                আয়াত নংঃ {convertToBanglaNumber(ayahNumber.toString())}
              </CustomText>
            </View>
          </View>
          <View className="w-[10%] mr-2">
            <View
              style={{ width: 30, height: 30, overflow: "hidden" }}
              className="rounded-full ml-1"
            >
              <Pressable onPress={removeFromBookmark}>
                <View className="flex items-center justify-center h-full w-full">
                  <FontAwesomeIcon name="bookmark" solid={true} size={15} />
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default BookmarkedAyah;
