import { View, Image } from "react-native";
import useTheme from "../hooks/useTheme";
import BismillahImage from "./BismillahImage";
import DarkOrLight from "./DarkOrLight";
import useNavigationBarBgColorHandler from "../hooks/useNavigationBarBgColorHandler";

const HomeTopSection = () => {
  useNavigationBarBgColorHandler();
  const { color } = useTheme();
  return (
    <View
      style={{
        backgroundColor: color.bgColor1,
      }}
      className="py-2.5"
    >
      <View className="flex flex-row items-center justify-between px-3">
        <View className="w-9 h-9">
          <Image
            source={require("../../assets/image/allah.png")}
            className="w-full h-full"
          />
        </View>
        <View className="w-9 h-9 mt-0.5">
          <Image
            source={require("../../assets/image/mohammad.png")}
            className="w-full h-full"
          />
        </View>
        <>
          <BismillahImage />
        </>
        <>
          <DarkOrLight />
        </>
      </View>
    </View>
  );
};

export default HomeTopSection;
