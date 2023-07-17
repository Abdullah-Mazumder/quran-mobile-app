import { ScrollView, View } from "react-native";
import useTheme from "../hooks/useTheme";
import CustomText from "../components/CustomText";
import { banglaFont, englishFont } from "../utils/fonts";
import Ionicon from "../components/Ionicon";
import {
  setArabicTextSize,
  setBanglaTextSize,
  setEnglishTextSize,
  setIsShowBanglaText,
  setIsShowEnglishText,
  setArabicFont,
} from "../redux/features/nobleQuran/nobleQuranSlice";
import { useDispatch, useSelector } from "react-redux";
import TextSizeSlider from "../components/quran/TextSizeSlider";
import { Pressable } from "@react-native-material/core";
import { useRef } from "react";
import SelectBox from "../components/SelectBox";
import CheckBoxWithLabel from "../components/CheckBoxWithLabel";

const MainSettings = () => {
  const pickerRef = useRef(null);
  const { color } = useTheme();
  const dispatch = useDispatch();
  const {
    arabicTextSize,
    banglaTextSize,
    englishTextSize,
    arabicFont,
    isShowBanglaText,
    isShowEnglishText,
  } = useSelector((state) => state.nobleQuran);

  const openDropdown = () => {
    pickerRef?.current?.openDropdown();
  };

  const fonts = [
    {
      value: "noorehuda",
      label: "ফন্ট-১",
    },
    {
      value: "arabicHafezi",
      label: "ফন্ট-২",
    },
    {
      value: "lateef",
      label: "ফন্ট-৩",
    },
    {
      value: "noorehidayat",
      label: "ফন্ট-৪",
    },
    {
      value: "noorehira",
      label: "ফন্ট-৫",
    },
    {
      value: "PDMS_Saleem",
      label: "ফন্ট-৬",
    },
    {
      value: "XBNiloofar",
      label: "ফন্ট-৭",
    },
  ];
  const defaultIndex = fonts.findIndex((font) => font.value === arabicFont);
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
            সেটিংস
          </CustomText>
          <Ionicon
            name="settings"
            solid
            size={17}
            className="mt-1 ml-2"
            color={color.activeIconColor}
          />
        </View>
      </View>
      <View
        style={{ flex: 1, backgroundColor: color.bgColor2 }}
        className="container mx-auto p-0.5 px-1 pb-0"
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="px-2">
            <TextSizeSlider
              label="আরবি লেখা"
              minValue={20}
              maxValue={50}
              value={arabicTextSize}
              actionName={setArabicTextSize}
            />
            <TextSizeSlider
              label="বাংলা লেখা"
              minValue={14}
              maxValue={40}
              value={banglaTextSize}
              actionName={setBanglaTextSize}
            />
            <TextSizeSlider
              label="ইংরেজি লেখা"
              minValue={14}
              maxValue={40}
              value={englishTextSize}
              actionName={setEnglishTextSize}
            />
          </View>
          <View className="my-2">
            <Pressable onPress={openDropdown}>
              <View className="flex flex-row justify-between items-center px-[9px] my-3">
                <CustomText
                  style={[banglaFont.banglaRegular, { fontWeight: "bold" }]}
                >
                  আরবি ফন্ট
                </CustomText>
                <SelectBox
                  ref={pickerRef}
                  data={fonts}
                  defaultButtonText="ফন্ট"
                  defaultValueByIndex={defaultIndex}
                  onSelect={(selectedItem) => {
                    dispatch(setArabicFont(selectedItem.value));
                  }}
                  buttonTextAfterSelection={(selectedItem) => {
                    return selectedItem.label;
                  }}
                  rowTextForSelection={(item) => {
                    return item.label;
                  }}
                />
              </View>
            </Pressable>
          </View>
          <View>
            <CheckBoxWithLabel
              label="বাংলা অনুবাদ"
              value={isShowBanglaText}
              actionName={setIsShowBanglaText}
            />
            <CheckBoxWithLabel
              label="ইংরেজি অনুবাদ"
              value={isShowEnglishText}
              actionName={setIsShowEnglishText}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default MainSettings;
