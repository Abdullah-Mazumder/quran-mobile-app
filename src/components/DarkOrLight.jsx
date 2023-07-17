import { View, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import useTheme from "../hooks/useTheme";
import Ionicon from "./Ionicon";

import { toggleIsDark } from "../redux/features/theme/themeSlice";
import vibrate from "../utils/vibratie";

const DarkOrLight = () => {
  const dispatch = useDispatch();
  const { isDark } = useTheme();
  return (
    <TouchableOpacity
      onPress={() => {
        vibrate();
        dispatch(toggleIsDark(!isDark));
      }}
    >
      <View className="w-9 h-9 flex items-end justify-end mt-0.5">
        <Ionicon name={isDark ? "moon" : "sunny"} size={33} />
      </View>
    </TouchableOpacity>
  );
};

export default DarkOrLight;
