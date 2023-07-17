import { View } from "react-native";
import React from "react";
import CustomText from "./CustomText";
import useTheme from "../hooks/useTheme";

const HeadingWithBorderBottom = ({ label }) => {
  const { color } = useTheme();
  return (
    <View className="w-full flex flex-row justify-center mb-2">
      <CustomText
        className="text-center font-bold px-3"
        style={{
          fontSize: 17,
          borderBottomWidth: 2,
          borderBottomColor: color.activeIconColor,
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
        }}
      >
        {label}
      </CustomText>
    </View>
  );
};

export default HeadingWithBorderBottom;
