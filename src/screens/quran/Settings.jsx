import { View, ScrollView } from "react-native";
import CustomText from "../../components/CustomText";
import useTheme from "../../hooks/useTheme";
import { englishFont } from "../../utils/fonts";
import Ionicon from "../../components/Ionicon";
import SettingsBox from "../../components/quran/SettingBox";
import useGoToBackHandler from "../../hooks/useGoToBackHandler";

const Settings = () => {
  useGoToBackHandler("QuranHome");
  const { color } = useTheme();
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
          <SettingsBox />
        </ScrollView>
      </View>
    </>
  );
};

export default Settings;
