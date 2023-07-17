import { useEffect } from "react";
import { Image, View } from "react-native";
import { useSelector } from "react-redux";
import CustomStatusBar from "../components/CustomStatusBar";
import useNavigationBarBgColorHandler from "../hooks/useNavigationBarBgColorHandler";
import { useFonts } from "expo-font";

const Splash = ({ navigation }) => {
  useNavigationBarBgColorHandler();
  const { color } = useSelector((state) => state.theme);
  const [fontsLoaded] = useFonts({
    noorehuda: require("../../assets/fonts/noorehuda.ttf"),
    arabicHafezi: require("../../assets/fonts/arabicHafezi.ttf"),
    lateef: require("../../assets/fonts/Lateef.ttf"),
    noorehidayat: require("../../assets/fonts/noorehidayat.ttf"),
    noorehira: require("../../assets/fonts/noorehira.ttf"),
    PDMS_Saleem: require("../../assets/fonts/noorehuda.ttf"),
    XBNiloofar: require("../../assets/fonts/XBNiloofar.ttf"),
    banglaSemi: require("../../assets/fonts/hindSiliguriSemi.ttf"),
    banglaRegular: require("../../assets/fonts/hindSiliguriRegular.ttf"),
    englishRegular: require("../../assets/fonts/englishRegular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      setTimeout(() => {
        navigation.replace("Home");
      }, 1000);
    }
  }, [fontsLoaded]);

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

export default Splash;
