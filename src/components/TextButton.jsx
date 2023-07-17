import { View } from "react-native";
import { Pressable } from "@react-native-material/core";
import useTheme from "../hooks/useTheme";
import CustomText from "./CustomText";

const TextButton = ({ title, ...props }) => {
  const { color } = useTheme();
  return (
    <View
      style={{
        fontSize: 11,
        color: color.txtColor,
        borderWidth: 0.3,
        borderColor: color.txtColor,
        borderRadius: 2,
        backgroundColor: color.bgColor1,
        overflow: "hidden",
      }}
    >
      <Pressable
        style={{
          paddingVertical: 3,
          paddingHorizontal: 15,
        }}
        {...props}
      >
        <View className="flex justify-center items-center">
          <CustomText className="">{title}</CustomText>
        </View>
      </Pressable>
    </View>
  );
};

export default TextButton;
