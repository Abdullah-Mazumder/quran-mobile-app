import { View } from "react-native";
import { Pressable } from "@react-native-material/core";
import { useDispatch, useSelector } from "react-redux";
import {
  setArabicTextSize,
  setBanglaTextSize,
  setEnglishTextSize,
  setIsShowAudioPlayer,
  setIsShowBanglaText,
  setIsShowEnglishText,
  setIsEnableTajweed,
  setArabicFont,
} from "../../redux/features/nobleQuran/nobleQuranSlice";
import CheckBoxWithLabel from "../CheckBoxWithLabel";
import HeadingWithBorderBottom from "../HeadingWithBorderBottom";
import TextSizeSlider from "./TextSizeSlider";
import CustomText from "../CustomText";
import SelectBox from "../SelectBox";
import { banglaFont } from "../../utils/fonts";
import { useRef } from "react";

const SettingsBox = () => {
  const pickerRef = useRef(null);
  const dispatch = useDispatch();
  const {
    arabicTextSize,
    banglaTextSize,
    englishTextSize,
    arabicFont,
    isEnableTajweed,
    isShowBanglaText,
    isShowEnglishText,
    isShowAudioPlayer,
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
    <View>
      <HeadingWithBorderBottom label="লেখার সাইজ" />
      <View className="px-3">
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
      <HeadingWithBorderBottom label="ফন্ট এবং তাজবীদ" />
      <View className="my-2">
        <Pressable onPress={openDropdown}>
          <View className="flex flex-row justify-between items-center px-[10px] my-3">
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
      <CheckBoxWithLabel
        label="তাজবীদ"
        value={isEnableTajweed}
        actionName={setIsEnableTajweed}
      />
      <HeadingWithBorderBottom label="অন্যান্য" />
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
        <CheckBoxWithLabel
          label="অডিও প্লেয়ার"
          value={isShowAudioPlayer}
          actionName={setIsShowAudioPlayer}
        />
      </View>
    </View>
  );
};

export default SettingsBox;
