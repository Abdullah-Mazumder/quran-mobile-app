import { View, Text } from "react-native";
import useTheme from "../hooks/useTheme";

const CustomButton = ({ title, uniqueColor }) => {
  const { color } = useTheme();
  return (
    <>
      <View className="mx-0.5" style={{ marginVertical: 1 }}>
        <Text
          style={{
            fontSize: 10,
            color: uniqueColor ? color.activeIconColor : color.txtColor,
            borderWidth: uniqueColor ? 0.7 : 0.3,
            borderColor: uniqueColor ? color.activeIconColor : color.txtColor,
            paddingHorizontal: 7,
            paddingBottom: uniqueColor ? 0 : 1,
            borderRadius: 10,
            fontWeight: uniqueColor ? "bold" : "normal",
          }}
        >
          {title}
        </Text>
      </View>
    </>
  );
};

export default CustomButton;
