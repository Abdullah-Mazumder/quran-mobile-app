import { View, Image } from "react-native";
import CustomStatusBar from "../components/CustomStatusBar";
import useNavigationBarBgColorHandler from "../hooks/useNavigationBarBgColorHandler";
import useTheme from "../hooks/useTheme";

const ReduxPersistLoadingPage = () => {
  useNavigationBarBgColorHandler();
  const { color } = useTheme();
  return (
    <View
      style={{
        backgroundColor: color.bgColor2,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CustomStatusBar />
      <Image
        className="w-48 h-48"
        source={require("../../assets/image/brand.png")}
      />
    </View>
  );
};

export default ReduxPersistLoadingPage;
