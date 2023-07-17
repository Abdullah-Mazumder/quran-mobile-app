import { View, ImageBackground } from "react-native";
import { Pressable } from "@react-native-material/core";
import useTheme from "../../hooks/useTheme";
import convertToBanglaNumber from "engnumber-to-banglanumber";
import FontAwesomeIcon from "../FontAwesomeIcon";
import { arabicFont, banglaFont, englishFont } from "../../utils/fonts";
import { useNavigation } from "@react-navigation/native";
import vibrate from "../../utils/vibratie";

import CustomText from "../CustomText";
import { useDispatch, useSelector } from "react-redux";
import showToast from "../../utils/showToast";
import { setFavouriteSurahList } from "./../../redux/features/nobleQuran/nobleQuranSlice";

const ShortSurah = ({ surah, fromWichScreen }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { color } = useTheme();
  const { readLater, favouriteSurahList } = useSelector(
    (state) => state.nobleQuran
  );
  const {
    id,
    arabicName,
    englishName,
    banglaName,
    enTranslatedName,
    enLocation,
    arLocation,
    totalAyah,
    arabicInBangla,
  } = surah;

  const saveToFavouriteList = async (data) => {
    vibrate();
    try {
      let favouriteSurahListLocal;
      if (!Boolean(favouriteSurahList)) {
        favouriteSurahListLocal = {};
      } else {
        favouriteSurahListLocal = JSON.parse(
          JSON.stringify(favouriteSurahList)
        );
      }

      if (favouriteSurahListLocal[data.id]) {
        delete favouriteSurahListLocal[data.id];
        showToast("Removed From Favorite Surah!");
      } else {
        favouriteSurahListLocal[data.id] = data;
        showToast("Added To Favorite Surah!");
      }

      dispatch(setFavouriteSurahList(favouriteSurahListLocal));
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
            fromWhichScreen: fromWichScreen,
            surahNumber: id,
          });
        }}
      >
        <View className="flex flex-row items-center justify-between w-[100%] mx-auto">
          <View className="w-12 h-12">
            <ImageBackground
              source={require("../../../assets/image/surahLogo.png")}
              className="w-full h-full flex flex-row items-center justify-center"
            >
              <CustomText>{convertToBanglaNumber(id.toString())}</CustomText>
            </ImageBackground>
          </View>
          <View className="w-[65%] mr-auto ml-3">
            <View className="flex flex-row items-center gap-2">
              <CustomText
                className="text-xl text-left"
                style={arabicFont.arabicHafezi}
              >
                {arabicName}
              </CustomText>
              <CustomText
                style={[banglaFont.banglaRegular]}
                className="text-sm font-semibold"
              >
                {englishName}
              </CustomText>
            </View>
            <View className="flex flex-row items-end gap-0">
              <CustomText
                style={[englishFont.englishRegular, { fontSize: 15 }]}
                className=""
              >
                {arabicInBangla} -{" "}
              </CustomText>
              <CustomText
                style={[englishFont.englishRegular]}
                className="text-sm"
              >
                {banglaName.length > 17
                  ? banglaName.substr(0, 17) + "..."
                  : banglaName}
              </CustomText>
            </View>
            <View className="flex flex-row items-center gap-2">
              <CustomText
                style={[
                  {
                    fontSize: 18,
                  },
                  arabicFont.arabicHafezi,
                ]}
              >
                {arLocation}
              </CustomText>
              <CustomText
                style={[englishFont.englishRegular]}
                className="text-[14px]"
              >
                ({enLocation === "Makkih" ? "মাক্কি" : "মাদানি"})
              </CustomText>
              <CustomText style={[englishFont.englishRegular]}>
                আয়াত: {convertToBanglaNumber(totalAyah.toString())}
              </CustomText>
            </View>
          </View>
          {readLater[id] && (
            <View className="">
              <FontAwesomeIcon name="history" size={15} />
            </View>
          )}
          <View
            style={{ width: 30, height: 30, overflow: "hidden" }}
            className="rounded-full ml-2"
          >
            <Pressable onPress={() => saveToFavouriteList(surah)}>
              <View className="flex items-center justify-center h-full w-full">
                <FontAwesomeIcon
                  name="heart"
                  solid={
                    favouriteSurahList && favouriteSurahList[id] ? true : false
                  }
                  size={15}
                />
              </View>
            </Pressable>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default ShortSurah;
