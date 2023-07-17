import { View } from "react-native";
import CustomText from "./CustomText";
import useTheme from "../hooks/useTheme";

const Heading = ({ label }) => {
  const { color } = useTheme();
  return (
    <View className="w-full flex flex-row justify-center mb-2">
      <CustomText
        className="text-center text-lg font-semibold mb-2 pb-1 px-2"
        style={[
          {
            borderBottomWidth: 2,
            borderBottomColor: color.activeIconColor,
          },
        ]}
      >
        {label}
      </CustomText>
    </View>
  );
};

export default Heading;
