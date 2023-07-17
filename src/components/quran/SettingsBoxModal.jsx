import { View, useWindowDimensions, ScrollView } from "react-native";
import useTheme from "../../hooks/useTheme";
import vibrate from "../../utils/vibratie";
import TextButton from "../TextButton";
import SettingBox from "./SettingBox";

const SettingsBoxModal = ({ setSettingBox }) => {
  const { color } = useTheme();
  const { height } = useWindowDimensions();
  return (
    <View
      className={`absolute top-0 right-0 w-full h-full flex items-center z-20`}
      style={{
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <View
        className="w-[90%] py-2 rounded-lg mt-2"
        style={{ backgroundColor: color.bgColor2 }}
      >
        <ScrollView
          style={{
            maxHeight: height / 3,
          }}
        >
          <SettingBox />
        </ScrollView>
        <View className="w-full flex items-center my-2 mt-5">
          <TextButton
            title="Close"
            onPress={() => {
              vibrate();
              setSettingBox(false);
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default SettingsBoxModal;
