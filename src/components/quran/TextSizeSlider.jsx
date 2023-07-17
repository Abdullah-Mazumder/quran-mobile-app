import { View } from "react-native";
import { Slider } from "@miblanchard/react-native-slider";
import CustomText from "../CustomText";
import useTheme from "../../hooks/useTheme";
import convertEngToBanglaNumber from "engnumber-to-banglanumber";
import { useDispatch } from "react-redux";

const TextSizeSlider = ({ label, minValue, maxValue, value, actionName }) => {
  const { color } = useTheme();
  const dispatch = useDispatch();
  return (
    <View className="flex flex-row items-center justify-between">
      <CustomText className="font-bold">{label}</CustomText>
      <View className="w-[170]">
        <Slider
          minimumValue={minValue}
          maximumValue={maxValue}
          step={1}
          minimumTrackTintColor={color.activeIconColor}
          maximumTrackTintColor={color.maximumTintColor}
          thumbStyle={{ backgroundColor: color.activeIconColor }}
          trackStyle={{ height: 6 }}
          value={value}
          onSlidingComplete={async (value) => {
            dispatch(actionName(value[0]));
          }}
        />
      </View>
      <CustomText className="font-bold">
        {convertEngToBanglaNumber(value.toString())}
      </CustomText>
    </View>
  );
};

export default TextSizeSlider;
