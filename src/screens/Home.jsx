import useTheme from "../hooks/useTheme";
import HomeTopSection from "../components/HomeTopSection";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import CustomStatusBar from "../components/CustomStatusBar";
import useExitApp from "../hooks/useExitApp";
import useGlobalStyle from "../hooks/useGlobalStyle";
import CustomText from "../components/CustomText";
import vibrate from "../utils/vibratie";
import { useNavigation } from "@react-navigation/native";
import Ionicon from "../components/Ionicon";
import FontAwesomeIcon from "../components/FontAwesomeIcon";

const Home = () => {
  const { color, isDark } = useTheme();
  const navigation = useNavigation();
  useExitApp();
  const { borderStyle } = useGlobalStyle();

  return (
    <>
      <HomeTopSection />
      <CustomStatusBar />
      <ScrollView
        style={{ flex: 1, backgroundColor: color.bgColor2 }}
        className="p-3"
      >
        <View className="flex flex-row flex-wrap gap-2 justify-center">
          <TouchableOpacity
            className="flex items-center justify-center py-2 px-1"
            style={borderStyle.boder}
            onPress={() => {
              vibrate();
              navigation.navigate("NobleQuran");
            }}
          >
            <View
              className="w-12 h-12 rounded-md flex items-center justify-center"
              style={{ backgroundColor: color.bgColor1 }}
            >
              {isDark ? (
                <>
                  <Image
                    source={require("../../assets/image/quran_dark.png")}
                    className="w-8 h-8"
                  />
                </>
              ) : (
                <>
                  <Image
                    source={require("../../assets/image/quran_light.png")}
                    className="w-8 h-8"
                  />
                </>
              )}
            </View>
            <CustomText className="text-center font-semibold">
              আল-কুরআন
            </CustomText>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex items-center justify-center p-2"
            style={borderStyle.boder}
            onPress={() => {
              vibrate();
              navigation.navigate("Tafsir");
            }}
          >
            <View
              className="w-12 h-12 rounded-md flex items-center justify-center"
              style={{ backgroundColor: color.bgColor1 }}
            >
              {isDark ? (
                <>
                  <Image
                    source={require("../../assets/image/kitab_dark.png")}
                    className="w-8 h-6"
                  />
                </>
              ) : (
                <>
                  <Image
                    source={require("../../assets/image/kitab_light.png")}
                    className="w-8 h-6"
                  />
                </>
              )}
            </View>
            <CustomText className="text-center font-semibold">
              তাফসীর
            </CustomText>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex items-center justify-center p-2"
            style={borderStyle.boder}
            onPress={() => {
              vibrate();
              navigation.navigate("Hadis");
            }}
          >
            <View
              className="w-12 h-12 rounded-md flex items-center justify-center"
              style={{ backgroundColor: color.bgColor1 }}
            >
              {isDark ? (
                <>
                  <Image
                    source={require("../../assets/image/hadith_dark.png")}
                    className="w-8 h-6"
                  />
                </>
              ) : (
                <>
                  <Image
                    source={require("../../assets/image/hadith_light.png")}
                    className="w-8 h-6"
                  />
                </>
              )}
            </View>
            <CustomText className="text-center font-semibold mx-2">
              হাদিস
            </CustomText>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex items-center justify-center p-2"
            style={borderStyle.boder}
            onPress={() => {
              vibrate();
              navigation.navigate("Doa");
            }}
          >
            <View
              className="w-12 h-12 rounded-md flex items-center justify-center"
              style={{ backgroundColor: color.bgColor1 }}
            >
              {isDark ? (
                <>
                  <Image
                    source={require("../../assets/image/dua_dark.png")}
                    className="w-8 h-6"
                  />
                </>
              ) : (
                <>
                  <Image
                    source={require("../../assets/image/dua_light.png")}
                    className="w-8 h-6"
                  />
                </>
              )}
            </View>
            <CustomText className="text-center font-semibold mx-2">
              দোয়া
            </CustomText>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex items-center justify-center p-2"
            style={borderStyle.boder}
            onPress={() => {
              vibrate();
              navigation.navigate("MainSettings");
            }}
          >
            <View
              className="w-12 h-12 rounded-md flex items-center justify-center"
              style={{ backgroundColor: color.bgColor1 }}
            >
              <Ionicon
                name="settings-outline"
                size={30}
                color={color.txtColor}
              />
            </View>
            <CustomText className="text-center font-semibold mx-2">
              সেটিংস
            </CustomText>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex items-center justify-center p-2"
            style={borderStyle.boder}
            onPress={() => {
              vibrate();
              navigation.navigate("Notes");
            }}
          >
            <View
              className="w-12 h-12 rounded-md flex items-center justify-center"
              style={{ backgroundColor: color.bgColor1 }}
            >
              <FontAwesomeIcon name="edit" size={25} color={color.txtColor} />
            </View>
            <CustomText className="text-center font-semibold mx-2">
              নোটস
            </CustomText>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex items-center justify-center p-2"
            style={borderStyle.boder}
            onPress={() => {
              vibrate();
              navigation.navigate("AboutUs");
            }}
          >
            <View
              className="w-12 h-12 rounded-md flex items-center justify-center"
              style={{ backgroundColor: color.bgColor1 }}
            >
              <Ionicon name="person-outline" size={30} color={color.txtColor} />
            </View>
            <CustomText className="text-center font-semibold mx-2">
              Author
            </CustomText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default Home;
