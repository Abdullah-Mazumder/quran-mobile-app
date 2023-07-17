import { View, Image, TouchableOpacity } from "react-native";
import useGlobalStyle from "../hooks/useGlobalStyle";
import vibrate from "../utils/vibratie";
import CustomText from "./CustomText";
import { useNavigation } from "@react-navigation/native";

const SingleTopic = ({ label, navigationLink, imageEl }) => {
  const navigation = useNavigation();
  const { borderStyle } = useGlobalStyle();
  return (
    <TouchableOpacity
      className="py-1 m-1"
      style={borderStyle.boder}
      onPress={() => {
        vibrate();
        navigation.navigate(navigationLink);
      }}
    >
      <View className="w-8 h-8">{imageEl}</View>
      <View className="">
        <CustomText className="text-center">{label}</CustomText>
      </View>
    </TouchableOpacity>
  );
};

export default SingleTopic;
