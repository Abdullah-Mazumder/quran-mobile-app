import { View } from "react-native";
import useTheme from "../hooks/useTheme";
import CustomText from "./CustomText";
import { banglaFont } from "../utils/fonts";

const CommingSoon = () => {
  const { color } = useTheme();
  return (
    <View
      style={{ flex: 1, backgroundColor: color.bgColor2 }}
      className="flex items-center justify-center"
    >
      <CustomText className="text-lg" style={[{ ...banglaFont.banglaSemi }]}>
        শীঘ্রই আসছে ইনশাআল্লাহ...
      </CustomText>
    </View>
  );
};

export default CommingSoon;
